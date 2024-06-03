import { DB_URL } from "../../../apiConfig";

const useDataHandler = (endpoint) => {
  const postData = async (data) => {
    try {
      const response = await fetch(`${DB_URL}/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to add data");
      }
      return await response.json();
    } catch (error) {
      console.error("Error adding data:", error);
      throw error;
    }
  };

  const putData = async (id, data) => {
    try {
      const response = await fetch(`${DB_URL}/${endpoint}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to update data");
      }
      return await response.json();
    } catch (error) {
      console.error("Error updating data:", error);
      throw error;
    }
  };

  const deleteData = async (id) => {
    console.log("useDataHandler deleteData" + `${DB_URL}/${endpoint}/${id}`);
    try {
      const response = await fetch(`${DB_URL}/${endpoint}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete data");
      }
      return true;
    } catch (error) {
      console.error("Error deleting data:", error);
      throw error;
    }
  };

  return { postData, putData, deleteData };
};

export default useDataHandler;
