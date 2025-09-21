import React from "react";
import { Bug, User, Radio } from "lucide-react";
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "@/components/ui/sidebar";

const notificationsData = [
    {
        id: 1,
        icon: Bug,
        bgColor: "bg-[var(--notification-bug)]",
        message: "You have a bug that needs to be fixed.",
        timestamp: "Just now",
    },
    {
        id: 2,
        icon: User,
        bgColor: "bg-[var(--notification-other)]",
        message: "New user registered",
        timestamp: "59 minutes ago",
    },
    {
        id: 3,
        icon: Bug,
        bgColor: "bg-[var(--notification-bug)]",
        message: "You have a bug that needs to be fixed.",
        timestamp: "12 hours ago",
    },
    {
        id: 4,
        icon: Radio,
        bgColor: "bg-[var(--notification-other)]",
        message: "Andi Lane subscribed to you",
        timestamp: "Today, 11:59 AM",
    },
];

const Notification = () => {
    return (
        <SidebarGroup>
            <SidebarGroupLabel className="font-semibold text-sm mb-2">
                Notifications
            </SidebarGroupLabel>
            <SidebarMenu className="gap-2">
                {notificationsData.map((notification) => {
                    const IconComponent = notification.icon;
                    return (
                        <SidebarMenuItem key={notification.id}>
                            <SidebarMenuButton
                                size="lg"
                                className="flex items-start gap-4"
                            >
                                <div
                                    className={`flex items-center justify-center w-8 h-8 rounded-lg ${notification.bgColor} flex-shrink-0`}
                                >
                                    <IconComponent className="w-4 h-4 text-foreground dark:text-background" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm text-sidebar-foreground leading-tight truncate">
                                        {notification.message}
                                    </div>
                                    <div className="text-xs text-sidebar-foreground/60 mt-1 truncate">
                                        {notification.timestamp}
                                    </div>
                                </div>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
};

export default Notification;
