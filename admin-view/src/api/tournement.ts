const API_BASE_URL = "http://localhost:5001/api/tournament";

export const getTournamentSummary = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/summary`);
    console.log("first",response);
    if (!response.ok) throw new Error("Failed to fetch tournament summary");
    return await response.json();
  } catch (error) {
    console.error("Error fetching tournament summary:", error);
    return null;
  }
};
