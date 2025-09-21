"use client";

import { ArrowUpDown, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { userAvatars } from "@/data/ordersData";

const getStatusColor = (status) => {
    switch (status) {
        case "In Progress":
            return "text-[var(--status-progress-text)]";
        case "Complete":
            return "text-[var(--status-complete-text)]";
        case "Pending":
            return "text-[var(--status-pending-text)]";
        case "Approved":
            return "text-[var(--status-approved-text)]";
        case "Rejected":
            return "text-[var(--status-rejected-text)]";
        default:
            return "text-[var(--text-secondary)]";
    }
};

export const columns = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <div className="group-hover:opacity-100 group-data-[state=selected]:opacity-100 opacity-0 transition-opacity duration-150">
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            </div>
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "orderId",
        header: "Order ID",
        cell: ({ row }) => (
            <div className="font-medium">{row.getValue("orderId")}</div>
        ),
        enableSorting: false,
    },
    {
        accessorKey: "user",
        header: "User",
        cell: ({ row }) => {
            const user = row.getValue("user");
            return (
                <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                        <AvatarImage
                            src={userAvatars[user.avatar]}
                            alt={user.name}
                        />
                        <AvatarFallback>
                            {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                        </AvatarFallback>
                    </Avatar>
                    <div className="font-medium">{user.name}</div>
                </div>
            );
        },
    },
    {
        accessorKey: "project",
        header: "Project",
        cell: ({ row }) => <div>{row.getValue("project")}</div>,
        enableSorting: false,
    },
    {
        accessorKey: "address",
        header: "Address",
        cell: ({ row }) => <div>{row.getValue("address")}</div>,
    },
    {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }) => (
            <div className="flex items-center">
                <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                <div>{row.getValue("date")}</div>
            </div>
        ),
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status");
            return (
                <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        status
                    )}`}
                >
                    <span className="w-2 h-2 rounded-full bg-current mr-1"></span>
                    {status}
                </span>
            );
        },
    },
];
