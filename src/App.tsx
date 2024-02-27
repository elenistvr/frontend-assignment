import { RouterProvider, createBrowserRouter } from "react-router-dom";
import TableComponent from "./components/TableComponent";
import AddElement from "./components/AddElement";
import UpdateElement from "./components/UpdateElement";
import { useContext, useState, FC } from "react";
import { ThemeContext } from "./components/store/theme";
import GenerateToken from "./components/GenerateToken";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <TableComponent
        id={0}
        body={""}
        title={""}
        views={0}
        author={""}
        createdAt={""}
      />
    ),
  },
  {
    path: "/add",
    element: <AddElement />,
  },
  {
    path: "/update/:id",
    element: <UpdateElement />,
  },
]);
interface AppProps {}

const App: FC<AppProps> = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const handleTokenGenerated = (generatedToken: string): void => {
    localStorage.setItem("token", generatedToken);
    setIsLoggedIn(true);
  };

  const handleLogout = (): void => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };
  return (
    <>
      <div>
        <div className="switch">
          <button onClick={toggleTheme}>
            Switch to {theme === "light" ? "dark" : "light"} mode
          </button>
          {isLoggedIn && (
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          )}
        </div>
        <div>
          {isLoggedIn ? (
            <RouterProvider router={router} />
          ) : (
            <GenerateToken tokenGenerated={handleTokenGenerated} />
          )}
        </div>
      </div>
    </>
  );
};

export default App;
