"use client";

import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {
    ArrowUpDown,
    ChevronLeft,
    ChevronRight,
    Filter,
    Plus,
    Search,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useIsMobile } from "@/hooks/use-mobile";

export function DataTable({ columns, data }) {
    const [sorting, setSorting] = useState([]);
    const [columnFilters, setColumnFilters] = useState([]);
    const [columnVisibility, setColumnVisibility] = useState({});
    const [rowSelection, setRowSelection] = useState({});
    const [globalFilter, setGlobalFilter] = useState("");
    const isMobile = useIsMobile();

    // Set responsive column visibility
    useEffect(() => {
        if (isMobile !== undefined) {
            setColumnVisibility((prev) => ({
                ...prev,
                address: !isMobile, // Hide address on mobile
                date: !isMobile, // Hide date on mobile
                project: !isMobile, // Hide project on mobile for very small screens
            }));
        }
    }, [isMobile]);

    // Custom global filter function to search across all fields including nested objects
    const globalFilterFn = useMemo(
        () => (row, columnId, value) => {
            const search = value.toLowerCase().trim();

            if (!search) return true; // Show all rows when search is empty

            // Get all values from the row including nested objects
            const searchableValues = [
                row.original.orderId,
                row.original.user?.name,
                row.original.project,
                row.original.address,
                row.original.date,
                row.original.status,
            ];

            return searchableValues.some((field) => {
                const fieldValue = field?.toString().toLowerCase();
                return fieldValue?.includes(search);
            });
        },
        []
    );

    // Debounced search to improve performance
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            setGlobalFilter(searchValue);
        }, 300); // 300ms debounce

        return () => clearTimeout(timer);
    }, [searchValue]);

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: globalFilterFn,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            globalFilter,
        },
    });

    return (
        <div className="w-full space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-primary-foreground rounded-lg p-3 sm:p-2 gap-3 sm:gap-0">
                {/* Left side - Action buttons */}
                <div className="flex items-center gap-2 order-2 sm:order-1">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-white/60"
                        onClick={() => {
                            // Add order functionality - could open a modal or navigate
                            console.log("Add order clicked");
                        }}
                        title="Add Order"
                    >
                        <Plus className="h-5 w-5 text-[#1C1C1C]" />
                    </Button>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 hover:bg-white/60"
                                title="Filter"
                            >
                                <Filter className="h-5 w-5 text-[#1C1C1C]" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-56">
                            <div className="p-3 space-y-2">
                                <div className="text-sm font-medium">
                                    Status
                                </div>
                                <Select
                                    value={
                                        table
                                            .getColumn("status")
                                            ?.getFilterValue() ?? "all"
                                    }
                                    onValueChange={(value) =>
                                        table
                                            .getColumn("status")
                                            ?.setFilterValue(
                                                value === "all" ? "" : value
                                            )
                                    }
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Filter by status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">
                                            All Status
                                        </SelectItem>
                                        <SelectItem value="In Progress">
                                            In Progress
                                        </SelectItem>
                                        <SelectItem value="Complete">
                                            Complete
                                        </SelectItem>
                                        <SelectItem value="Pending">
                                            Pending
                                        </SelectItem>
                                        <SelectItem value="Approved">
                                            Approved
                                        </SelectItem>
                                        <SelectItem value="Rejected">
                                            Rejected
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 hover:bg-white/60"
                                title="Sort & View Columns"
                            >
                                <ArrowUpDown className="h-5 w-5 text-[#1C1C1C]" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-56">
                            <div className="p-3 space-y-2">
                                <div className="text-sm font-medium">
                                    Columns
                                </div>
                                <div className="space-y-1">
                                    {table
                                        .getAllColumns()
                                        .filter((column) => column.getCanHide())
                                        .map((column) => {
                                            return (
                                                <DropdownMenuCheckboxItem
                                                    key={column.id}
                                                    className="capitalize"
                                                    checked={column.getIsVisible()}
                                                    onCheckedChange={(value) =>
                                                        column.toggleVisibility(
                                                            !!value
                                                        )
                                                    }
                                                >
                                                    {column.id}
                                                </DropdownMenuCheckboxItem>
                                            );
                                        })}
                                </div>
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {/* Right side - Search */}
                <div className="relative order-1 sm:order-2 w-full sm:w-auto">
                    <div className="flex items-center bg-white/40 border border-[#1C1C1C]/10 rounded-lg px-2 py-1 gap-1 w-full sm:w-auto">
                        <Search
                            className={`h-4 w-4 ${
                                globalFilter
                                    ? "text-[#1C1C1C]/60"
                                    : "text-[#1C1C1C]/20"
                            }`}
                        />
                        <Input
                            placeholder="Search"
                            value={searchValue}
                            onChange={(event) =>
                                setSearchValue(event.target.value)
                            }
                            className="border-0 bg-transparent text-sm placeholder:text-[#1C1C1C]/20 focus-visible:ring-0 focus-visible:ring-offset-0 h-auto p-0 w-full sm:w-[116px]"
                        />
                        <span className="text-sm text-[#1C1C1C]/20 opacity-0 hidden sm:inline">
                            ⌘/
                        </span>
                    </div>
                </div>
            </div>

            {/* Search results indicator */}
            {globalFilter && (
                <div className="text-sm text-muted-foreground mb-2">
                    {table.getFilteredRowModel().rows.length} of{" "}
                    {table.getCoreRowModel().rows.length} results
                    {globalFilter && ` for "${globalFilter}"`}
                </div>
            )}


            <div className="overflow-x-auto rounded-md border">
                <Table className="min-w-[400px]">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            key={header.id}
                                            className="whitespace-nowrap"
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                    className="group"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className="whitespace-nowrap"
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-4 gap-4">
                {/* Selection count - only show when rows are selected */}
                {table.getFilteredSelectedRowModel().rows.length > 0 && (
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground order-2 sm:order-1">
                        <span>
                            {table.getFilteredSelectedRowModel().rows.length} of{" "}
                            {table.getFilteredRowModel().rows.length} row(s)
                            selected.
                        </span>
                    </div>
                )}

                <div className="flex items-center space-x-2 ml-auto order-1 sm:order-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <span className="sr-only">Go to previous page</span>
                        <ChevronLeft className="h-4 w-4" />
                    </Button>

                    {/* Page numbers - show fewer on mobile */}
                    {(() => {
                        const currentPage =
                            table.getState().pagination.pageIndex;
                        const totalPages = table.getPageCount();
                        const pages = [];
                        const maxPages = isMobile ? 3 : 5; // Show fewer pages on mobile

                        // Show up to maxPages around current page
                        let startPage = Math.max(
                            0,
                            currentPage - Math.floor(maxPages / 2)
                        );
                        let endPage = Math.min(
                            totalPages - 1,
                            startPage + maxPages - 1
                        );

                        // Adjust start if we're near the end
                        if (endPage - startPage < maxPages - 1) {
                            startPage = Math.max(0, endPage - maxPages + 1);
                        }

                        for (let i = startPage; i <= endPage; i++) {
                            pages.push(
                                <Button
                                    key={i}
                                    variant={
                                        currentPage === i ? "default" : "ghost"
                                    }
                                    size="sm"
                                    className={`h-7 w-7 p-0 text-sm ${
                                        currentPage === i
                                            ? "bg-primary text-primary-foreground"
                                            : "hover:bg-accent hover:text-accent-foreground"
                                    }`}
                                    onClick={() => table.setPageIndex(i)}
                                >
                                    {i + 1}
                                </Button>
                            );
                        }

                        return pages;
                    })()}

                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <span className="sr-only">Go to next page</span>
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
