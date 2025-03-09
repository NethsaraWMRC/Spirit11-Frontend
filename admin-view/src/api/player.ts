import axios from "axios";
import { Player } from "../components/common/Player Profile/PlayersData";

// Define an interface for the API response
interface ApiPlayer {
  _id: string;
  name: string;
  unversity: string;
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

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Fetch all players
export const fetchPlayers = async (): Promise<Player[]> => {
  try {
    const response = await api.get('/get-all');
    
    // Transform the API response to match our frontend interface
    return response.data.map((player: ApiPlayer) => ({
      id: player._id,
      Name: player.name,
      University: player.unversity,
      Category: player.category,
      "Total Runs": player.totalRuns,
      "Balls Faced": player.ballsFaced,
      "Innings Played": player.inningsPlayed,
      Wickets: player.wickets,
      "Overs Bowled": player.oversBowled,
      "Runs Conceded": player.runsConceded,
      "is New Player": player.isNewPlayer
    }));
  } catch (error) {
    console.error("Error fetching players:", error);
    throw error;
  }
};

// Fetch a single player
export const fetchPlayerById = async (id: string): Promise<Player> => {
  try {
    const response = await api.get(`/get-one/${id}`);
    const data = response.data;
    
    // Transform to frontend format
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
      "is New Player": data.isNewPlayer
    };
  } catch (error) {
    console.error(`Error fetching player with ID ${id}:`, error);
    throw error;
  }
};

// Create a new player
export const createPlayer = async (player: Omit<Player, 'id'>): Promise<Player> => {
  try {
    // Transform the player data to match API expectations
    const apiPlayer = {
      name: player.Name,
      unversity: player.University,
      category: player.Category,
      totalRuns: player["Total Runs"],
      ballsFaced: player["Balls Faced"],
      inningsPlayed: player["Innings Played"],
      wickets: player.Wickets,
      oversBowled: player["Overs Bowled"],
      runsConceded: player["Runs Conceded"],
      isNewPlayer: player["is New Player"] || true
    };
    
    const response = await api.post('/create', apiPlayer);
    const data = response.data;
    
    // Transform the response back to our frontend format
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
      "is New Player": data.isNewPlayer
    };
  } catch (error) {
    console.error("Error creating player:", error);
    throw error;
  }
};

// Update an existing player
export const updatePlayer = async (id: string, player: Omit<Player, 'id'>): Promise<Player> => {
  try {
    // Transform to API format
    const apiPlayer = {
      name: player.Name,
      unversity: player.University,
      category: player.Category,
      totalRuns: player["Total Runs"],
      ballsFaced: player["Balls Faced"],
      inningsPlayed: player["Innings Played"],
      wickets: player.Wickets,
      oversBowled: player["Overs Bowled"],
      runsConceded: player["Runs Conceded"],
      isNewPlayer: player["is New Player"]
    };
    
    const response = await api.put(`/update-one/${id}`, apiPlayer);
    const data = response.data;
    
    // Transform back to frontend format
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
      "is New Player": data.isNewPlayer
    };
  } catch (error) {
    console.error(`Error updating player with ID ${id}:`, error);
    throw error;
  }
};

// Delete a player
export const deletePlayer = async (id: string): Promise<void> => {
  try {
    await api.delete(`/delete-one/${id}`);
  } catch (error) {
    console.error(`Error deleting player with ID ${id}:`, error);
    throw error;
  }
};