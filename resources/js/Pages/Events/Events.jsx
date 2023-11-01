import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import EventLists from "./Partials/EventLists";
import { useGetEventListQuery } from "@/Redux/Services/Events";
import { useEffect, useState } from "react";

const Events = ({ auth, meta }) => {
    const [current_page, setcurrent_page] = useState(1);
    const [per_page, setper_page] = useState(4);

    const eventsQuery = useGetEventListQuery(
        {
            page: current_page,
            per_page: per_page,
        },
        {
            skip: !(current_page > 0),
        }
    );

    const fetchData = () => {
        setcurrent_page(current_page + 1);
    };

    const onAddButtonClick = () => {
        router.get(route("events.create"));
    };

    const onEditButtonClick = (id) => {
        router.get(route("events.edit", { id }));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    {meta.title}
                </h2>
            }
            loader={eventsQuery.isLoading}
        >
            <Head title={meta.head} />
            <EventLists
                data={eventsQuery.currentData?.data?.data}
                isFetching={eventsQuery.isFetching}
                fetchData={fetchData}
                hasMoreData={
                    eventsQuery.currentData?.data?.next_page_url ? true : false
                }
                onAddButtonClick={onAddButtonClick}
                onEditButtonClick={onEditButtonClick}
            />
        </AuthenticatedLayout>
    );
};

export default Events;
