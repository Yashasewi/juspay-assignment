import MetricsCard from "../components/Dashboard/MetricsCard";
import ProjectionsChart from "../components/Dashboard/ProjectionsChart";
import RevenueChart from "../components/Dashboard/RevenueChart";
import RevenueByLocation from "../components/Dashboard/RevenueByLocation";
import TopProductsTable from "../components/Dashboard/TopProductsTable";
import TotalSalesChart from "../components/Dashboard/TotalSalesChart";

export default function Dashboard() {
    const metricsData = [
        {
            title: "Customers",
            value: "3,781",
            trend: "up",
            trendValue: "+11.01%",
            cardType: "customers",
        },
        {
            title: "Orders",
            value: "1,219",
            trend: "down",
            trendValue: "-0.03%",
            cardType: "orders",
        },
        {
            title: "Revenue",
            value: "$695",
            trend: "up",
            trendValue: "+15.03%",
            cardType: "revenue",
        },
        {
            title: "Growth",
            value: "30.1%",
            trend: "up",
            trendValue: "+6.08%",
            cardType: "growth",
        },
    ];

    return (
        <div className="space-y-7 flex flex-col gap-2 md:pt-4 md:px-8 w-full ">
            <div>
                <h1 className="text-base font-semibold pt-4 md:pt-0">
                    eCommerce
                </h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-8 w-full">
                <div className="flex flex-col md:flex-row gap-6 w-full">
                    <div className="grid grid-cols-2 justify-between gap-6 md:gap-y-8 md:gap-x-8 w-full md:w-[50%]">
                        {metricsData.map((metric, index) => (
                            <MetricsCard key={index} {...metric} />
                        ))}
                    </div>
                    <ProjectionsChart className="w-full md:w-[50%]" />
                </div>

                <div className="flex flex-col md:flex-row gap-6 w-full">
                    <RevenueChart className="w-full md:w-[75%]" />
                    <RevenueByLocation className="w-full md:w-[25%]" />
                </div>

                <div className="flex flex-col md:flex-row gap-6 w-full">
                    <TopProductsTable className="w-full md:w-[75%]" />
                    <TotalSalesChart className="w-full md:w-[25%]" />
                </div>
            </div>
        </div>
    );
}
