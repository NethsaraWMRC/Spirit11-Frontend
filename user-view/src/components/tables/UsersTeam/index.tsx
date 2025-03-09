import { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../../ui/table";
import Badge from "../../ui/badge/Badge";
import { getUserTeam } from "../../../api/userteam"; // Import the API method
import PlayerPopUp from "./userTeamPopup"; // Import the PlayerPopUp component

interface Order {
    id: number;
    player: {
        name: string;
        university: string;
        category: string;
        totalRuns?: number;
        ballsFaced?: number;
        inningsPlayed?: number;
        wickets?: number;
        oversBowled?: number;
        runsConceded?: number;
    };
    value: string;
    status: string;
}


export default function UsersTeamTable() {
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("All");
    const [tableData, setTableData] = useState<Order[]>([]); // State for table data
    const [selectedPlayer, setSelectedPlayer] = useState<Order["player"] | null>(null); // State for selected player
    const [isPopupOpen, setIsPopupOpen] = useState(false); // State for popup visibility
    const [isLoading, setIsLoading] = useState(true); // State for loading
    const [error, setError] = useState<string | null>(null); // State for error

    const userId = "67cd35d58c7d16809050b942"; // Example userId

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getUserTeam(userId);
                const formattedData = data.map((item: { player: { name: string; university: string; category: string; totalRuns: number; ballsFaced: number; inningsPlayed: number; wickets: number; oversBowled: number; runsConceded: number }; price: number }, index: number) => ({
                    id: index + 1,
                    player: {
                        name: item.player.name,
                        university: item.player.university,
                        category: item.player.category,
                        totalRuns: item.player.totalRuns,
                        ballsFaced: item.player.ballsFaced,
                        inningsPlayed: item.player.inningsPlayed,
                        wickets: item.player.wickets,
                        oversBowled: item.player.oversBowled,
                        runsConceded: item.player.runsConceded,
                    },
                    value: `${(item.price / 1000).toFixed(1)}K`,
                    status: "Added",
                }));
                setTableData(formattedData);
                setError(null);
            } catch {
                setError("Failed to fetch data");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [userId]);

    const categories = ["All", ...new Set(tableData.map((order) => order.player.category))];

    const filteredData = tableData.filter((order) => {
        const matchesSearch =
            order.player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.player.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.player.category.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory =
            categoryFilter === "All" || order.player.category === categoryFilter;

        return matchesSearch && matchesCategory;
    });

    const handleViewClick = (player: Order["player"]) => {
        setSelectedPlayer(player);
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
        setSelectedPlayer(null);
    };

    const totalValue = tableData.reduce((sum, order) => sum + parseFloat(order.value.replace('K', '')) * 1000, 0);
    const remainingBudget = 9000000 - totalValue;
    const playerCount = tableData.length;

    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            {/* Budget and Player Count Display */}
            <div className="p-4 border-b border-gray-100 dark:border-white/[0.05] flex flex-wrap gap-3 items-center justify-between">
                <div className="font-medium text-gray-700 dark:text-white/90">
                    Remaining Budget: <span className="text-green-600 dark:text-green-400">Rs. {remainingBudget.toLocaleString()}</span>
                </div>
                <div className="font-medium text-gray-700 dark:text-white/90">
                    Players:<span
                        className="text-blue-500"

                    > {playerCount}/11</span>
                </div>
            </div>
            {/* Search and Filter Controls */}
            <div className="p-4 border-b border-gray-100 dark:border-white/[0.05] flex flex-wrap gap-3 items-center justify-between">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search by name, university, or category..."
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
                <div className="min-w-[1102px]">
                    {isLoading ? (
                        <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                            Loading...
                        </div>
                    ) : error ? (
                        <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                            {error}
                        </div>
                    ) : tableData.length === 0 ? (
                        <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                            No team is selected.
                        </div>
                    ) : (
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
                                        Status
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
                                    filteredData.map((order) => (
                                        <TableRow key={order.id}>
                                            <TableCell className="px-5 py-4 sm:px-6 text-start">
                                                <div className="flex items-center gap-3">
                                                    <div>
                                                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                                            {order.player.name}
                                                        </span>
                                                        <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                                                            {order.player.university}
                                                        </span>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                {order.player.university}
                                            </TableCell>
                                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                {order.player.category}
                                            </TableCell>
                                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                <Badge
                                                    size="sm"
                                                    color="success"
                                                >
                                                    {order.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                                Rs. {order.value}
                                            </TableCell>
                                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                <button
                                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                                                    onClick={() => handleViewClick(order.player)}
                                                >
                                                    View
                                                </button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                                            No results found. Try adjusting your search or check is that team is selected or not.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    )}
                </div>
            </div>

            {/* Player Popup */}
            {selectedPlayer && (
                <PlayerPopUp
                    player={selectedPlayer}
                    isOpen={isPopupOpen}
                    onClose={handleClosePopup}
                    setIsPopupOpen={setIsPopupOpen}
                />
            )}
        </div>
    );
}
