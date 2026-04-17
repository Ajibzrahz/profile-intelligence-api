import axios from "axios";

const getAge = async (name) => {
  try {
    const response = await axios.get("https://api.agify.io", {
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

export { getAge };
