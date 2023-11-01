import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Head, router, usePage } from "@inertiajs/react";
import {
    Chip,
    IconButton,
    Tooltip,
    Button,
    Input,
    Typography,
} from "@material-tailwind/react";
import moment from "moment/moment";

import Modal from "@/Components/Modal";
import { useForm } from "@inertiajs/react";
import { useState, useRef } from "react";

export default function Guest({ auth, params, guestList }) {
    const FILTER_STATUS = {
        fieldName: "status",
        default: "0",
        options: [
            {
                label: "Belum Hadir",
                value: "0",
            },
            {
                label: "Sudah Hadir",
                value: "1",
            },
        ],
    };

    const dataColumns = [
        {
            name: "No",
            width: "5vw",
            center: true,
            cell: (row, index) =>
                (guestList.current_page - 1) * guestList.per_page + (index + 1),
        },
        {
            name: "Name",
            selector: (row) => row.name,
        },
        {
            name: "Phone",
            selector: (row) => row.phone,
        },
        {
            name: "Status Konfirmasi",
            cell: (row) => (
                <div className="w-max">
                    <Chip
                        size="sm"
                        variant="ghost"
                        value={
                            row.status_confirm === 1
                                ? "Bisa Hadir"
                                : row.status_confirm === 2
                                ? "Tidak Bisa Hadir"
                                : "Belum Merespon"
                        }
                        color={
                            row.status_confirm === 1
                                ? "green"
                                : row.status_confirm === 2
                                ? "red"
                                : "blue-gray"
                        }
                    />
                </div>
            ),
        },
        {
            name: "Jumlah Tamu",
            selector: (row) => row.total_attendees,
            center: true,
        },
        {
            name: "Jam Hadir",
            center: true,
            selector: (row) =>
                row.arrived_at ? moment(row.arrived_at).format("hh:mm") : "-",
        },
        {
            name: "Action",
            center: true,
            cell: (row, index) => (
                <>
                    <Tooltip content="Kirim Pesan WhatsApp">
                        <IconButton variant="text" color="blue-gray">
                            <FontAwesomeIcon
                                icon="fa-brands fa-whatsapp"
                                size="2x"
                            />
                        </IconButton>
                    </Tooltip>
                    <Tooltip content="Edit">
                        <IconButton
                            variant="text"
                            color="blue-gray"
                            onClick={() =>
                                router.get(
                                    "/guest/edit/" + row.id,
                                    {},
                                    { replace: true }
                                )
                            }
                        >
                            <FontAwesomeIcon
                                icon="fa-solid fa-pen-to-square"
                                size="2x"
                            />
                        </IconButton>
                    </Tooltip>
                    <Tooltip content="Delete">
                        <IconButton
                            variant="text"
                            color="blue-gray"
                            onClick={() => showModalDelete(row.id)}
                        >
                            <FontAwesomeIcon
                                icon="fa-solid fa-trash"
                                size="2x"
                            />
                        </IconButton>
                    </Tooltip>
                </>
            ),
        },
    ];

    const passwordInput = useRef();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: "",
        guest_id: "",
    });

    const deleteGuest = (e) => {
        e.preventDefault();

        // destroy(route('guest.destroy',{
        //     id : data.guest_id
        // }), {
        //     preserveScroll: true,
        //     onSuccess: () => closeModalDelete(),
        //     onError: () => passwordInput.current.focus(),
        //     onFinish: () => reset(),
        // });
    };

    const showModalDelete = (id) => {
        setShowDeleteModal(true);
        setData("guest_id", id);
    };

    const closeModalDelete = () => {
        setShowDeleteModal(false);
        reset();
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Tamu Undangan
                </h2>
            }
        >
            <Head title="Tamu Undangan" />

            <Modal show={showDeleteModal} onClose={closeModalDelete}>
                <form onSubmit={deleteGuest} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Apa anda yakin akan menghapus tamu undangan ini?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Setelah dihapus, semua sumber daya dan datanya akan
                        dihapus secara permanen. Silakan masukkan kata sandi
                        Anda untuk mengonfirmasi bahwa Anda ingin menghapus akun
                        Anda secara permanen.
                    </p>

                    <div className="mt-6">
                        <Input
                            type="password"
                            ref={passwordInput}
                            size="lg"
                            label="Password"
                            value={data.password}
                            autoComplete="password"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            error={errors.password ? true : false}
                        />

                        {errors.password && (
                            <Typography
                                variant="small"
                                color="red"
                                className="flex items-center gap-1 font-normal mt-2"
                            >
                                {errors.password}
                            </Typography>
                        )}
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <Button
                            onClick={closeModalDelete}
                            variant="outlined"
                            color="gray"
                            size="sm"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            color="red"
                            disabled={processing}
                            size="sm"
                        >
                            Delete
                        </Button>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
