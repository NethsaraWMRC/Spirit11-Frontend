import axios from "axios";

const base_url = "http://localhost:5000/api";

export const getUserTeam = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    const response = await axios.get(`${base_url}/team/get-user-team`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Request failed:", error);
  }
};
