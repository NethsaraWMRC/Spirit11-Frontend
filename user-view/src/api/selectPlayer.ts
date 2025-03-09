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

export const getAllPlayers = async (): Promise<PlayerMapped[] | null> => {
  try {
    const response = await axios.get<PlayerOriginal[]>(
      "http://localhost:5000/api/players/get-all"
    );

    // Transform the data into the desired format
    const mappedData: PlayerMapped[] = response.data.map((player) => ({
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

    return mappedData;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null; // Return null in case of an error
  }
};

// Function to add a player to the team using MongoDB ObjectIds
export const addPlayerToTeam = async (
  userId: string,
  playerId: string
): Promise<any> => {
  try {
    // Log the request payload for debugging
    console.log("Adding player with payload:", { userId, playerId });

    // Make sure we're sending the data in the format expected by the server
    const response = await axios.post(
      "http://localhost:5000/api/team/add",
      {
        userId: userId,
        playerId: playerId,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Add player response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error adding player to team:", error);
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
    }
    throw error;
  }
};

export const removePlayerFromTeam = async (
  userId: string,
  playerId: string
): Promise<any> => {
  try {
    console.log("Removing player with payload:", { userId, playerId });

    const response = await axios.post(
      "http://localhost:5000/api/team/remove",
      {
        userId: userId,
        playerId: playerId,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Remove player response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error removing player from team:", error);
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
    }
    throw error;
  }
};

export const getUserTeam = async (
  userId: string
): Promise<(PlayerMapped & { Price: number })[] | null> => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/team/get-user-team/${userId}`
    );

    if (response.data && Array.isArray(response.data)) {
      const mappedData = response.data.map((entry) => ({
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

      return mappedData;
    }

    return [];
  } catch (error) {
    console.error("Error fetching user team:", error);
    return null;
  }
};
