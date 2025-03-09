import axios from "axios";

const base_url = "http://localhost:5000/api/auth/";

export const loginUser = async (username: string, password: string) => {
  try {
    const response = await axios.post(base_url + "/login", {
      username,
      password,
    });
    return response;
  } catch (error) {
    console.error("Request failed:", error);
  }
};

export const registerUser = async (username: string, password: string) => {
  try {
    const response = await axios.post(base_url + "/register", {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Request failed:", error);
  }
};
