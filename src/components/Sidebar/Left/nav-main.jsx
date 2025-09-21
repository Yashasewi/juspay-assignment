import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar";

export function NavMain({ items, title = "Platform" }) {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>{title}</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <Collapsible
                        key={item.title}
                        asChild
                        defaultOpen={item.isActive}
                        className="group/collapsible"
                    >
                        <SidebarMenuItem>
                            <CollapsibleTrigger asChild>
                                <SidebarMenuButton tooltip={item.title}>
                                    {item.items ? (
                                        <ChevronRight
                                            className="text-primary/20 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 group-data-[collapsible=icon]:hidden"
                                            data-sidebar-chevron
                                        />
                                    ) : (
                                        <span className="group-data-[collapsible=icon]:hidden size-4 border-l-2 border-primary rounded-xs" />
                                    )}
                                    {/* #TODO: when in closed state show some type of feedback */}
                                    {item.icon && (
                                        <item.icon
                                            className="group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:shrink-0"
                                            data-sidebar-item-icon
                                        />
                                    )}
                                    {item.url ? (
                                        <Link to={item.url}>
                                            <span>{item.title}</span>
                                        </Link>
                                    ) : (
                                        <span>{item.title}</span>
                                    )}
                                </SidebarMenuButton>
                            </CollapsibleTrigger>
                            {item.items ? (
                                <CollapsibleContent>
                                    <SidebarMenuSub className="border-none">
                                        {item.items?.map((subItem) => (
                                            <SidebarMenuSubItem
                                                key={subItem.title}
                                            >
                                                <SidebarMenuSubButton asChild>
                                                    <Link to={subItem.url}>
                                                        <span>
                                                            {subItem.title}
                                                        </span>
                                                    </Link>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        ))}
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            ) : null}
                        </SidebarMenuItem>
                    </Collapsible>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
