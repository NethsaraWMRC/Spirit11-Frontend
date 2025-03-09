import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import PlayerPopUp from "./PlayerPopUp";

// Import the updated API functions
import {
  getAllPlayers,
  addPlayerToTeam,
  removePlayerFromTeam,
  getUserTeam,
} from "../../../api/selectPlayer";

// Player interface to match your mapped data
interface Player {
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

import { calculatePlayerValue, formatCurrency } from "./Calculation";

export default function PlayersTable() {
  const [playersData, setPlayersData] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State variables for tracking selected players and budget
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
  const [budget, setBudget] = useState(9000000); // Initial budget of 9,000,000

  // Fixed User ID as provided (MongoDB ObjectId)
  const userId = "67cd476348af168023178dcd";

  // Fetch all players and user's team when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch all players
        const allPlayers = await getAllPlayers();

        if (allPlayers) {
          setPlayersData(allPlayers);

          // Fetch the user's existing team
          try {
            const teamPlayers = await getUserTeam(userId);

            if (teamPlayers) {
              setSelectedPlayers(teamPlayers);

              // Calculate remaining budget based on selected players
              const usedBudget = teamPlayers.reduce(
                (total, player) => total + calculatePlayerValue(player),
                0
              );

              setBudget(9000000 - usedBudget);
            }
          } catch (teamError) {
            console.error("Error fetching team:", teamError);
            // Continue with empty team if there's an error
            setSelectedPlayers([]);
          }
        } else {
          setError("Failed to fetch players data");
        }
      } catch (err) {
        setError("An error occurred while fetching data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Get unique categories for the filter dropdown
  const categories =
    playersData.length > 0
      ? ["All", ...new Set(playersData.map((player) => player.Category))]
      : ["All"];

  // Filter the data based on search term and category filter
  const filteredData = playersData.filter((player) => {
    const matchesSearch = player.Name.toLowerCase().includes(
      searchTerm.toLowerCase()
    );

    const matchesCategory =
      categoryFilter === "All" || player.Category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const handleViewClick = (player: Player) => {
    setSelectedPlayer(player);
    setIsModalOpen(true);
  };

  const handleAddClick = async (player: Player) => {
    // Check if we already have 11 players
    if (selectedPlayers.length >= 11) {
      alert("You can only select up to 11 players");
      return;
    }

    // Check if player is already selected
    if (selectedPlayers.some((p) => p._id === player._id)) {
      alert("This player is already in your selection");
      return;
    }

    // Check if we have enough budget
    const playerValue = calculatePlayerValue(player);
    if (playerValue > budget) {
      alert("Not enough budget to add this player");
      return;
    }

    try {
      setLoadingAction(player._id);
      console.log(`Adding player: ${player.Name} (ID: ${player._id})`);

      // Call the API to add player to team using MongoDB ObjectIds
      await addPlayerToTeam(userId, player._id);

      // Update local state only if API call succeeds
      setSelectedPlayers([...selectedPlayers, player]);
      setBudget(budget - playerValue);

      console.log(`Successfully added player: ${player.Name}`);
    } catch (error) {
      console.error("Failed to add player to team:", error);
      alert("Failed to add player to team. Please try again.");
    } finally {
      setLoadingAction(null);
    }
  };

  const handleRemoveClick = async (player: Player) => {
    try {
      setLoadingAction(player._id);
      console.log(`Removing player: ${player.Name} (ID: ${player._id})`);

      // Call the API to remove player from team using MongoDB ObjectIds
      await removePlayerFromTeam(userId, player._id);

      // Update local state only if API call succeeds
      setSelectedPlayers(selectedPlayers.filter((p) => p._id !== player._id));
      setBudget(budget + calculatePlayerValue(player));

      console.log(`Successfully removed player: ${player.Name}`);
    } catch (error) {
      console.error("Failed to remove player from team:", error);
      alert("Failed to remove player from team. Please try again.");
    } finally {
      setLoadingAction(null);
    }
  };

  // Check if a player is in the selected list
  const isPlayerSelected = (player: Player) => {
    return selectedPlayers.some((p) => p._id === player._id);
  };

  // Show loading state
  if (loading) {
    return (
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] p-8 text-center">
        <p className="text-gray-500 dark:text-gray-400">
          Loading players data...
        </p>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] p-8 text-center">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      {/* Status Bar with Budget and Selected Count */}
      <div className="p-4 bg-gray-50 dark:bg-white/[0.02] border-b border-gray-100 dark:border-white/[0.05]">
        <div className="flex justify-between items-center">
          <div className="font-medium text-gray-700 dark:text-white/90">
            Budget:{" "}
            <span className="text-green-600 dark:text-green-400">
              {formatCurrency(budget)}
            </span>
          </div>
          <div className="font-medium text-gray-700 dark:text-white/90">
            Players:{" "}
            <span
              className={`${
                selectedPlayers.length === 11 ? "text-red-500" : "text-blue-500"
              }`}
            >
              {selectedPlayers.length}/11
            </span>
          </div>
        </div>
      </div>

      {/* Search and Filter Controls */}
      <div className="p-4 border-b border-gray-100 dark:border-white/[0.05] flex flex-wrap gap-3 items-center justify-between">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 pr-10 border border-gray-200 rounded-lg w-64 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-white/[0.05] dark:border-white/[0.1] dark:text-white"
          />
          <svg
            className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <div className="flex items-center gap-2">
          <label
            htmlFor="category-filter"
            className="text-sm text-gray-500 dark:text-gray-400"
          >
            Category:
          </label>
          <select
            id="category-filter"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-white/[0.05] dark:border-white/[0.1] dark:text-white"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Selected Players Section */}
      {selectedPlayers.length > 0 && (
        <div className="p-4 border-b border-gray-100 dark:border-white/[0.05]">
          <h3 className="text-sm font-medium text-gray-700 dark:text-white/90 mb-2">
            Selected Players:
          </h3>
          <div className="flex flex-wrap gap-2">
            {selectedPlayers.map((player) => (
              <div
                key={player._id}
                className="flex items-center gap-1 px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg text-xs"
              >
                <span>{player.Name}</span>
                <button
                  onClick={() => handleRemoveClick(player)}
                  disabled={loadingAction === player._id}
                  className="text-blue-500 dark:text-blue-300 hover:text-red-500 dark:hover:text-red-400 ml-1"
                >
                  {loadingAction === player._id ? "..." : "×"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[700px]">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Name
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  University
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Category
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Value
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {filteredData.length > 0 ? (
                filteredData.map((player) => {
                  const playerValue = calculatePlayerValue(player);
                  const playerInSelection = isPlayerSelected(player);

                  return (
                    <TableRow key={player._id}>
                      <TableCell className="px-5 py-4 sm:px-6 text-start text-gray-800 dark:text-white/90">
                        {player.Name}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {player.University || "-"}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {player.Category}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {formatCurrency(playerValue)}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleViewClick(player)}
                            className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                          >
                            View
                          </button>

                          {playerInSelection ? (
                            <button
                              onClick={() => handleRemoveClick(player)}
                              disabled={loadingAction === player._id}
                              className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                            >
                              {loadingAction === player._id
                                ? "Removing..."
                                : "Remove"}
                            </button>
                          ) : (
                            <button
                              onClick={() => handleAddClick(player)}
                              disabled={
                                selectedPlayers.length >= 11 ||
                                playerValue > budget ||
                                loadingAction === player._id
                              }
                              className={`px-3 py-1 text-xs text-white rounded transition-colors ${
                                selectedPlayers.length >= 11 ||
                                playerValue > budget ||
                                loadingAction === player._id
                                  ? "bg-gray-400 cursor-not-allowed"
                                  : "bg-green-500 hover:bg-green-600"
                              }`}
                            >
                              {loadingAction === player._id
                                ? "Adding..."
                                : "Add"}
                            </button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                    No results found. Try adjusting your search or filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Modal for viewing player details */}
      {isModalOpen && selectedPlayer && (
        <PlayerPopUp
          player={selectedPlayer}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
