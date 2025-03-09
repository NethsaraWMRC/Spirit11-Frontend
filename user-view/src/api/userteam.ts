import axios from "axios";

const base_url = "http://localhost:5000/api";

export const getUserTeam = async (userId: string) => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    const response = await axios.get(
      `${base_url}/team/get-user-team/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Request failed:", error);
  }
};
