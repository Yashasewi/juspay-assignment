import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { PanelLeftIcon } from "lucide-react";

import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

// Left Sidebar Constants
const LEFT_SIDEBAR_COOKIE_NAME = "left_sidebar_state";
const LEFT_SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const LEFT_SIDEBAR_WIDTH = "13.5rem";
const LEFT_SIDEBAR_WIDTH_MOBILE = "14rem";
const LEFT_SIDEBAR_WIDTH_ICON = "3rem";
const LEFT_SIDEBAR_KEYBOARD_SHORTCUT = "b";

// Right Sidebar Constants
const RIGHT_SIDEBAR_COOKIE_NAME = "right_sidebar_state";
const RIGHT_SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const RIGHT_SIDEBAR_WIDTH = "18rem";
const RIGHT_SIDEBAR_WIDTH_MOBILE = "20rem";
// No icon mode for right sidebar - always full width or closed

const SidebarContext = React.createContext(null);

function useSidebar() {
    const context = React.useContext(SidebarContext);
    if (!context) {
        throw new Error("useSidebar must be used within a SidebarProvider.");
    }

    return context;
}

function SidebarProvider({
    defaultOpen = true,
    defaultRightOpen = false,
    open: openProp,
    onOpenChange: setOpenProp,
    rightOpen: rightOpenProp,
    onRightOpenChange: setRightOpenProp,
    className,
    style,
    children,
    ...props
}) {
    const isMobile = useIsMobile();

    // Left sidebar mobile state
    const [leftOpenMobile, setLeftOpenMobile] = React.useState(false);

    // Right sidebar mobile state
    const [rightOpenMobile, setRightOpenMobile] = React.useState(false);

    // Left sidebar state management
    const [_leftOpen, _setLeftOpen] = React.useState(defaultOpen);
    const leftOpen = openProp ?? _leftOpen;
    const setLeftOpen = React.useCallback(
        (value) => {
            const openState =
                typeof value === "function" ? value(leftOpen) : value;
            if (setOpenProp) {
                setOpenProp(openState);
            } else {
                _setLeftOpen(openState);
            }
            // Set cookie for left sidebar
            document.cookie = `${LEFT_SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${LEFT_SIDEBAR_COOKIE_MAX_AGE}`;
        },
        [setOpenProp, leftOpen]
    );

    // Right sidebar state management
    const [_rightOpen, _setRightOpen] = React.useState(defaultRightOpen);
    const rightOpen = rightOpenProp ?? _rightOpen;
    const setRightOpen = React.useCallback(
        (value) => {
            const openState =
                typeof value === "function" ? value(rightOpen) : value;
            if (setRightOpenProp) {
                setRightOpenProp(openState);
            } else {
                _setRightOpen(openState);
            }
            // Set cookie for right sidebar
            document.cookie = `${RIGHT_SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${RIGHT_SIDEBAR_COOKIE_MAX_AGE}`;
        },
        [setRightOpenProp, rightOpen]
    );

    // Helper to toggle the left sidebar
    const toggleLeftSidebar = React.useCallback(() => {
        return isMobile
            ? setLeftOpenMobile((open) => !open)
            : setLeftOpen((open) => !open);
    }, [isMobile, setLeftOpen, setLeftOpenMobile]);

    // Helper to toggle the right sidebar
    const toggleRightSidebar = React.useCallback(() => {
        return isMobile
            ? setRightOpenMobile((open) => !open)
            : setRightOpen((open) => !open);
    }, [isMobile, setRightOpen, setRightOpenMobile]);

    // Adds a keyboard shortcut to toggle the left sidebar
    React.useEffect(() => {
        const handleKeyDown = (event) => {
            if (
                event.key === LEFT_SIDEBAR_KEYBOARD_SHORTCUT &&
                (event.metaKey || event.ctrlKey)
            ) {
                event.preventDefault();
                toggleLeftSidebar();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [toggleLeftSidebar]);

    // States for easier styling
    const leftState = leftOpen ? "expanded" : "collapsed";
    const rightState = rightOpen ? "expanded" : "collapsed";

    const contextValue = React.useMemo(
        () => ({
            // Dual sidebar support
            leftSidebar: {
                state: leftState,
                open: leftOpen,
                setOpen: setLeftOpen,
                openMobile: leftOpenMobile,
                setOpenMobile: setLeftOpenMobile,
                toggle: toggleLeftSidebar,
            },
            rightSidebar: {
                state: rightState,
                open: rightOpen,
                setOpen: setRightOpen,
                openMobile: rightOpenMobile,
                setOpenMobile: setRightOpenMobile,
                toggle: toggleRightSidebar,
            },
            // Direct access for convenience
            isMobile,
        }),
        [
            leftState,
            leftOpen,
            setLeftOpen,
            leftOpenMobile,
            setLeftOpenMobile,
            toggleLeftSidebar,
            rightState,
            rightOpen,
            setRightOpen,
            rightOpenMobile,
            setRightOpenMobile,
            toggleRightSidebar,
            isMobile,
        ]
    );

    return (
        <SidebarContext.Provider value={contextValue}>
            <TooltipProvider delayDuration={0}>
                <div
                    data-slot="sidebar-wrapper"
                    data-left-sidebar-state={leftState}
                    data-right-sidebar-state={rightState}
                    style={{
                        "--sidebar-width": LEFT_SIDEBAR_WIDTH,
                        "--sidebar-width-icon": LEFT_SIDEBAR_WIDTH_ICON,
                        "--left-sidebar-width": LEFT_SIDEBAR_WIDTH,
                        "--left-sidebar-width-icon": LEFT_SIDEBAR_WIDTH_ICON,
                        "--right-sidebar-width": RIGHT_SIDEBAR_WIDTH,
                        ...style,
                    }}
                    className={cn(
                        "group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full",
                        className
                    )}
                    {...props}
                >
                    {children}
                </div>
            </TooltipProvider>
        </SidebarContext.Provider>
    );
}

function Sidebar({
    side = "left",
    variant = "sidebar",
    collapsible = "offcanvas",
    className,
    children,
    ...props
}) {
    const { isMobile, leftSidebar, rightSidebar } = useSidebar();

    // Select the appropriate sidebar state based on side prop
    const sidebarState = side === "right" ? rightSidebar : leftSidebar;
    const { state, openMobile, setOpenMobile } = sidebarState;

    // Get appropriate width constants
    const sidebarWidthMobile =
        side === "right"
            ? RIGHT_SIDEBAR_WIDTH_MOBILE
            : LEFT_SIDEBAR_WIDTH_MOBILE;

    if (collapsible === "none") {
        return (
            <div
                data-slot="sidebar"
                className={cn(
                    "bg-sidebar text-sidebar-foreground flex h-full flex-col",
                    side === "right"
                        ? "w-(--right-sidebar-width)"
                        : "w-(--sidebar-width)",
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }

    if (isMobile) {
        // Hide right sidebar on mobile entirely
        if (side === "right") {
            return null;
        }

        return (
            <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
                <SheetContent
                    data-sidebar="sidebar"
                    data-slot="sidebar"
                    data-mobile="true"
                    className="bg-sidebar text-sidebar-foreground w-(--sidebar-width) p-0 [&>button]:hidden"
                    style={{
                        "--sidebar-width": sidebarWidthMobile,
                    }}
                    side={side}
                >
                    <SheetHeader className="sr-only">
                        <SheetTitle>Sidebar</SheetTitle>
                        <SheetDescription>
                            Displays the mobile sidebar.
                        </SheetDescription>
                    </SheetHeader>
                    <div className="flex h-full w-full flex-col">
                        {children}
                    </div>
                </SheetContent>
            </Sheet>
        );
    }

    return (
        <div
            className="group peer text-sidebar-foreground hidden md:block"
            data-state={state}
            data-collapsible={state === "collapsed" ? collapsible : ""}
            data-variant={variant}
            data-side={side}
            data-slot="sidebar"
        >
            {/* This is what handles the sidebar gap on desktop */}
            <div
                data-slot="sidebar-gap"
                className={cn(
                    "relative bg-transparent transition-[width] duration-200 ease-linear",
                    side === "right"
                        ? "w-(--right-sidebar-width) group-data-[collapsible=offcanvas]:w-0"
                        : "w-(--sidebar-width) group-data-[collapsible=offcanvas]:w-0 group-data-[side=right]:rotate-180",
                    variant === "floating" || variant === "inset"
                        ? side === "right"
                            ? "" // No icon mode for right sidebar
                            : "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]"
                        : side === "right"
                        ? "" // No icon mode for right sidebar
                        : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)"
                )}
            />
            <div
                data-slot="sidebar-container"
                className={cn(
                    "fixed inset-y-0 hidden h-svh transition-[left,right,width] duration-200 ease-linear md:flex",
                    side === "left"
                        ? "left-0 z-10 w-(--sidebar-width) group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
                        : "right-0 z-50 w-(--right-sidebar-width) group-data-[collapsible=offcanvas]:right-[calc(var(--right-sidebar-width)*-1)]",
                    // Adjust the padding for floating and inset variants.
                    variant === "floating" || variant === "inset"
                        ? side === "right"
                            ? "p-2" // No icon mode for right sidebar
                            : "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]"
                        : side === "right"
                        ? "group-data-[side=right]:border-l" // No icon mode for right sidebar
                        : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
                    className
                )}
                {...props}
            >
                <div
                    data-sidebar="sidebar"
                    data-slot="sidebar-inner"
                    className="bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm"
                >
                    {children}
                </div>
            </div>
        </div>
    );
}

function LeftSidebarTrigger({ className, onClick, ...props }) {
    const { leftSidebar } = useSidebar();

    return (
        <Button
            data-sidebar="trigger"
            data-slot="sidebar-trigger"
            variant="ghost"
            size="icon"
            className={cn("size-7", className)}
            onClick={(event) => {
                onClick?.(event);
                leftSidebar.toggle();
            }}
            {...props}
        >
            <PanelLeftIcon />
            <span className="sr-only">Toggle Left Sidebar</span>
        </Button>
    );
}

function RightSidebarTrigger({ className, onClick, children, ...props }) {
    const { rightSidebar } = useSidebar();

    return (
        <Button
            data-sidebar="trigger"
            data-slot="right-sidebar-trigger"
            variant="ghost"
            size="icon"
            className={cn("size-7", className)}
            onClick={(event) => {
                onClick?.(event);
                rightSidebar.toggle();
            }}
            {...props}
        >
            {children}
            <span className="sr-only">Toggle Right Sidebar</span>
        </Button>
    );
}

function SidebarRail({ className, ...props }) {
    const { leftSidebar, rightSidebar } = useSidebar();

    // Determine which sidebar this rail belongs to by checking the parent sidebar context
    const railRef = React.useRef(null);
    const [sidebarSide, setSidebarSide] = React.useState("left");

    React.useEffect(() => {
        if (railRef.current) {
            // Find the parent sidebar container
            const sidebarContainer = railRef.current.closest("[data-side]");
            if (sidebarContainer) {
                const side = sidebarContainer.getAttribute("data-side");
                setSidebarSide(side || "left");
            }
        }
    }, []);

    const toggleFunction =
        sidebarSide === "right" ? rightSidebar.toggle : leftSidebar.toggle;

    return (
        <button
            ref={railRef}
            data-sidebar="rail"
            data-slot="sidebar-rail"
            aria-label="Toggle Sidebar"
            tabIndex={-1}
            onClick={toggleFunction}
            title="Toggle Sidebar"
            className={cn(
                "hover:after:bg-sidebar-border absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] sm:flex",
                "in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize",
                "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
                "hover:group-data-[collapsible=offcanvas]:bg-sidebar group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full",
                "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
                "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
                className
            )}
            {...props}
        />
    );
}

function SidebarInset({ className, ...props }) {
    return (
        <main
            data-slot="sidebar-inset"
            className={cn(
                "bg-background relative flex w-full flex-1 flex-col transition-[margin] duration-200 ease-linear",
                // Left sidebar handling (existing)
                "md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2",
                className
            )}
            {...props}
        />
    );
}

function SidebarInput({ className, ...props }) {
    return (
        <Input
            data-slot="sidebar-input"
            data-sidebar="input"
            className={cn("bg-background h-8 w-full shadow-none", className)}
            {...props}
        />
    );
}

function SidebarHeader({ className, ...props }) {
    return (
        <div
            data-slot="sidebar-header"
            data-sidebar="header"
            className={cn("flex flex-col gap-2 p-2", className)}
            {...props}
        />
    );
}

function SidebarFooter({ className, ...props }) {
    return (
        <div
            data-slot="sidebar-footer"
            data-sidebar="footer"
            className={cn("flex flex-col gap-2 p-2", className)}
            {...props}
        />
    );
}

function SidebarSeparator({ className, ...props }) {
    return (
        <Separator
            data-slot="sidebar-separator"
            data-sidebar="separator"
            className={cn("bg-sidebar-border mx-2 w-auto", className)}
            {...props}
        />
    );
}

function SidebarContent({ className, ...props }) {
    return (
        <div
            data-slot="sidebar-content"
            data-sidebar="content"
            className={cn(
                "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
                className
            )}
            {...props}
        />
    );
}

function SidebarGroup({ className, ...props }) {
    return (
        <div
            data-slot="sidebar-group"
            data-sidebar="group"
            className={cn(
                "relative flex w-full min-w-0 flex-col p-2",
                className
            )}
            {...props}
        />
    );
}

function SidebarGroupLabel({ className, asChild = false, ...props }) {
    const Comp = asChild ? Slot : "div";

    return (
        <Comp
            data-slot="sidebar-group-label"
            data-sidebar="group-label"
            className={cn(
                "text-sidebar-foreground/70 ring-sidebar-ring flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-hidden transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
                "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
                className
            )}
            {...props}
        />
    );
}

function SidebarGroupAction({ className, asChild = false, ...props }) {
    const Comp = asChild ? Slot : "button";

    return (
        <Comp
            data-slot="sidebar-group-action"
            data-sidebar="group-action"
            className={cn(
                "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
                // Increases the hit area of the button on mobile.
                "after:absolute after:-inset-2 md:after:hidden",
                "group-data-[collapsible=icon]:hidden",
                className
            )}
            {...props}
        />
    );
}

function SidebarGroupContent({ className, ...props }) {
    return (
        <div
            data-slot="sidebar-group-content"
            data-sidebar="group-content"
            className={cn("w-full text-sm", className)}
            {...props}
        />
    );
}

function SidebarMenu({ className, ...props }) {
    return (
        <ul
            data-slot="sidebar-menu"
            data-sidebar="menu"
            className={cn("flex w-full min-w-0 flex-col gap-1", className)}
            {...props}
        />
    );
}

function SidebarMenuItem({ className, ...props }) {
    return (
        <li
            data-slot="sidebar-menu-item"
            data-sidebar="menu-item"
            className={cn("group/menu-item relative", className)}
            {...props}
        />
    );
}

const sidebarMenuButtonVariants = cva(
    "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
    {
        variants: {
            variant: {
                default:
                    "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                outline:
                    "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
            },
            size: {
                default: "h-8 text-sm",
                sm: "h-7 text-xs",
                lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

function SidebarMenuButton({
    asChild = false,
    isActive = false,
    variant = "default",
    size = "default",
    tooltip,
    className,
    ...props
}) {
    const Comp = asChild ? Slot : "button";
    const { isMobile, leftSidebar } = useSidebar();

    const button = (
        <Comp
            data-slot="sidebar-menu-button"
            data-sidebar="menu-button"
            data-size={size}
            data-active={isActive}
            className={cn(
                sidebarMenuButtonVariants({ variant, size }),
                className
            )}
            {...props}
        />
    );

    if (!tooltip) {
        return button;
    }

    if (typeof tooltip === "string") {
        tooltip = {
            children: tooltip,
        };
    }

    return (
        <Tooltip>
            <TooltipTrigger asChild>{button}</TooltipTrigger>
            <TooltipContent
                side="right"
                align="center"
                hidden={leftSidebar.state !== "collapsed" || isMobile}
                {...tooltip}
            />
        </Tooltip>
    );
}

function SidebarMenuAction({
    className,
    asChild = false,
    showOnHover = false,
    ...props
}) {
    const Comp = asChild ? Slot : "button";

    return (
        <Comp
            data-slot="sidebar-menu-action"
            data-sidebar="menu-action"
            className={cn(
                "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground peer-hover/menu-button:text-sidebar-accent-foreground absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
                // Increases the hit area of the button on mobile.
                "after:absolute after:-inset-2 md:after:hidden",
                "peer-data-[size=sm]/menu-button:top-1",
                "peer-data-[size=default]/menu-button:top-1.5",
                "peer-data-[size=lg]/menu-button:top-2.5",
                "group-data-[collapsible=icon]:hidden",
                showOnHover &&
                    "peer-data-[active=true]/menu-button:text-sidebar-accent-foreground group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 md:opacity-0",
                className
            )}
            {...props}
        />
    );
}

function SidebarMenuBadge({ className, ...props }) {
    return (
        <div
            data-slot="sidebar-menu-badge"
            data-sidebar="menu-badge"
            className={cn(
                "text-sidebar-foreground pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums select-none",
                "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
                "peer-data-[size=sm]/menu-button:top-1",
                "peer-data-[size=default]/menu-button:top-1.5",
                "peer-data-[size=lg]/menu-button:top-2.5",
                "group-data-[collapsible=icon]:hidden",
                className
            )}
            {...props}
        />
    );
}

function SidebarMenuSkeleton({ className, showIcon = false, ...props }) {
    // Random width between 50 to 90%.
    const width = React.useMemo(() => {
        return `${Math.floor(Math.random() * 40) + 50}%`;
    }, []);

    return (
        <div
            data-slot="sidebar-menu-skeleton"
            data-sidebar="menu-skeleton"
            className={cn(
                "flex h-8 items-center gap-2 rounded-md px-2",
                className
            )}
            {...props}
        >
            {showIcon && (
                <Skeleton
                    className="size-4 rounded-md"
                    data-sidebar="menu-skeleton-icon"
                />
            )}
            <Skeleton
                className="h-4 max-w-(--skeleton-width) flex-1"
                data-sidebar="menu-skeleton-text"
                style={{
                    "--skeleton-width": width,
                }}
            />
        </div>
    );
}

function SidebarMenuSub({ className, ...props }) {
    return (
        <ul
            data-slot="sidebar-menu-sub"
            data-sidebar="menu-sub"
            className={cn(
                "border-sidebar-border mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l px-2.5 py-0.5",
                "group-data-[collapsible=icon]:hidden",
                className
            )}
            {...props}
        />
    );
}

function SidebarMenuSubItem({ className, ...props }) {
    return (
        <li
            data-slot="sidebar-menu-sub-item"
            data-sidebar="menu-sub-item"
            className={cn("group/menu-sub-item relative", className)}
            {...props}
        />
    );
}

function SidebarMenuSubButton({
    asChild = false,
    size = "md",
    isActive = false,
    className,
    ...props
}) {
    const Comp = asChild ? Slot : "a";

    return (
        <Comp
            data-slot="sidebar-menu-sub-button"
            data-sidebar="menu-sub-button"
            data-size={size}
            data-active={isActive}
            className={cn(
                "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground [&>svg]:text-sidebar-accent-foreground flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 outline-hidden focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
                "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
                size === "sm" && "text-xs",
                size === "md" && "text-sm",
                "group-data-[collapsible=icon]:hidden",
                className
            )}
            {...props}
        />
    );
}

export {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupAction,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInput,
    SidebarInset,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSkeleton,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarProvider,
    SidebarRail,
    SidebarSeparator,
    LeftSidebarTrigger,
    RightSidebarTrigger,
    useSidebar,
};
