import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-4">
            <h1 className="text-6xl font-bold text-muted-foreground">404</h1>
            <h2 className="text-2xl font-semibold">Page Not Found</h2>
            <p className="text-muted-foreground max-w-md">
                The page you're looking for doesn't exist. Please check the URL
                or navigate back to the dashboard.
            </p>
            <Link
                to="/"
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
                Go to Dashboard
            </Link>
        </div>
    );
}
