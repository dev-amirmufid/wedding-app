import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import InvitationForm from "./Partials/InvitationForm";

const InvitationsAdd = ({ auth, meta, events }) => {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    {meta.title}
                </h2>
            }
        >
            <Head title={meta.head} />

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <InvitationForm
                    title={`Form Add New Invitation`}
                    events={events}
                />
            </div>
        </AuthenticatedLayout>
    );
};

export default InvitationsAdd;
