import axios from "axios";
import { Player } from "../components/common/Player Profile/PlayersData";

interface ApiPlayer {
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
}

const API_URL = "http://localhost:5000/api/players";

const getAuthHeaders = () => {
  const accessToken = localStorage.getItem("accessToken");
  return {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };
};

const api = axios.create({
  baseURL: API_URL,
  headers: getAuthHeaders(),
});

export const fetchPlayers = async (): Promise<Player[]> => {
  try {
    const response = await api.get("/get-all", { headers: getAuthHeaders() });

    return response.data.map((player: ApiPlayer) => ({
      id: player._id,
      Name: player.name,
      University: player.university,
      Category: player.category,
      "Total Runs": player.totalRuns,
      "Balls Faced": player.ballsFaced,
      "Innings Played": player.inningsPlayed,
      Wickets: player.wickets,
      "Overs Bowled": player.oversBowled,
      "Runs Conceded": player.runsConceded,
      "is New Player": player.isNewPlayer,
    }));
  } catch (error) {
    console.error("Error fetching players:", error);
    throw error;
  }
};

export const fetchPlayerById = async (id: string): Promise<Player> => {
  try {
    const response = await api.get(`/get-one/${id}`, {
      headers: getAuthHeaders(),
    });
    const data = response.data;

    return {
      id: data._id,
      Name: data.name,
      University: data.university,
      Category: data.category,
      "Total Runs": data.totalRuns,
      "Balls Faced": data.ballsFaced,
      "Innings Played": data.inningsPlayed,
      Wickets: data.wickets,
      "Overs Bowled": data.oversBowled,
      "Runs Conceded": data.runsConceded,
      "is New Player": data.isNewPlayer,
    };
  } catch (error) {
    console.error(`Error fetching player with ID ${id}:`, error);
    throw error;
  }
};

export const createPlayer = async (
  player: Omit<Player, "id">
): Promise<Player> => {
  try {
    const apiPlayer = {
      name: player.Name,
      university: player.University,
      category: player.Category,
      totalRuns: player["Total Runs"],
      ballsFaced: player["Balls Faced"],
      inningsPlayed: player["Innings Played"],
      wickets: player.Wickets,
      oversBowled: player["Overs Bowled"],
      runsConceded: player["Runs Conceded"],
      isNewPlayer: player["is New Player"] || true,
    };

    const response = await api.post("/create", apiPlayer, {
      headers: getAuthHeaders(),
    });
    const data = response.data;

    return {
      id: data._id,
      Name: data.name,
      University: data.university,
      Category: data.category,
      "Total Runs": data.totalRuns,
      "Balls Faced": data.ballsFaced,
      "Innings Played": data.inningsPlayed,
      Wickets: data.wickets,
      "Overs Bowled": data.oversBowled,
      "Runs Conceded": data.runsConceded,
      "is New Player": data.isNewPlayer,
    };
  } catch (error) {
    console.error("Error creating player:", error);
    throw error;
  }
};

export const updatePlayer = async (
  id: string,
  player: Omit<Player, "id">
): Promise<Player> => {
  try {
    const apiPlayer = {
      name: player.Name,
      university: player.University,
      category: player.Category,
      totalRuns: player["Total Runs"],
      ballsFaced: player["Balls Faced"],
      inningsPlayed: player["Innings Played"],
      wickets: player.Wickets,
      oversBowled: player["Overs Bowled"],
      runsConceded: player["Runs Conceded"],
      isNewPlayer: player["is New Player"],
    };

    const response = await api.put(`/update-one/${id}`, apiPlayer, {
      headers: getAuthHeaders(),
    });
    const data = response.data;

    return {
      id: data._id,
      Name: data.name,
      University: data.university,
      Category: data.category,
      "Total Runs": data.totalRuns,
      "Balls Faced": data.ballsFaced,
      "Innings Played": data.inningsPlayed,
      Wickets: data.wickets,
      "Overs Bowled": data.oversBowled,
      "Runs Conceded": data.runsConceded,
      "is New Player": data.isNewPlayer,
    };
  } catch (error) {
    console.error(`Error updating player with ID ${id}:`, error);
    throw error;
  }
};

export const deletePlayer = async (id: string): Promise<void> => {
  try {
    await api.delete(`/delete-one/${id}`, { headers: getAuthHeaders() });
  } catch (error) {
    console.error(`Error deleting player with ID ${id}:`, error);
    throw error;
  }
};
