const API_BASE_URL = "http://localhost:5000/api/tournament";

export const getTournamentSummary = async () => {
  try {

    const accessToken = localStorage.getItem("accessToken");
    const response = await fetch(`${API_BASE_URL}/summary`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });


    if (!response.ok) throw new Error("Failed to fetch tournament summary");
    return await response.json();
  } catch (error) {
    console.error("Error fetching tournament summary:", error);
    return null;
  }
};
