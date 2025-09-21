import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const MetricsCard = ({
    title,
    value,
    trend,
    trendValue,
    bgColor = "",
    className,
}) => {
    const isPositive = trend === "up";
    const TrendIcon = isPositive ? TrendingUp : TrendingDown;

    return (
        <Card
            className={cn(
                `${bgColor} max-h-[150px] flex py-6 flex-col transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer group gap-6 rounded-2xl`,
                className
            )}
        >
            <CardHeader className="pb-0 pt-0 gap-0">
                <CardTitle className="text-sm font-semibold text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
                <div className="flex items-center justify-between w-full">
                    <p className="text-2xl font-semibold text-foreground">
                        {value}
                    </p>
                    <div
                        className={
                            "flex items-center gap-1 transition-transform duration-200 group-hover:scale-110"
                        }
                    >
                        <span className="text-xs font-medium">
                            {trendValue}
                        </span>
                        <TrendIcon className="h-4 w-4" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default MetricsCard;
