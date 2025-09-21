"use client";

import { DotIcon, TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

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
import { Separator } from "../ui/separator";

export const description = "A multiple line chart";

const chartData = [
    {
        month: "January",
        currentWeek: 8000000,
        previousWeek: 14000000,
        previousWeekSolid: 14000000,
        previousWeekDashed: null,
    },
    {
        month: "February",
        currentWeek: 19000000,
        previousWeek: 7000000,
        previousWeekSolid: 7000000,
        previousWeekDashed: null,
    },
    {
        month: "March",
        currentWeek: 16000000,
        previousWeek: 12000000,
        previousWeekSolid: 12000000,
        previousWeekDashed: null,
    },
    {
        month: "April",
        currentWeek: 8000000,
        previousWeek: 18000000,
        previousWeekSolid: 16000000,
        previousWeekDashed: 16000000,
    },
    {
        month: "May",
        currentWeek: 12000000,
        previousWeek: 20000000,
        previousWeekSolid: null,
        previousWeekDashed: 19000000,
    },
    {
        month: "June",
        currentWeek: 22000000,
        previousWeek: 20000000,
        previousWeekSolid: null,
        previousWeekDashed: 20000000,
    },
];

const chartConfig = {
    currentWeek: {
        label: "Current Week",
        color: "var(--chart-1)",
    },
    previousWeek: {
        label: "Previous Week",
        color: "var(--chart-2)",
    },
    previousWeekSolid: {
        label: "Previous Week",
        color: "var(--chart-2)",
    },
    previousWeekDashed: {
        label: "Previous Week",
        color: "var(--chart-2)",
    },
};

export default function RevenueChart({ className }) {
    return (
        <Card
            className={cn(
                "flex flex-col transition-all duration-300 hover:shadow-lg group",
                className
            )}
        >
            <CardHeader className="flex gap-4">
                <CardTitle className="pl-4 text-sm font-semibold group-hover:text-primary transition-colors duration-200">
                    Revenue
                </CardTitle>
                <Separator orientation="vertical" className="h-2" />
                <CardDescription className="flex items-center gap-12 w-fit">
                    <div className="flex items-center gap-2">
                        <span className="size-2 rounded-full bg-[var(--chart-1)]" />
                        <span>Current Week $58,211</span>
                    </div>
                    <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-[var(--chart-2)]" />
                        <span>Previous Week $68,768</span>
                    </div>
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 ">
                <ChartContainer
                    config={chartConfig}
                    className="max-h-64 min-w-full "
                >
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{ top: 20 }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={11}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={14}
                            domain={[0, 30000000]}
                            ticks={[0, 10000000, 20000000, 30000000]}
                            tickFormatter={(value) => `${value / 1000000}M`}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dot" />}
                        />
                        {/* Current week line - solid throughout */}
                        <Line
                            dataKey="currentWeek"
                            type="monotone"
                            stroke="var(--color-currentWeek)"
                            strokeWidth={2}
                            dot={false}
                        />
                        {/* Solid line for previous week from January to April */}
                        <Line
                            dataKey="previousWeekSolid"
                            type="monotone"
                            stroke="var(--color-previousWeekSolid)"
                            strokeWidth={2}
                            dot={false}
                            connectNulls={false}
                        />
                        {/* Dashed line for previous week from April to June */}
                        <Line
                            dataKey="previousWeekDashed"
                            type="monotone"
                            stroke="var(--color-previousWeekDashed)"
                            strokeWidth={2}
                            strokeDasharray="4 4"
                            dot={false}
                            connectNulls={false}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
