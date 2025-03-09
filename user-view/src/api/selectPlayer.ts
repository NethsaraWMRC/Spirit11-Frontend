/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

// Interface for the original player data format
interface PlayerOriginal {
  _id: string;
  name: string;
  university: string;
  category: string;
  totalRuns: number;
  ballsFaced: number;
  inningsPlayed: number;
  wickets: number;
  oversBowled: number;
  runsConceded: number;
  isNewPlayer: boolean;
  __v: number;
}

// Interface for the mapped player data format
interface PlayerMapped {
  _id: string;
  Name: string;
  University: string;
  Category: string;
  "Total Runs": number;
  "Balls Faced": number;
  "Innings Played": number;
  Wickets: number;
  "Overs Bowled": number;
  "Runs Conceded": number;
}

const API_BASE_URL = "http://localhost:5000/api";

const getAuthHeaders = () => {
  const accessToken = localStorage.getItem("accessToken");
  return {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };
};

export const getAllPlayers = async (): Promise<PlayerMapped[] | null> => {
  try {
    const response = await axios.get<PlayerOriginal[]>(
      `${API_BASE_URL}/players/get-all`,
      {
        headers: getAuthHeaders(),
      }
    );

    return response.data.map((player) => ({
      _id: player._id,
      Name: player.name,
      University: player.university,
      Category: player.category,
      "Total Runs": player.totalRuns,
      "Balls Faced": player.ballsFaced,
      "Innings Played": player.inningsPlayed,
      Wickets: player.wickets,
      "Overs Bowled": player.oversBowled,
      "Runs Conceded": player.runsConceded,
    }));
  } catch (error) {
    console.error("Error fetching players:", error);
    return null;
  }
};

export const addPlayerToTeam = async (
  userId: string,
  playerId: string
): Promise<any> => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/team/add`,
      { userId, playerId },
      { headers: getAuthHeaders() }
    );

    return response.data;
  } catch (error: any) {
    console.error("Error adding player to team:", error);
    throw error;
  }
};

export const removePlayerFromTeam = async (
  userId: string,
  playerId: string
): Promise<any> => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/team/remove`,
      { userId, playerId },
      { headers: getAuthHeaders() }
    );

    return response.data;
  } catch (error: any) {
    console.error("Error removing player from team:", error);
    throw error;
  }
};

export const getUserTeam = async (
  userId: string
): Promise<(PlayerMapped & { Price: number })[] | null> => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/team/get-user-team/${userId}`,
      {
        headers: getAuthHeaders(),
      }
    );

    if (response.data && Array.isArray(response.data)) {
      return response.data.map((entry) => ({
        _id: entry.player._id,
        Name: entry.player.name,
        University: entry.player.university,
        Category: entry.player.category,
        "Total Runs": entry.player.totalRuns,
        "Balls Faced": entry.player.ballsFaced,
        "Innings Played": entry.player.inningsPlayed,
        Wickets: entry.player.wickets,
        "Overs Bowled": entry.player.oversBowled,
        "Runs Conceded": entry.player.runsConceded,
        Price: entry.price,
      }));
    }

    return [];
  } catch (error) {
    console.error("Error fetching user team:", error);
    return null;
  }
};
