import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import QRCode from "react-qr-code";
import {
    Card,
    CardHeader,
    CardBody,
    Select,
    Typography,
    Option,
    Button,
    Alert,
    Spinner,
} from "@material-tailwind/react";
import { useEffect, useMemo, useState } from "react";
import WaTemplateSetting from "./WaTemplateSetting";
import { wsConnect, wsEmit } from "@/Redux/Features/WebSocketSlice";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CircularProgress from "@/Components/CircularProgress";
import { useGetInvitationListQuery } from "@/Redux/Services/Invitations";
import {
    waSetSendMessageStatus,
    waSetMessageQueue,
    waSetDeliveredMessageCount,
} from "@/Redux/Features/WaServerSlice";
import Modal from "@/Components/Modal";

const waTamplateHeader =
    "<p><strong>SPECIAL INVITATION THE WEDDING</strong></p>";
const waTamplateFooter = `<p>Selengkapnya : ${
    import.meta.env.VITE_BASE_URL
}/site/[invitation_id]</p>`;

const WaBlastInvitation = ({ auth, events, waTemplates, waDeliveredCount }) => {
    const dispatch = useDispatch();
    const websocket = useSelector((state) => state.WebSocket);
    const waserver = useSelector((state) => state.WaServer);

    const [selectedTemplate, setSelectedTemplate] = useState(waTemplates[0]);
    const [showModal, setShowModal] = useState(false);
    const [refetch, setRefetch] = useState(0);
    const limit = 50;

    const invitationsQuery = useGetInvitationListQuery(
        {
            page: 1,
            per_page: limit,
            filter_delivered_status: "0",
            refetch,
        },
        {
            skip: !(refetch > 0),
        }
    );

    useEffect(() => {
        dispatch(wsConnect());
        dispatch(waSetDeliveredMessageCount(waDeliveredCount.delivered));
    }, []);

    useEffect(() => {
        setShowModal(waserver.send_message_status);
    }, [waserver.send_message_status]);

    useEffect(() => {
        if (waserver.send_message_status) {
            if (invitationsQuery.data?.data?.data?.length) {
                const text_message = [
                    waTamplateHeader,
                    selectedTemplate.message,
                    waTamplateFooter,
                ].join("");

                const queue = invitationsQuery.data?.data?.data?.map((item) => {
                    return {
                        invitation_id: item.id,
                        phone_number: item.whatsapp,
                        message: text_message
                            .replaceAll("[name]", item.fullname)
                            .replaceAll("[greeting]", item.greeting)
                            .replaceAll("[invitation_id]", item.id),
                        image: `${import.meta.env.VITE_BASE_URL}/img/logo.png`,
                    };
                });
                console.log(queue, "queue");
                dispatch(waSetMessageQueue(queue));
            } else {
                dispatch(waSetSendMessageStatus(false));
                console.log("NO DATA");
            }
        }
    }, [invitationsQuery.data?.data?.data]);

    useEffect(() => {
        if (waserver.send_message_status) {
            if (waserver.send_message_queue.length > 0) {
                console.log(
                    "send_message_queue",
                    waserver.send_message_queue.length
                );
                console.log("SEND WA");
                if (
                    waserver.send_message_queue.length ==
                    invitationsQuery.data?.data?.data.length
                ) {
                    sendWaMessage(waserver.send_message_queue);
                }
            } else {
                console.log(
                    "delivered_message_queue",
                    waserver.delivered_message_queue.length
                );
                setRefetch(refetch + 1);
            }
        }
    }, [waserver.send_message_queue]);

    const onConnectWAServer = () => {
        dispatch(
            wsEmit({
                event: "wa:create_session",
                message: {
                    id: auth.user.id,
                },
            })
        );
    };

    const sendWaMessage = (send_message_queue) => {
        if (send_message_queue.length) {
            dispatch(
                wsEmit({
                    event: "wa:send_message",
                    message: send_message_queue[0],
                })
            );
            console.log("send message", send_message_queue[0].phone_number);
        }
    };

    const onSendMessage = () => {
        setRefetch(refetch + 1);
        dispatch(waSetSendMessageStatus(true));
    };

    const WAQRComponent = useMemo(() => {
        return (
            <>
                {!waserver.authenticated && waserver.qr && (
                    <section className="grid grid-cols-2 gaps-4">
                        <div>
                            <Typography color="gray" className="mt-1 text-3xl">
                                Tautkan WhatsApp Melalui QR
                            </Typography>
                            <ol className="pl-4 list-decimal">
                                <li>
                                    <Typography color="gray" className="mt-1">
                                        Buka WhatsApp di telepon anda
                                    </Typography>
                                </li>
                                <li>
                                    <Typography color="gray" className="mt-1">
                                        Pilih Menu - Pengaturan dan pilih
                                        Perangkat Tertaut
                                    </Typography>
                                </li>
                                <li>
                                    <Typography color="gray" className="mt-1">
                                        Pilih Tautkan Perangkat
                                    </Typography>
                                </li>
                                <li>
                                    <Typography color="gray" className="mt-1">
                                        Arahkan ponsel anda ke layar ini untuk
                                        mengambil QR CODE
                                    </Typography>
                                </li>
                            </ol>
                        </div>
                        <div className="flex justify-center items-center">
                            <div className="w-98">
                                <QRCode
                                    size={256}
                                    style={{
                                        height: "auto",
                                        maxWidth: "100%",
                                        width: "100%",
                                    }}
                                    value={waserver.qr}
                                    viewBox={`0 0 256 256`}
                                />
                            </div>
                        </div>
                    </section>
                )}
            </>
        );
    }, [waserver.authenticated, waserver.qr]);

    const WebSocketComponent = useMemo(() => {
        return (
            <>
                {websocket.connected &&
                    !waserver.connected &&
                    !waserver.connecting &&
                    !waserver.qr && (
                        <Button
                            color="green"
                            size="lg"
                            className="flex items-center gap-2"
                            onClick={onConnectWAServer}
                        >
                            <FontAwesomeIcon
                                icon="fa-brands fa-whatsapp"
                                size="2x"
                            />
                            Connect to WhatsApp Server
                        </Button>
                    )}

                {websocket.connected && waserver.connecting && (
                    <Alert color="orange">
                        WhatsApp Server is Connecting...
                    </Alert>
                )}

                {!websocket.connected && (
                    <Alert color="red">WhatsApp Server is Shutdown</Alert>
                )}
            </>
        );
    }, [websocket.connected, waserver.connected, waserver.connecting]);

    const WAUserProfileComponent = useMemo(
        () => (
            <>
                {waserver.user && (
                    <div className="">
                        <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-700 dark:shadow-black/30 ">
                            <div className="h-28 overflow-hidden rounded-t-lg bg-green-500"></div>
                            <div className="mx-auto -mt-12 w-24 overflow-hidden rounded-full border-2 border-white bg-white dark:border-neutral-800 dark:bg-neutral-800">
                                <img src={waserver?.user?.profilePic} />
                            </div>
                            <div className="p-6 ">
                                <div className="text-center ">
                                    <h4 className="mb-4 text-2xl font-semibold">
                                        {waserver?.user?.name}
                                    </h4>
                                    <p>{waserver?.user?.id?.user}</p>
                                </div>
                                <hr />
                                <div className="mt-4 flex items-center gap-4">
                                    {waTemplates && (
                                        <Select
                                            label="WA Blast Template"
                                            size="lg"
                                            value={selectedTemplate.id}
                                            onChange={(value) => {
                                                const selectedData =
                                                    waTemplates?.filter(
                                                        (item) =>
                                                            item.id == value
                                                    )[0];

                                                console.log(
                                                    selectedData,
                                                    "selectedData"
                                                );
                                                setSelectedTemplate(
                                                    selectedData
                                                );
                                            }}
                                        >
                                            {waTemplates?.map((opt) => (
                                                <Option
                                                    key={opt.id}
                                                    value={opt.id}
                                                >
                                                    {opt.template_name}
                                                </Option>
                                            ))}
                                        </Select>
                                    )}
                                    <Button
                                        onClick={onSendMessage}
                                        color="green"
                                        className="flex justify-center items-center gap-3 min-w-[15rem]"
                                        disabled={waserver.send_message_status}
                                    >
                                        Send Message
                                        {waserver.send_message_status && (
                                            <Spinner className="h-4 w-4" />
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </>
        ),
        [waserver.user, waserver.send_message_status, selectedTemplate]
    );

    const DeliveredCountComponent = useMemo(() => {
        const percentage =
            (100 *
                (waserver?.delivered_message_count > waDeliveredCount.total
                    ? waDeliveredCount.total
                    : waserver?.delivered_message_count)) /
            waDeliveredCount.total;
        return (
            <>
                {waserver.connected && (
                    <div className="min-h-[10rem] relative m-4 text-center">
                        <div className="m-auto grid grid-cols-2 items-center max-w-[30rem] ">
                            <CircularProgress
                                percentage={
                                    percentage > 1 || percentage == 0
                                        ? percentage.toFixed(1)
                                        : percentage.toFixed(1)
                                }
                            />

                            <div className="align-center">
                                <Typography color="blue-gray" className="">
                                    Invitations
                                </Typography>

                                <Typography variant="h2">
                                    {waserver?.delivered_message_count >
                                    waDeliveredCount.total
                                        ? waDeliveredCount.total
                                        : waserver?.delivered_message_count}
                                    /{waDeliveredCount.total}
                                </Typography>
                            </div>
                        </div>
                    </div>
                )}
            </>
        );
    }, [waserver.connected, waserver?.delivered_message_count]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    WhatsApp Blast Invitation Template
                </h2>
            }
        >
            <Head title="Setting Pesan WhatsApp" />

            <Card className="h-full w-full p-2 sm:p-6">
                <CardHeader
                    floated={false}
                    shadow={false}
                    className="rounded-none"
                >
                    <div className="flex items-center justify-between gap-8">
                        <Typography
                            variant="h5"
                            color="gray"
                            className="text-lg font-medium"
                        >
                            WhatsApp Server Setting
                        </Typography>
                    </div>
                </CardHeader>
                <CardBody className="px-0 p-4 space-y-6 ">
                    {WAQRComponent}
                    {WebSocketComponent}

                    <div className="grid grid-cols-2">
                        {WAUserProfileComponent}
                        <div className="items-center text-center">
                            {DeliveredCountComponent}
                        </div>
                    </div>
                </CardBody>
                {/* <CardFooter className="flex items-center justify-center gap-3 border-t border-gray-50 p-4"></CardFooter> */}
            </Card>

            <WaTemplateSetting events={events} waTemplates={waTemplates} />

            <Modal
                closeable={false}
                show={showModal}
                onClose={() => setShowModal(false)}
            >
                <Alert color="red" className="justify-center text-center">
                    <p>JANGAN CLOSE ATAU REFRESH BROWSER</p>
                    <p>Harap tunggu hingga proses selesai</p>
                </Alert>
                {DeliveredCountComponent}
            </Modal>
        </AuthenticatedLayout>
    );
};

export default WaBlastInvitation;
