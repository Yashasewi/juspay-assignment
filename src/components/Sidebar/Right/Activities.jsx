import React from "react";
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import avatar1 from "@/assets/avatars/avatar-1.png";
import avatar2 from "@/assets/avatars/avatar-2.png";
import avatar3 from "@/assets/avatars/avatar-3.png";
import avatar4 from "@/assets/avatars/avatar-4.png";
import avatar5 from "@/assets/avatars/avatar-5.png";

const activitiesData = [
    {
        id: 1,
        avatar: avatar1,
        name: "User",
        fallback: "U1",
        activity: "You have a bug that needs to be fixed.",
        timestamp: "Just now",
    },
    {
        id: 2,
        avatar: avatar2,
        name: "Female05",
        fallback: "F5",
        activity: "Released a new version",
        timestamp: "59 minutes ago",
    },
    {
        id: 3,
        avatar: avatar3,
        name: "3D08",
        fallback: "3D",
        activity: "Submitted a bug",
        timestamp: "12 hours ago",
    },
    {
        id: 4,
        avatar: avatar4,
        name: "Male07",
        fallback: "M7",
        activity: "Modified A data in Page X",
        timestamp: "Today, 11:59 AM",
    },
    {
        id: 5,
        avatar: avatar5,
        name: "Male11",
        fallback: "M11",
        activity: "Deleted a page in Project X",
        timestamp: "Feb 2, 2023",
    },
];

const Activities = () => {
    return (
        <SidebarGroup>
            <SidebarGroupLabel className="font-semibold text-sm mb-2">
                Activities
            </SidebarGroupLabel>
            <SidebarMenu className="gap-0">
                {activitiesData.map((activity, index) => (
                    <SidebarMenuItem key={activity.id} className="relative">
                        <SidebarMenuButton
                            size="lg"
                            className="flex items-start gap-3 py-4"
                        >
                            <div className="relative flex-shrink-0">
                                <Avatar className="size-8 relative z-10">
                                    <AvatarImage
                                        src={activity.avatar}
                                        alt={activity.name}
                                    />
                                    <AvatarFallback className="text-xs">
                                        {activity.fallback}
                                    </AvatarFallback>
                                </Avatar>
                                {/* Vertical line connecting avatars */}
                                {index < activitiesData.length - 1 && (
                                    <Separator
                                        orientation="vertical"
                                        className="absolute left-4 top-8 h-10 w-px bg-border/60 z-0"
                                    />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-sm text-sidebar-foreground leading-tight truncate">
                                    {activity.activity}
                                </div>
                                <div className="text-xs text-sidebar-foreground/60 mt-1 truncate">
                                    {activity.timestamp}
                                </div>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
};

export default Activities;
