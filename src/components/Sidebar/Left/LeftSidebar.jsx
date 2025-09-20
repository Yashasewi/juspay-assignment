"use client";

import * as React from "react";
import {
    Settings2,
    ShoppingCart,
    FolderOpen,
    GraduationCap,
    Users,
    Building2,
    FileText,
    MessageSquare,
    BarChart3,
} from "lucide-react";

import { NavMain } from "@/components/Sidebar/Left/nav-main";
import NavRecent from "@/components/Sidebar/Left/nav-recent";
import UserProfile from "@/components/Sidebar/Left/UserProfile";
import userAvatar from "@/assets/user.png";

import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
    user: {
        name: "ByeWind",
        email: "m@example.com",
        avatar: userAvatar,
    },
    favorites: [
        {
            title: "Overview",
            url: "#",
        },
        {
            title: "Projects",
            url: "#",
        },
    ],
    dashboards: [
        {
            title: "Default",
            url: "#",
            icon: BarChart3,
            isActive: true,
        },
        {
            title: "eCommerce",
            url: "#",
            icon: ShoppingCart,
            items: [
                {
                    title: "Products",
                    url: "#",
                },
                {
                    title: "Orders",
                    url: "#",
                },
            ],
        },
        {
            title: "Projects",
            url: "#",
            icon: FolderOpen,
            items: [
                {
                    title: "Active Projects",
                    url: "#",
                },
                {
                    title: "Completed",
                    url: "#",
                },
            ],
        },
        {
            title: "Online Courses",
            url: "#",
            icon: GraduationCap,
            items: [
                {
                    title: "Course Library",
                    url: "#",
                },
                {
                    title: "My Courses",
                    url: "#",
                },
            ],
        },
    ],
    pages: [
        {
            title: "User Profile",
            url: "#",
            icon: Users,
            items: [
                {
                    title: "Overview",
                    url: "#",
                },
                {
                    title: "Projects",
                    url: "#",
                },
                {
                    title: "Campaigns",
                    url: "#",
                },
                {
                    title: "Documents",
                    url: "#",
                },
                {
                    title: "Followers",
                    url: "#",
                },
            ],
        },
        {
            title: "Account",
            url: "#",
            icon: Settings2,
            items: [
                {
                    title: "Profile Settings",
                    url: "#",
                },
                {
                    title: "Security",
                    url: "#",
                },
            ],
        },
        {
            title: "Corporate",
            url: "#",
            icon: Building2,
            items: [
                {
                    title: "Company Info",
                    url: "#",
                },
                {
                    title: "Team Members",
                    url: "#",
                },
            ],
        },
        {
            title: "Blog",
            url: "#",
            icon: FileText,
            items: [
                {
                    title: "All Posts",
                    url: "#",
                },
                {
                    title: "Published",
                    url: "#",
                },
            ],
        },
        {
            title: "Social",
            url: "#",
            icon: MessageSquare,
            items: [
                {
                    title: "Posts",
                    url: "#",
                },
                {
                    title: "Messages",
                    url: "#",
                },
            ],
        },
    ],
    recent: [
        {
            title: "Project Alpha",
            url: "#",
        },
        {
            title: "Project Beta",
            url: "#",
        },
    ],
};

export function AppSidebar({ ...props }) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <UserProfile user={data.user} />
            </SidebarHeader>
            <SidebarContent className="scrollbar">
                <NavRecent projects={data.recent} favorites={data.favorites} />
                <NavMain items={data.dashboards} title="Dashboards" />
                <NavMain items={data.pages} title="Pages" />
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
}
