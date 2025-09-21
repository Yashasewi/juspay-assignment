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
    { channel: "direct", amount: 300.56, fill: "var(--chart-1)" },
    { channel: "email", amount: 48.96, fill: "var(--chart-5)" },
    { channel: "sponsored", amount: 154.02, fill: "var(--chart-3)" },
    { channel: "affiliate", amount: 135.18, fill: "var(--chart-4)" },
];

const chartConfig = {
    amount: {
        label: "Amount",
    },
    direct: {
        label: "Direct",
        color: "var(--chart-1)",
    },
    affiliate: {
        label: "Affiliate",
        color: "var(--chart-4)",
    },
    sponsored: {
        label: "Sponsored",
        color: "var(--chart-3)",
    },
    email: {
        label: "E-mail",
        color: "var(--chart-5)",
    },
};

export default function TotalSalesChart({ className }) {
    return (
        <Card
            className={cn(`flex flex-col w-full p-6`, className)}
        >
            <CardHeader className="items-center px-0">
                <CardTitle className="text-sm font-semibold">
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
                                    <span className="text-xs capitalize">
                                        {item.channel === "email"
                                            ? "E-mail"
                                            : item.channel === "affiliate"
                                            ? "Affiliate"
                                            : item.channel === "sponsored"
                                            ? "Sponsored"
                                            : "Direct"}
                                    </span>
                                </div>
                                <span className="text-xs  font-medium">
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
