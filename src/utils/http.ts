interface FormData {
  id: number;
  title: string;
  author: string;
  createdAt: string;
  body: string;
  views: string;
}


const BASE_URL = "https://retoolapi.dev/vcv4zy/jokes";



export const addJoke = async (formData: FormData) => {
    try {
      const response = await fetch(`${BASE_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Failed to add joke");
      }
      return response.json();
    } catch (error) {
      console.error("Error adding joke:", error);
      throw error;
    }
  };


export const submitJoke = async (formData: FormData, navigate: () => void) => {
  
  try {
    const response = await fetch(`${BASE_URL}/${formData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error("Failed to update joke");
    }
    alert("Joke updated successfully!");
    navigate();
  } catch (error) {
    console.error("Error updating joke:", error);
  }
};

export const deleteJoke = async (
  formData: FormData,
  navigate: () => void
) => {
  const BASE_URL = "https://retoolapi.dev/vcv4zy/jokes";
  try {
    const response = await fetch(`${BASE_URL}/${formData.id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete joke");
    }
    alert("Joke deleted successfully!");
    navigate();
  } catch (error) {
    console.error("Error deleting joke:", error);
  }
};
