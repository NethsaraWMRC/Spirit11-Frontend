import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../../ui/table";

import Badge from "../../ui/badge/Badge";

interface Order {
    id: number;
    player: {
        name: string;
        university: string;
        category: string;
    };
    value: string;
    status: string;
}

// Define the table data using the interface
const tableData: Order[] = [
    {
        id: 1,
        player: {
            name: "Lindsey Curtis",
            university: "Harvard University",
            category: "Batsman",
        },
        value: "3.9K",
        status: "Added",
    },
    {
        id: 2,
        player: {
            name: "Kaiya George",
            university: "Stanford University",
            category: "All-Rounder",
        },
        value: "24.9K",
        status: "Added",
    },
    {
        id: 3,
        player: {
            name: "Zain Geidt",
            university: "MIT",
            category: "Bowler",
        },
        value: "12.7K",
        status: "Added",
    },
    {
        id: 4,
        player: {
            name: "Abram Schleiferr",
            university: "Yale University",
            category: "Batsman",
        },
        value: "2.8K",
        status: "Added",
    },
    {
        id: 5,
        player: {
            name: "Carla George",
            university: "Princeton University",
            category: "All-Rounder",
        },
        value: "4.5K",
        status: "Added",
    },
];

export default function UsersTeamTable() {
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("All");

    // Get unique categories for the filter dropdown
    const categories = ["All", ...new Set(tableData.map((order) => order.player.category))];

    // Filter the data based on search term and category filter
    const filteredData = tableData.filter((order) => {
        const matchesSearch =
            order.player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.player.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.player.category.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory =
            categoryFilter === "All" || order.player.category === categoryFilter;

        return matchesSearch && matchesCategory;
    });

    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
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
                                            {order.value}
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                                                View
                                            </button>
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
        </div>
    );
}
