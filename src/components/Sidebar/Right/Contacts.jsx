import React from "react";
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import avatar6 from "@/assets/avatars/avatar-6.png";
import avatar7 from "@/assets/avatars/avatar-7.png";
import avatar8 from "@/assets/avatars/avatar-8.png";
import avatar9 from "@/assets/avatars/avatar-9.png";
import avatar10 from "@/assets/avatars/avatar-10.png";
import avatar11 from "@/assets/avatars/avatar-11.png";

const contactsData = [
    {
        id: 1,
        avatar: avatar6,
        name: "Natali Craig",
        fallback: "NC",
    },
    {
        id: 2,
        avatar: avatar7,
        name: "Drew Cano",
        fallback: "DC",
    },
    {
        id: 3,
        avatar: avatar8,
        name: "Orlando Diggs",
        fallback: "OD",
    },
    {
        id: 4,
        avatar: avatar9,
        name: "Andi Lane",
        fallback: "AL",
    },
    {
        id: 5,
        avatar: avatar10,
        name: "Kate Morrison",
        fallback: "KM",
    },
    {
        id: 6,
        avatar: avatar11,
        name: "Koray Okumus",
        fallback: "KO",
    },
];

const Contacts = () => {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Contacts</SidebarGroupLabel>
            <SidebarMenu>
                {contactsData.map((contact) => (
                    <SidebarMenuItem key={contact.id}>
                        <SidebarMenuButton className="flex items-center gap-3">
                            <Avatar className="w-6 h-6 flex-shrink-0">
                                <AvatarImage
                                    src={contact.avatar}
                                    alt={contact.name}
                                />
                                <AvatarFallback className="text-xs">
                                    {contact.fallback}
                                </AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-sidebar-foreground">
                                {contact.name}
                            </span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
};

export default Contacts;
