import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import {
    useDeleteInvitationMutation,
    useGetInvitationListQuery,
} from "@/Redux/Services/Invitations";
import { useEffect, useState } from "react";
import DataTable from "@/Components/DataTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Button,
    Chip,
    IconButton,
    Input,
    Option,
    Select,
    Tab,
    Tabs,
    TabsHeader,
    TabsBody,
    TabPanel,
    Tooltip,
    Typography,
    Badge,
} from "@material-tailwind/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Modal from "@/Components/Modal";
import WhatsAppUIPreview from "@/Components/WhatsAppUiPreview";
import { AddEventButton } from "../Events/Partials/EventItem";

const Invitations = ({ auth, meta, events, waTemplate }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    const [current_page, setCurrent_page] = useState(1);
    const [per_page, setPer_page] = useState(5);
    const [search, setSearch] = useState("");
    const [filter_event_id, setFilterEventId] = useState(events[0]?.id);

    const invitationsQuery = useGetInvitationListQuery(
        {
            page: current_page,
            per_page: per_page,
            search: search,
            filter_event_id: filter_event_id,
        },
        {
            skip: !(current_page > 0),
        }
    );
    const [deleteInvitation, resultDeleteInvitation] =
        useDeleteInvitationMutation();

    const formik = useFormik({
        initialValues: {
            password: "",
            id: "",
        },
        validationSchema: Yup.object().shape({
            password: Yup.string().trim().max(255).required(),
        }),
        onSubmit: (values) => {
            deleteInvitation(values);
        },
    });

    const formikWA = useFormik({
        initialValues: {
            whatsapp: "",
            message: "",
        },
        onSubmit: (values) => {},
    });

    useEffect(() => {
        if (resultDeleteInvitation.isSuccess) {
            closeDeleteModal();
        }
    }, [resultDeleteInvitation.isSuccess]);

    const onAddButtonClick = () => {
        router.get(route("invitations.create"));
    };

    const onEditButtonClick = (id) => {
        router.get(route("invitations.edit", { id }));
    };

    const onDeleteButtonClick = (row) => {
        setSelectedRow(row);
        formik.setFieldValue(`id`, row.id);
        setShowDeleteModal(true);
    };

    const onWhatsAppButtonClick = (row) => {
        setSelectedRow(row);
        setShowWhatsAppModal(true);
    };

    const onChangeFilter = (filter) => {
        setSearch(filter?.search);
        setCurrent_page(filter?.current_page);
        setPer_page(filter?.per_page);
        setFilterEventId(filter?.filter_event_id);
    };

    const closeDeleteModal = () => {
        formik.resetForm();
        setShowDeleteModal(false);
        setSelectedRow(null);
    };

    const closeWhatsAppModal = () => {
        formikWA.resetForm();
        setShowWhatsAppModal(false);
        setSelectedRow(null);
    };

    const renderDataTable = () => {
        const invitationDataColumns = [
            {
                name: "No",
                width: "5vw",
                center: true,
                cell: (row, index) =>
                    (invitationsQuery.data?.data.current_page - 1) *
                        invitationsQuery.data?.data.per_page +
                    (index + 1),
            },
            {
                name: "Greeting",
                selector: (row) => row.greeting,
            },
            {
                name: "Full Name",
                selector: (row) => {
                    let color = "";
                    if (row.inv_type == "VIP") {
                        color = "orange";
                    } else if (row.inv_type == "VVIP") {
                        color = "green";
                    } else {
                        return (
                            <Typography
                                color="blue-gray"
                                className="font-normal"
                            >
                                {row.fullname}
                            </Typography>
                        );
                    }
                    return (
                        <Badge content={row.inv_type} color={color}>
                            <Typography
                                color="blue-gray"
                                className="font-normal pr-4"
                            >
                                {row.fullname}
                            </Typography>
                        </Badge>
                    );
                },
            },
            {
                name: "WhatsApp Number",
                selector: (row) => `+62-${row.whatsapp}`,
            },
            {
                name: "Guest (Max)",
                selector: (row) => row.guest_max,
                center: true,
            },
            {
                name: "Labels",
                selector: (row) => row.labels,
                center: true,
            },
            {
                name: "Status",
                width: "20vw",
                cell: (row) => (
                    <div className="flex flex-col gap-3">
                        <div className="grid grid-cols-5 gap-3">
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                            >
                                Delivered
                            </Typography>
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal text-center"
                            >
                                :
                            </Typography>
                            <Chip
                                className="text-center col-span-3"
                                size="sm"
                                variant="ghost"
                                value={
                                    row.delivered_status == 1
                                        ? "Terkirim"
                                        : row.delivered_status == 2
                                        ? "Gagal"
                                        : "Belum Dikirim"
                                }
                                color={
                                    row.delivered_status == 1
                                        ? "green"
                                        : row.delivered_status == 2
                                        ? "red"
                                        : "blue-gray"
                                }
                            />
                        </div>

                        <div className="grid grid-cols-5 gap-3">
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                            >
                                RSVP
                            </Typography>
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal text-center"
                            >
                                :
                            </Typography>
                            <Chip
                                className="text-center col-span-3"
                                size="sm"
                                variant="ghost"
                                value={
                                    row.rsvp_status == 1
                                        ? "Bisa Hadir"
                                        : row.rsvp_status == 2
                                        ? "Tidak Bisa Hadir"
                                        : "Belum Respon"
                                }
                                color={
                                    row.rsvp_status == 1
                                        ? "green"
                                        : row.rsvp_status == 2
                                        ? "red"
                                        : "blue-gray"
                                }
                            />
                        </div>

                        <div className="grid grid-cols-5  gap-3">
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                            >
                                Arrived
                            </Typography>
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal text-center"
                            >
                                :
                            </Typography>
                            <Chip
                                className="text-center col-span-3"
                                size="sm"
                                variant="ghost"
                                value={
                                    row.arrived_status == 1
                                        ? "Hadir"
                                        : row.arrived_status == 2
                                        ? "Tidak Hadir"
                                        : "Belum Hadir"
                                }
                                color={
                                    row.arrived_status == 1
                                        ? "green"
                                        : row.arrived_status == 2
                                        ? "red"
                                        : "blue-gray"
                                }
                            />
                        </div>
                    </div>
                ),
            },
            {
                name: "Action",
                center: true,
                cell: (row, index) => (
                    <>
                        <Tooltip content="Kirim Pesan WhatsApp">
                            <IconButton
                                variant="text"
                                color="blue-gray"
                                onClick={() => onWhatsAppButtonClick(row)}
                            >
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
                                onClick={() => onEditButtonClick(row.id)}
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
                                onClick={() => onDeleteButtonClick(row)}
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

        return (
            <DataTable
                title="Invitation Data"
                columns={invitationDataColumns}
                data={invitationsQuery.data?.data?.data}
                filters={{ search, current_page, per_page, filter_event_id }}
                pagination={{
                    currentPages: invitationsQuery.data?.data.current_page,
                    totalPages: invitationsQuery.data?.data.last_page,
                    nextPageUrl: invitationsQuery.data?.data.next_page_url,
                    prevPageUrl: invitationsQuery.data?.data.prev_page_url,
                }}
                onChangeFilter={onChangeFilter}
                filterSearch={true}
                filterOptions={true}
                filterOptionsComponent={
                    <>
                        {events && (
                            <Select
                                label="Invited to Event"
                                value={filter_event_id}
                                onChange={(value) => setFilterEventId(value)}
                                className=""
                            >
                                {events?.map((opt) => (
                                    <Option key={opt.id} value={opt.id}>
                                        {opt.event_name}
                                    </Option>
                                ))}
                            </Select>
                        )}
                    </>
                }
                addButton={
                    <Button
                        onClick={onAddButtonClick}
                        className="flex items-center gap-3"
                        color="blue"
                        size="sm"
                    >
                        <FontAwesomeIcon icon="fa-solid fa-user-plus" /> Add
                        Invitation
                    </Button>
                }
            />
        );
    };

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

            {events.length > 0 ? (
                <>
                    {invitationsQuery.isSuccess && renderDataTable()}

                    <Modal show={showDeleteModal} onClose={closeDeleteModal}>
                        <form onSubmit={formik.handleSubmit} className="p-6">
                            <h2 className="text-lg font-medium text-gray-900">
                                Are you sure you want to delete this event ?
                            </h2>

                            <p className="mt-1 text-sm text-gray-600">
                                Once your event is deleted, all of its resources
                                and data will be permanently deleted. Please
                                enter your password to confirm you would like to
                                permanently delete event.
                            </p>

                            <div className="mt-6">
                                <Input
                                    size="lg"
                                    label="Password"
                                    type="password"
                                    {...formik.getFieldProps("password")}
                                    error={
                                        formik.errors.password &&
                                        formik.touched.password
                                            ? true
                                            : false
                                    }
                                />
                                {formik.errors.password &&
                                    formik.touched.password && (
                                        <Typography
                                            variant="small"
                                            color="red"
                                            className="flex items-center gap-1 font-normal mt-2"
                                        >
                                            {formik.errors.password}
                                        </Typography>
                                    )}
                            </div>

                            <div className="mt-6 flex justify-end gap-3">
                                <Button
                                    onClick={closeDeleteModal}
                                    variant="outlined"
                                    color="gray"
                                    size="sm"
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" color="red" size="sm">
                                    Delete Event
                                </Button>
                            </div>
                        </form>
                    </Modal>

                    <Modal
                        show={showWhatsAppModal}
                        onClose={closeWhatsAppModal}
                    >
                        <form onSubmit={formik.handleSubmit} className="p-6">
                            <Typography
                                variant="h2"
                                color="gray"
                                className="text-lg font-medium"
                            >
                                Send WhatsApp Invitation
                            </Typography>

                            {/* <Typography color="gray" className="font-medium text-center">Chose your WhatsApp Template</Typography> */}
                            {waTemplate?.length && (
                                <Tabs value={waTemplate[0].id}>
                                    <TabsHeader>
                                        {waTemplate?.map(
                                            ({ id, template_name }) => (
                                                <Tab key={id} value={id}>
                                                    {template_name}
                                                </Tab>
                                            )
                                        )}
                                    </TabsHeader>
                                    <TabsBody>
                                        {waTemplate?.map((item) => (
                                            <TabPanel
                                                key={item.id}
                                                value={item.id}
                                            >
                                                <WhatsAppUIPreview
                                                    data={item}
                                                    selectedData={selectedRow}
                                                    scrollHeight="450px"
                                                />
                                            </TabPanel>
                                        ))}
                                    </TabsBody>
                                </Tabs>
                            )}
                            <div className="mt-6 flex justify-end gap-3">
                                <Button
                                    onClick={closeWhatsAppModal}
                                    variant="outlined"
                                    color="gray"
                                    size="sm"
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" color="green" size="sm">
                                    Send WhatsApp
                                </Button>
                            </div>
                        </form>
                    </Modal>
                </>
            ) : (
                <AddEventButton
                    onAddButtonClick={() => router.get(route("events.create"))}
                />
            )}
        </AuthenticatedLayout>
    );
};

export default Invitations;
