"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";

const chartData = [
    {
        month: "January",
        projected: 5000000,
        actual: 17000000,
    },
    {
        month: "February",
        projected: 5000000,
        actual: 23000000,
    },
    {
        month: "March",
        projected: 5000000,
        actual: 19000000,
    },
    {
        month: "April",
        projected: 3000000,
        actual: 26000000,
    },
    {
        month: "May",
        projected: 5000000,
        actual: 15000000,
    },
    {
        month: "June",
        projected: 5000000,
        actual: 22000000,
    },
];

const chartConfig = {
    actual: {
        label: "Actual",
        color: "var(--chart-blue)",
    },
    projected: {
        label: "Projected",
        color: "var(--chart-blue-secondary)",
    },
};

const ProjectionsChart = ({ className }) => {
    return (
        <Card
            className={cn(
                "flex flex-col transition-all duration-300 hover:shadow-lg group h-full",
                className
            )}
        >
            <CardHeader>
                <CardTitle className="text-sm font-semibold group-hover:text-primary transition-colors duration-200">
                    Projections vs Actuals
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
                <ChartContainer
                    config={chartConfig}
                    className="max-h-56 min-w-full"
                >
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        margin={{ top: 20 }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => `${value / 1000000}M`}
                            domain={[0, 30000000]}
                            ticks={[0, 10000000, 20000000, 30000000]}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dot" />}
                        />
                        <Bar
                            dataKey="actual"
                            stackId="stack"
                            fill="var(--color-actual)"
                            radius={[0, 0, 4, 4]}
                            fillOpacity={0.8}
                        />
                        <Bar
                            dataKey="projected"
                            stackId="stack"
                            fill="var(--color-projected)"
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
};

export default ProjectionsChart;
