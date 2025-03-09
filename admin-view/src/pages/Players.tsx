import React, { useState } from 'react'
import { useModal } from '../hooks/useModal';
import { Modal } from '../components/ui/modal';
import PlayerAddForm from '../components/common/Player Profile/PlayerAddForm';
import { Player, playersData } from '../components/common/Player Profile/PlayersData';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../components/ui/table';
import PlayerPopUp from '../components/common/Player Profile/PlayerPopUp';
import PlayerEditForm from '../components/common/Player Profile/PlayerEditForm';

const Players = () => {
    // Modal for adding a new player
    const { isOpen, openModal, closeModal } = useModal();
// Modal for editing a player
    const { isOpen: isEditModalOpen, openModal: openEditModal, closeModal: closeEditModal } = useModal();

    const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [playerToEdit, setPlayerToEdit] = useState<Player | null>(null);

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

  const handleEditClick = (player: Player) => {
    // Set the player to edit and open the edit modal
    setPlayerToEdit(player);
    openEditModal();
};

const handleUpdatePlayer = (updatedPlayer: Player) => {
    console.log("Player updated:", updatedPlayer);
    // Here you would typically update the player in your data source
    // For now, we'll just log the updated player
};

const handleDeleteClick = (player: Player) => {
    if (window.confirm(`Are you sure you want to delete ${player.Name}?`)) {
        console.log("Deleting player:", player);
        // Here you would typically delete the player from your data source
    }
};


  
    return (
        <>
            <div className="mb-6 flex justify-end">
                <button
                    onClick={openModal}
                    className="flex items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
                >
                    <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M9 3.75C9.41421 3.75 9.75 4.08579 9.75 4.5V13.5C9.75 13.9142 9.41421 14.25 9 14.25C8.58579 14.25 8.25 13.9142 8.25 13.5V4.5C8.25 4.08579 8.58579 3.75 9 3.75Z"
                            fill="currentColor"
                        />
                        <path
                            d="M3.75 9C3.75 8.58579 4.08579 8.25 4.5 8.25H13.5C13.9142 8.25 14.25 8.58579 14.25 9C14.25 9.41421 13.9142 9.75 13.5 9.75H4.5C4.08579 9.75 3.75 9.41421 3.75 9Z"
                            fill="currentColor"
                        />
                    </svg>
                    Add Player
                </button>
            </div>
            {/* Add Player Modal */}
            <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
                <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-8">
                    {/* Pass closeModal to PlayerAddForm */}
                    <PlayerAddForm closeModal={closeModal} />
                </div>
            </Modal>

               {/* Edit Player Modal */}
               <Modal isOpen={isEditModalOpen} onClose={closeEditModal} className="max-w-[700px] m-4">
                <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-8">
                    {playerToEdit && (
                        <PlayerEditForm 
                            player={playerToEdit} 
                            closeModal={closeEditModal}
                            onUpdate={handleUpdatePlayer} 
                        />
                    )}
                </div>
            </Modal>

            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
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

      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[600px]">
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
                filteredData.map((player, index) => (
                  <TableRow key={index}>
                    <TableCell className="px-5 py-4 sm:px-6 text-start text-gray-800 dark:text-white/90">
                        {player.Name}
                        {player["is New Player"] && (
                          <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                            New
                          </span>
                        )}
                      </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {player.Category}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      0
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleViewClick(player)}
                            className="p-2 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                            title="View Player"
                          >
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              width="16" 
                              height="16" 
                              fill="currentColor" 
                              viewBox="0 0 16 16"
                            >
                              <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                            </svg>
                          </button>
                          
                          <button
                            onClick={() => player["is New Player"] ? handleEditClick(player) : null}
                            className={`p-2 text-white rounded transition-colors ${
                              player["is New Player"]
                                ? "bg-warning-500 hover:bg-warning-600"
                                : "bg-gray-300 cursor-not-allowed"
                            }`}
                            disabled={!player["is New Player"]}
                            title={player["is New Player"] ? "Edit Player" : "Cannot edit non-new players"}
                          >
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              width="16" 
                              height="16" 
                              fill="currentColor" 
                              viewBox="0 0 16 16"
                            >
                              <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                            </svg>
                          </button>

                          
                          <button
                           onClick={() => player["is New Player"] ? handleDeleteClick(player) : null}
                            className={`p-2 text-white rounded transition-colors ${
                              player["is New Player"]
                                ? "bg-red-500 hover:bg-red-600"
                                : "bg-gray-300 cursor-not-allowed"
                            }`}
                            disabled={!player["is New Player"]}
                            title={player["is New Player"] ? "Delete Player" : "Cannot delete non-new players"}
                          >
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              width="16" 
                              height="16" 
                              fill="currentColor" 
                              viewBox="0 0 16 16"
                            >
                              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                              <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                            </svg>
                          </button>
                        </div>
                      </TableCell>
                  </TableRow>
                ))
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

        </>
    )
}

export default Players