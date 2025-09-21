import { columns } from "@/components/orders/columns";
import { DataTable } from "@/components/orders/data-table";
import { ordersData } from "@/data/ordersData";

export default function OrderList() {
    return (
        <div className="md:p-6 md:space-y-6 w-full h-full">
            <div>
                <h1 className="text-2xl font-semibold text-foreground">
                    Order List
                </h1>
            </div>

            <DataTable columns={columns} data={ordersData} />
        </div>
    );
}
