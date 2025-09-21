import { Outlet } from "react-router-dom";
import LeftSidebar from "@/components/Sidebar/Left/LeftSidebar";
import { Bell, History, PanelRight, Search } from "lucide-react";
import {
    SidebarInset,
    SidebarProvider,
    LeftSidebarTrigger,
    RightSidebarTrigger,
} from "@/components/ui/sidebar";
import { Star } from "lucide-react";
import SearchMenu from "@/components/Sidebar/Left/SearchMenu";
import { ModeToggle } from "@/components/Theme/ThemeToggle";
import RightSidebar from "@/components/Sidebar/Right/RightSidebar";
import { DynamicBreadcrumb } from "@/components/Navigation/DynamicBreadcrumb";

export default function Layout() {
    // Read the left sidebar state from the cookie
    const leftCookieStore = document.cookie.match(
        /left_sidebar_state=(true|false)/
    );
    // Determine if the left sidebar should be open or closed based on the cookie value
    const defaultLeftOpen = leftCookieStore?.[1] === "true";

    // Read the right sidebar state from the cookie
    const rightCookieStore = document.cookie.match(
        /right_sidebar_state=(true|false)/
    );
    // Determine if the right sidebar should be open or closed based on the cookie value
    const defaultRightOpen = rightCookieStore?.[1] === "true";

    return (
        <SidebarProvider
            defaultOpen={defaultLeftOpen}
            defaultRightOpen={defaultRightOpen}
        >
            <LeftSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b-1 mb-2">
                    <div className="flex items-center gap-2 px-4">
                        {/* #TODO: make the icon similar to the one in the figma file */}
                        <LeftSidebarTrigger className="-ml-1" />
                        <Star className="size-4 fill-primary/10" />
                        <DynamicBreadcrumb />
                    </div>
                    <div className="w-full md:w-[60%] max-w-[500px] flex flex-row gap-2 justify-end align-center px-4">
                        <SearchMenu />
                        <div className="flex flex-row gap-2 align-center justify-center text-black dark:text-white w-fit">
                            <ModeToggle />
                            <RightSidebarTrigger
                                className="hidden md:flex p-0 m-0 h-full"
                                size="sm"
                            >
                                <History />
                            </RightSidebarTrigger>
                            <RightSidebarTrigger
                                className="p-1 m-0 h-full"
                                size="sm"
                            >
                                <Bell />
                            </RightSidebarTrigger>
                            <RightSidebarTrigger
                                className="hidden md:flex p-1 m-0 h-full"
                                size="sm"
                            >
                                <PanelRight />
                            </RightSidebarTrigger>
                        </div>
                    </div>
                </header>
                <main className="flex flex-1 flex-col gap-4 p-4 pt-0 h-full">
                    {/* This is where the page content will be rendered */}
                    <Outlet />
                </main>
            </SidebarInset>
            <RightSidebar />
        </SidebarProvider>
    );
}
