"use client";

import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function NavRecent({ projects, favorites }) {
    return (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <Tabs defaultValue="favorites" className="w-full gap-y-0 gap-x-2">
                <TabsList
                    variant="ghost"
                    className="grid w-full grid-cols-2 bg-transparent dark:bg-transparent text-left"
                >
                    <TabsTrigger
                        className="justify-start data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-foreground/40 text-foreground/20 dark:data-[state=active]:bg-transparent dark:data-[state=active]:shadow-none border-0"
                        value="favorites"
                    >
                        Favorites
                    </TabsTrigger>
                    <TabsTrigger
                        className="justify-start data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-foreground/40 text-foreground/20 dark:data-[state=active]:bg-transparent dark:data-[state=active]:shadow-none border-0"
                        value="recently"
                    >
                        Recently
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="favorites">
                    <SidebarMenu>
                        {favorites?.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild>
                                    <a href={item.url}>
                                        <span className="bg-primary/20 size-1 rounded-full"></span>
                                        <span>{item.title}</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </TabsContent>

                <TabsContent value="recently">
                    <SidebarMenu>
                        {projects?.map((project) => (
                            <SidebarMenuItem key={project.title}>
                                <SidebarMenuButton asChild>
                                    <a href={project.url}>
                                        <span className="bg-primary/20 size-1 rounded-full"></span>
                                        <span>{project.title}</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </TabsContent>
            </Tabs>
        </SidebarGroup>
    );
}
