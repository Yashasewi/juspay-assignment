import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import mapImage from "@/assets/map.png";
import { cn } from "@/lib/utils";

const locations = [
    { name: "New York", value: "72K", percentage: 72, x: "16%", y: "32%" },
    { name: "San Francisco", value: "39K", percentage: 39, x: "8%", y: "38%" },
    { name: "Sydney", value: "25K", percentage: 25, x: "72%", y: "78%" },
    { name: "Singapore", value: "61K", percentage: 61, x: "66%", y: "62%" },
];

const RevenueByLocation = ({ className }) => {
    return (
        <Card className={cn("h-full flex flex-col", className)}>
            <CardHeader className="">
                <CardTitle className="text-sm font-semibold">
                    Revenue by Location
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-2">
                {/* World map with city markers */}
                <div className="relative h-28 flex-shrink-0">
                    <img
                        src={mapImage}
                        alt="World Map"
                        className="w-full h-full object-contain"
                    />
                </div>

                {/* Location list */}
                <div className="space-y-3">
                    {locations.map((location, index) => (
                        <div key={index} className="space-y-1">
                            <div className="flex items-center justify-between">
                                <span className="text-xs  font-normal">
                                    {location.name}
                                </span>
                                <span className="text-xs  font-normal">
                                    {location.value}
                                </span>
                            </div>
                            <div className="w-full h-1 bg-border rounded-full overflow-hidden">
                                <div
                                    className="h-full rounded-full transition-all duration-500"
                                    style={{
                                        width: `${location.percentage}%`,
                                        backgroundColor: "var(--chart-blue)",
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default RevenueByLocation;
