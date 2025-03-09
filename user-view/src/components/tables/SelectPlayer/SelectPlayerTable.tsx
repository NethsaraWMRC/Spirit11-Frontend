import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import PlayerPopUp from "./PlayerPopUp";

import { playersData, Player } from "./PlayersData";
import {
  calculatePlayerPoints,
  calculatePlayerValue,
  formatCurrency,
} from "./Calculation";

export default function PlayersTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New state variables for tracking selected players and budget
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
  const [budget, setBudget] = useState(9000000); // Initial budget of 9,000,000

  // Get unique categories for the filter dropdown
  const categories = [
    "All",
    ...new Set(playersData.map((player) => player.Category)),
  ];

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

  const handleAddClick = (player: Player) => {
    // Check if we already have 11 players
    if (selectedPlayers.length >= 11) {
      alert("You can only select up to 11 players");
      return;
    }

    // Check if player is already selected
    if (selectedPlayers.some((p) => p.Name === player.Name)) {
      alert("This player is already in your selection");
      return;
    }

    // Check if we have enough budget
    const playerValue = calculatePlayerValue(player);
    if (playerValue > budget) {
      alert("Not enough budget to add this player");
      return;
    }

    // Add player to selection and update budget
    setSelectedPlayers([...selectedPlayers, player]);
    setBudget(budget - playerValue);
  };

  const handleRemoveClick = (player: Player) => {
    // Remove player from selection and return value to budget
    setSelectedPlayers(selectedPlayers.filter((p) => p.Name !== player.Name));
    setBudget(budget + calculatePlayerValue(player));
  };

  // Check if a player is in the selected list
  const isPlayerSelected = (player: Player) => {
    return selectedPlayers.some((p) => p.Name === player.Name);
  };

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
                key={player.Name}
                className="flex items-center gap-1 px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg text-xs"
              >
                <span>{player.Name}</span>
                <button
                  onClick={() => handleRemoveClick(player)}
                  className="text-blue-500 dark:text-blue-300 hover:text-red-500 dark:hover:text-red-400 ml-1"
                >
                  ×
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
                {/* <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Points
                </TableCell> */}
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
                filteredData.map((player, index) => {
                  const playerPoints = calculatePlayerPoints(player);
                  const playerValue = calculatePlayerValue(player);
                  const playerInSelection = isPlayerSelected(player);

                  return (
                    <TableRow key={index}>
                      <TableCell className="px-5 py-4 sm:px-6 text-start text-gray-800 dark:text-white/90">
                        {player.Name}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {player.University || "-"}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {player.Category}
                      </TableCell>
                      {/* <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {playerPoints}
                      </TableCell> */}
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
                              className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                            >
                              Remove
                            </button>
                          ) : (
                            <button
                              onClick={() => handleAddClick(player)}
                              disabled={
                                selectedPlayers.length >= 11 ||
                                playerValue > budget
                              }
                              className={`px-3 py-1 text-xs text-white rounded transition-colors ${
                                selectedPlayers.length >= 11 ||
                                playerValue > budget
                                  ? "bg-gray-400 cursor-not-allowed"
                                  : "bg-green-500 hover:bg-green-600"
                              }`}
                            >
                              Add
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
