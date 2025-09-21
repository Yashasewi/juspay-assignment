import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/Theme/ThemeProvider";
import Layout from "@/components/Layout/Layout";
import Dashboard from "@/pages/Dashboard";
import OrderList from "@/pages/OrderList";
import NotFound from "@/pages/NotFound";

export default function App() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Router>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Dashboard />} />
                        <Route path="orders" element={<OrderList />} />
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </Router>
        </ThemeProvider>
    );
}
