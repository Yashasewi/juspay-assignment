"use client";

import { Pie, PieChart } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";

export const description = "A donut chart showing total sales by channel";

const chartData = [
    { channel: "direct", amount: 300.56, fill: "#1C1C1C" },
    { channel: "affiliate", amount: 135.18, fill: "#BAEDBD" },
    { channel: "sponsored", amount: 154.02, fill: "#95A4FC" },
    { channel: "email", amount: 48.96, fill: "#B1E3FF" },
];

const chartConfig = {
    amount: {
        label: "Amount",
    },
    direct: {
        label: "Direct",
        color: "#1C1C1C",
    },
    affiliate: {
        label: "Affiliate",
        color: "#BAEDBD",
    },
    sponsored: {
        label: "Sponsored",
        color: "#95A4FC",
    },
    email: {
        label: "E-mail",
        color: "#B1E3FF",
    },
};

export default function TotalSalesChart({ className }) {
    return (
        <Card
            className={cn(`flex flex-col w-full p-6 bg-[#F7F9FB]`, className)}
        >
            <CardHeader className="items-center px-0">
                <CardTitle className="text-sm font-semibold text-[#1C1C1C]">
                    Total Sales
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 px-0">
                <div className="flex flex-col items-center gap-4">
                    <ChartContainer
                        config={chartConfig}
                        className="mx-auto aspect-square max-h-[160px] w-full"
                    >
                        <PieChart>
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel />}
                            />
                            <Pie
                                data={chartData}
                                dataKey="amount"
                                nameKey="channel"
                                cx="50%"
                                innerRadius={50}
                                outerRadius={70}
                                strokeWidth={5}
                                paddingAngle={5}
                                cornerRadius={50}
                            />
                        </PieChart>
                    </ChartContainer>

                    {/* Legend */}
                    <div className="flex flex-col gap-3 w-full">
                        {chartData.map((item) => (
                            <div
                                key={item.channel}
                                className="flex items-center justify-between"
                            >
                                <div className="flex items-center gap-2">
                                    <div
                                        className="w-4 h-4 rounded-full"
                                        style={{ backgroundColor: item.fill }}
                                    />
                                    <span className="text-xs text-[#1C1C1C] capitalize">
                                        {item.channel === "email"
                                            ? "E-mail"
                                            : item.channel === "affiliate"
                                            ? "Affiliate"
                                            : item.channel === "sponsored"
                                            ? "Sponsored"
                                            : "Direct"}
                                    </span>
                                </div>
                                <span className="text-xs text-[#1C1C1C] font-medium">
                                    ${item.amount.toFixed(2)}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
