import {Metadata} from "next";
import {fetchFilteredCustomers} from '@/app/lib/data';
import {notFound} from "next/navigation";
import {Suspense} from "react";
import CustomersTable from "@/app/ui/customers/table";
import {TableRowSkeleton} from "@/app/ui/skeletons";

export const metadata: Metadata = {
    title: 'Customer',
};

export default async function Page(props: {
    searchParams?: Promise<{
        query?: string;
        page?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    // const currentPage = Number(searchParams?.page) || 1;
    console.log(query)
    const [customers] = await Promise.all([
        fetchFilteredCustomers(query)
    ]);

    if (!customers) {
        notFound();
    }

    return (
        <div className="w-full">
            <Suspense fallback={<TableRowSkeleton/>}>
                <CustomersTable customers={customers} />
            </Suspense>
        </div>
    );
}