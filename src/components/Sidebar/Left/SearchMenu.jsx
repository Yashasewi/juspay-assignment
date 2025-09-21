"use client";

import * as React from "react";
import {
    Search,
    CornerDownLeft,
    BarChart3,
    ShoppingCart,
    FolderOpen,
    GraduationCap,
    Users,
    Settings2,
    Building2,
    FileText,
    MessageSquare,
    Package,
    ClipboardList,
    RotateCcw,
    CheckCircle,
    BookOpen,
    Target,
    Wrench,
    Lock,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

const navigationData = [
    // Dashboards
    { title: "Default Dashboard", category: "Dashboards", icon: BarChart3 },
    {
        title: "eCommerce Dashboard",
        category: "Dashboards",
        icon: ShoppingCart,
    },
    { title: "Projects Dashboard", category: "Dashboards", icon: FolderOpen },
    {
        title: "Online Courses Dashboard",
        category: "Dashboards",
        icon: GraduationCap,
    },

    // Pages
    { title: "User Profile", category: "Pages", icon: Users },
    { title: "Account Settings", category: "Pages", icon: Settings2 },
    { title: "Corporate", category: "Pages", icon: Building2 },
    { title: "Blog", category: "Pages", icon: FileText },
    { title: "Social", category: "Pages", icon: MessageSquare },

    // Sub-items
    { title: "Products", category: "eCommerce", icon: Package },
    { title: "Orders", category: "eCommerce", icon: ClipboardList },
    { title: "Active Projects", category: "Projects", icon: RotateCcw },
    { title: "Completed Projects", category: "Projects", icon: CheckCircle },
    { title: "Course Library", category: "Courses", icon: BookOpen },
    { title: "My Courses", category: "Courses", icon: Target },
    { title: "Profile Settings", category: "Account", icon: Wrench },
    { title: "Security", category: "Account", icon: Lock },
];

export function CommandMenu() {
    const [open, setOpen] = React.useState(false);

    // Handle keyboard shortcut
    React.useEffect(() => {
        const down = (e) => {
            if (e.key === "/" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    const runCommand = React.useCallback((command) => {
        setOpen(false);
        command();
    }, []);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    className={cn(
                        "relative h-8 max-w-[50%] w-full justify-start rounded-md bg-muted/50 px-3 text-sm font-normal text-muted-foreground shadow-none sm:pr-12 outline-none hover:text-muted-foreground"
                    )}
                >
                    <Search className="mr-2 h-4 w-4" />
                    <span className="hidden lg:inline-flex">Search</span>
                    <span className="inline-flex lg:hidden">Search</span>
                    <div className="absolute right-1.5 top-1.5 hidden gap-1 sm:flex">
                        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium text-muted-foreground opacity-100">
                            <span className="text-xs">⌘</span>/
                        </kbd>
                    </div>
                </Button>
            </DialogTrigger>
            <DialogContent className="overflow-hidden p-0">
                <DialogHeader className="sr-only">
                    <DialogTitle>Search</DialogTitle>
                    <DialogDescription>
                        Search for pages and navigation items
                    </DialogDescription>
                </DialogHeader>
                <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
                    <CommandInput placeholder="Search pages, dashboards, and more..." />
                    <CommandList className="scrollbar">
                        <CommandEmpty>No results found.</CommandEmpty>

                        <CommandGroup heading="Recent">
                            <CommandItem
                                onSelect={() =>
                                    runCommand(() => console.log("Overview"))
                                }
                            >
                                <BarChart3 className="mr-2 h-4 w-4" />
                                <span>Overview</span>
                            </CommandItem>
                            <CommandItem
                                onSelect={() =>
                                    runCommand(() => console.log("Projects"))
                                }
                            >
                                <FolderOpen className="mr-2 h-4 w-4" />
                                <span>Projects</span>
                            </CommandItem>
                        </CommandGroup>

                        <CommandGroup heading="Dashboards">
                            {navigationData
                                .filter(
                                    (item) => item.category === "Dashboards"
                                )
                                .map((item) => {
                                    const IconComponent = item.icon;
                                    return (
                                        <CommandItem
                                            key={item.title}
                                            onSelect={() =>
                                                runCommand(() =>
                                                    console.log(item.title)
                                                )
                                            }
                                        >
                                            <IconComponent className="mr-2 h-4 w-4 text-primary" />
                                            <span>{item.title}</span>
                                        </CommandItem>
                                    );
                                })}
                        </CommandGroup>

                        <CommandGroup heading="Pages">
                            {navigationData
                                .filter((item) => item.category === "Pages")
                                .map((item) => {
                                    const IconComponent = item.icon;
                                    return (
                                        <CommandItem
                                            key={item.title}
                                            onSelect={() =>
                                                runCommand(() =>
                                                    console.log(item.title)
                                                )
                                            }
                                        >
                                            <IconComponent className="mr-2 h-4 w-4 text-primary " />
                                            <span>{item.title}</span>
                                        </CommandItem>
                                    );
                                })}
                        </CommandGroup>

                        <CommandGroup heading="Other">
                            {navigationData
                                .filter(
                                    (item) =>
                                        !["Dashboards", "Pages"].includes(
                                            item.category
                                        )
                                )
                                .map((item) => {
                                    const IconComponent = item.icon;
                                    return (
                                        <CommandItem
                                            key={item.title}
                                            onSelect={() =>
                                                runCommand(() =>
                                                    console.log(item.title)
                                                )
                                            }
                                        >
                                            <IconComponent className="mr-2 h-4 w-4 text-primary" />
                                            <span>{item.title}</span>
                                            <span className="ml-auto text-xs text-muted-foreground">
                                                {item.category}
                                            </span>
                                        </CommandItem>
                                    );
                                })}
                        </CommandGroup>
                    </CommandList>
                    <div className="hidden md:flex items-center border-t px-3 py-2 text-xs text-muted-foreground">
                        <CornerDownLeft className="mr-1 h-3 w-3" />
                        to select
                        <kbd className="ml-auto mr-1 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium text-muted-foreground opacity-100">
                            <span className="text-xs">⌘</span>K
                        </kbd>
                        to toggle
                    </div>
                </Command>
            </DialogContent>
        </Dialog>
    );
}
