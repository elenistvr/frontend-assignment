import { FC } from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pagination } from "./Pagination";
import { viewsColor, authorValidation, fDate } from "../utils/handlers";

const BASE_URL = "https://retoolapi.dev/vcv4zy/jokes";

interface Joke {
  id: number;
  body: string;
  title: string;
  views: number;
  author: string;
  createdAt: string;
}

const TableComponent: FC<Joke> = () => {
  const [error, setError] = useState<unknown>();
  const [isLoading, setIsLoading] = useState(false);
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [jokesPerPage, setJokesPerPage] = useState(5);
  const [totalJokes, setTotalJokes] = useState(0);

  useEffect(() => {
    const fetchJokes = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${BASE_URL}?_page=${currentPage}&_limit=${jokesPerPage}`
        );
        const totalCountHeader = response.headers.get("X-Total-Count");
        const totalCount = totalCountHeader ? parseInt(totalCountHeader) : 0;
        const jokes = (await response.json()) as Joke[];
        setJokes(jokes);
        setTotalJokes(totalCount);
      } catch (e: unknown) {
        setError(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchJokes();
  }, [currentPage, jokesPerPage]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Something went wrong...</div>;
  }

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setJokesPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div>
      <Link to="/add" className="add">
        Add +
      </Link>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Created Date</th>
            <th>Views</th>
          </tr>
        </thead>
        <tbody>
          {jokes.map((joke, id) => (
            <tr key={id}>
              <td>
                <Link to={`update/${joke.id}`}>{joke.title}</Link>
              </td>
              <td>{authorValidation(joke.author)}</td>
              <td>{fDate(joke.createdAt)}</td>
              <td style={{ color: viewsColor(joke.views) }}>{joke.views}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        jokesPerPage={jokesPerPage}
        totalJokes={totalJokes}
        next={handleNextPage}
        prev={handlePrevPage}
        itemsPerPageChange={handleItemsPerPageChange}
      />
    </div>
  );
};

export default TableComponent;
