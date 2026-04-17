import axios from "axios";

const getGender = async (name) => {
  try {
    const response = await axios.get("https://api.genderize.io", {
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

export { getGender };
