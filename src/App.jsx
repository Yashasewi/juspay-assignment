import { AppSidebar } from "@/components/Sidebar/Left/LeftSidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Bell, History, PanelRight } from "lucide-react";
import {
    SidebarInset,
    SidebarProvider,
    LeftSidebarTrigger,
    RightSidebarTrigger,
} from "@/components/ui/sidebar";
import { Star } from "lucide-react";
import { CommandMenu } from "@/components/Sidebar/Left/SearchMenu";
import { ThemeProvider } from "@/components/Theme/ThemeProvider";
import { ModeToggle } from "@/components/Theme/ThemeToggle";
import RightSidebar from "@/components/Sidebar/Right/RightSidebar";

export default function App() {
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
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <SidebarProvider
                defaultOpen={defaultLeftOpen}
                defaultRightOpen={defaultRightOpen}
            >
                <AppSidebar />
                <SidebarInset>
                    <header className="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b-1 mb-2">
                        <div className="flex items-center gap-2 px-4">
                            {/* #TODO: make the icon similar to the one in the figma file */}
                            <LeftSidebarTrigger className="-ml-1" />
                            <Star className="size-4 fill-primary/10" />
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem className="hidden md:block">
                                        <BreadcrumbLink href="#">
                                            Dashboards
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator className="hidden md:block" />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>Default</BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>
                        <div className="w-full md:w-[60%] max-w-[500px] flex flex-row gap-2 justify-end align-center px-4">
                            <CommandMenu />
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
                    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                            <div className="bg-muted/50 aspect-video rounded-xl" />
                            <div className="bg-muted/50 aspect-video rounded-xl" />
                            <div className="bg-muted/50 aspect-video rounded-xl" />
                        </div>
                        <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
                    </div>
                </SidebarInset>
                <RightSidebar />
            </SidebarProvider>
        </ThemeProvider>
    );
}
