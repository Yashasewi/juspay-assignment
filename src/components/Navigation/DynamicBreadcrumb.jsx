import { useLocation, Link } from "react-router-dom";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Map routes to breadcrumb labels
const routeLabels = {
    "/": "Dashboard",
    "/dashboard": "Dashboard",
    "/settings": "Settings",
};

export function DynamicBreadcrumb() {
    const location = useLocation();
    const pathname = location.pathname;

    // For the root path or dashboard, show "Dashboards > Default"
    if (pathname === "/" || pathname === "/dashboard") {
        return (
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink as={Link} to="/">
                            Dashboards
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Default</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        );
    }

    // For other routes, show "Dashboards > [Route Name]"
    const currentLabel = routeLabels[pathname] || "Page";

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink as={Link} to="/">
                        Dashboards
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                    <BreadcrumbPage>{currentLabel}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
}
