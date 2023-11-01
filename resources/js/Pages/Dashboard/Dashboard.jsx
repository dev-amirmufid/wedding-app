import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DashboardBox from "@/Components/DashboardBox";
import DashboardBoxReminingDays from "./Partials/DashboardBoxReminingDays";
import DashboardBoxQuota from "@/Components/DashboardBoxQuota";
import ScrollScreen from "@/Components/ScrollScreen";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { useGetEventDashboardQuery } from "@/Redux/Services/Events";
import { AddEventButton } from "../Events/Partials/EventItem";
ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard({ auth, events, invitationCount }) {
    const [selectedEvents, setSelectedEvents] = useState(events[0]);
    const eventQuery = useGetEventDashboardQuery({
        id: selectedEvents?.id,
    });

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="flex flex-wrap gap-4">
                {selectedEvents ? (
                    <>
                        <div className="lg:w-[20rem] xl:w-[30rem] w-full">
                            <section>
                                <DashboardBoxReminingDays
                                    events={events}
                                    selectedEvents={selectedEvents}
                                    setSelectedEvents={setSelectedEvents}
                                />
                            </section>
                        </div>
                        <div className="flex-1">
                            <ScrollScreen>
                                {eventQuery.isSuccess &&
                                    !eventQuery.isFetching && (
                                        <section className="grid lg:grid-cols-2 2xl:grid-cols-3 gap-4">
                                            <DashboardBoxQuota
                                                title={
                                                    <>
                                                        <FontAwesomeIcon icon="fa-solid fa-user" />
                                                        Total Invitations
                                                    </>
                                                }
                                                text="Total Invitations"
                                                value={
                                                    eventQuery.data.data
                                                        .totalInvitations
                                                }
                                                quota={selectedEvents.quota}
                                            />
                                            <DashboardBoxQuota
                                                title={
                                                    <>
                                                        <FontAwesomeIcon icon="fa-brands fa-square-whatsapp" />
                                                        WA Blast Invitations
                                                    </>
                                                }
                                                text="Invitations Delivered"
                                                value={
                                                    eventQuery.data.data
                                                        .waBlastInvitations
                                                }
                                                quota={invitationCount}
                                            />

                                            <DashboardBoxQuota
                                                title={
                                                    <>
                                                        <FontAwesomeIcon icon="fa-regular fa-calendar-check" />
                                                        RSVP Invitations
                                                    </>
                                                }
                                                text="Invitations RSVP"
                                                value={
                                                    eventQuery.data.data
                                                        .rsvpInvitations
                                                }
                                                quota={selectedEvents.quota}
                                            />

                                            <DashboardBoxQuota
                                                title={
                                                    <>
                                                        <FontAwesomeIcon icon="fa-solid fa-qrcode" />
                                                        Invitations Arrived
                                                    </>
                                                }
                                                text="Invitations Arrived"
                                                value={
                                                    eventQuery.data.data
                                                        .arrivedInvitations
                                                }
                                                quota={selectedEvents.quota}
                                            />

                                            <DashboardBoxQuota
                                                title={
                                                    <>
                                                        <FontAwesomeIcon icon="fa-solid fa-user-check" />
                                                        Guest Arrived
                                                    </>
                                                }
                                                text="Guest Arrived"
                                                value={
                                                    eventQuery.data.data
                                                        .guestInvitations
                                                }
                                                quota={
                                                    selectedEvents.quota_guest
                                                }
                                            />

                                            <DashboardBoxQuota
                                                title={
                                                    <>
                                                        <FontAwesomeIcon icon="fa-solid fa-gift" />
                                                        Suvenir & Checkout
                                                    </>
                                                }
                                                text="Suvenir & Checkout"
                                                value={
                                                    eventQuery.data.data
                                                        .souvenirInvitations
                                                }
                                                quota={selectedEvents.quota}
                                            />

                                            <DashboardBox
                                                className="lg:col-span-2 2xl:col-span-3"
                                                title={
                                                    <>
                                                        <FontAwesomeIcon icon="fa-solid fa-chart-pie" />
                                                        Guest Invitation by
                                                        Labels
                                                    </>
                                                }
                                                body={
                                                    <Pie
                                                        data={{
                                                            labels: eventQuery.data.data.invitationByLabels.map(
                                                                (item) =>
                                                                    item.labels
                                                            ),
                                                            datasets: [
                                                                {
                                                                    label: "Invitations ",
                                                                    data: eventQuery.data.data.invitationByLabels.map(
                                                                        (
                                                                            item
                                                                        ) =>
                                                                            item.count
                                                                    ),
                                                                    backgroundColor:
                                                                        [
                                                                            "#4caf50",
                                                                            "#ff9800",
                                                                            "#f44336",
                                                                        ],
                                                                    borderColor:
                                                                        [
                                                                            "#4caf50",
                                                                            "#ff9800",
                                                                            "#f44336",
                                                                        ],
                                                                    borderWidth: 1,
                                                                },
                                                            ],
                                                        }}
                                                        className="w-full"
                                                    />
                                                }
                                            />
                                        </section>
                                    )}
                            </ScrollScreen>
                        </div>
                    </>
                ) : (
                    <AddEventButton
                        onAddButtonClick={() =>
                            router.get(route("events.create"))
                        }
                    />
                )}
            </div>
        </AuthenticatedLayout>
    );
}
