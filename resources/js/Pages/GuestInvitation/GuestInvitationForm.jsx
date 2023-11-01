import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import GuestForm from './Partials/GuestForm';

export default function GuestInvitationForm({ auth, guest }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tamu Undangan</h2>}
        >
            <Head title="Tamu Undangan" />

            <GuestForm 
                selectedData={guest}  
                className="max-w-xl" 
                title={`${guest ? 'Edit' : 'Tambah'} Form Tamu`}
                subtitle={`${guest ? 'Edit' : 'Tambah'} Tamu Undangan`}
            />
        </AuthenticatedLayout>
    );
}
