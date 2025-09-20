"use client";

import * as React from "react";
import Notification from "@/components/Sidebar/Right/Notification";
import Activities from "@/components/Sidebar/Right/Activities";
import Contacts from "@/components/Sidebar/Right/Contacts";

import { Sidebar, SidebarContent, SidebarRail } from "@/components/ui/sidebar";

export default function RightSidebar({ ...props }) {
    return (
        <Sidebar collapsible="offcanvas" side="right" {...props}>
            <SidebarContent>
                <Notification />
                <Activities />
                <Contacts />
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
}
