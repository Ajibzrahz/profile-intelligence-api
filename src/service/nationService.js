import axios from "axios";

const getNation = async (name) => {
  try {
    const response = await axios.get("https://api.nationalize.io", {
      params: {
        name,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching gender data:", error);
    throw error;
  }
};

export { getNation };
