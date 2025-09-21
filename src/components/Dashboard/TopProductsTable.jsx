import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

const products = [
    {
        name: "ASOS Ridley High Waist",
        price: "$79.49",
        quantity: "82",
        amount: "$6,518.18",
    },
    {
        name: "Marco Lightweight Shirt",
        price: "$128.50",
        quantity: "37",
        amount: "$4,754.50",
    },
    {
        name: "Half Sleeve Shirt",
        price: "$39.99",
        quantity: "64",
        amount: "$2,559.36",
    },
    {
        name: "Lightweight Jacket",
        price: "$20.00",
        quantity: "184",
        amount: "$3,680.00",
    },
    {
        name: "Marco Shoes",
        price: "$79.49",
        quantity: "64",
        amount: "$1,965.81",
    },
];

const TopProductsTable = ({ className }) => {
    return (
        <Card
            className={cn(
                "h-full flex flex-col transition-all duration-300 hover:shadow-lg group",
                className
            )}
        >
            <CardHeader className="flex-shrink-0">
                <CardTitle className="pl-3 text-sm font-semibold group-hover:text-primary transition-colors duration-200">
                    Top Selling Products
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden">
                <div className="h-full overflow-y-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-b border-muted-foreground/20">
                                <TableHead className="text-sm text-muted-foreground font-normal h-10 px-3">
                                    Name
                                </TableHead>
                                <TableHead className="text-sm text-muted-foreground font-normal h-10 px-3">
                                    Price
                                </TableHead>
                                <TableHead className="text-sm text-muted-foreground font-normal h-10 px-3">
                                    Quantity
                                </TableHead>
                                <TableHead className="text-sm text-muted-foreground font-normal h-10 px-3">
                                    Amount
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.map((product, index) => (
                                <TableRow
                                    key={index}
                                    className="hover:bg-muted/30 transition-colors duration-200 border-none"
                                >
                                    <TableCell className="text-sm text-foreground py-3 px-3">
                                        {product.name}
                                    </TableCell>
                                    <TableCell className="text-sm text-foreground py-3 px-3">
                                        {product.price}
                                    </TableCell>
                                    <TableCell className="text-sm text-foreground py-3 px-3">
                                        {product.quantity}
                                    </TableCell>
                                    <TableCell className="text-sm text-foreground py-3 px-3">
                                        {product.amount}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
};

export default TopProductsTable;
