import axios from 'axios';

const base_url = "http://localhost:5000/api";

export const getUserTeam = async (userId: string) => {
  try {
    const response = await axios.get(`${base_url}/team/get-user-team/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Request failed:", error);
  }
};
