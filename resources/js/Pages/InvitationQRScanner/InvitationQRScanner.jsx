import QRCodeScanner from "@/Components/QRCodeScanner";
import SlideShow from "@/Components/SlideShow";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    useGetInvitationQuery,
    useUpdateInvitationMutation,
} from "@/Redux/Services/Invitations";
import { Head, router } from "@inertiajs/react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    Button,
    Input,
} from "@material-tailwind/react";
import moment from "moment";
import { useEffect, useMemo } from "react";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const QrOption = [
    {
        id: "arrived_status",
        label: "Arrived QR",
    },
    {
        id: "souvenir_status",
        label: "Souvenir QR",
    },
];

export default function InvitationQRScanner({ auth }) {
    const [invitationId, setInvitationId] = useState(null);
    const [selectedQR, setSelectedQR] = useState(QrOption[0].id);
    const [arrived_at, setArrivedAt] = useState(moment().format("hh:mm A"));

    const invitationQuery = useGetInvitationQuery(
        {
            id: invitationId,
        },
        {
            skip: !invitationId,
        }
    );

    const [updateInvitation, resultUpdateInvitation] =
        useUpdateInvitationMutation();

    const formik = useFormik({
        initialValues: {
            id: "",
            greeting: "",
            fullname: "",
            whatsapp: "",
            guest_max: "",
            guest_arrived: "",
            labels: "",
            delivered_status: "",
            rsvp_status: "",
            arrived_status: "",
            souvenir_status: "",
            inv_type: "",
            arrived_at: "",
        },
        validationSchema: Yup.object().shape({
            guest_arrived: Yup.string().trim(),
            arrived_status: Yup.string().trim(),
            souvenir_status: Yup.string().trim(),
        }),
        onSubmit: (values) => {
            values.id = invitationId;

            updateInvitation(values);
        },
    });

    const onNewScanResult = (decodedText, decodedResult, qr) => {
        setInvitationId(decodedText);
    };

    useEffect(() => {
        if (invitationQuery.isSuccess && !invitationQuery.isFetching) {
            for (let item in invitationQuery?.data?.data) {
                formik.setFieldValue(item, invitationQuery?.data?.data[item]);
            }

            setArrivedAt(moment().format("hh:mm A"));
            formik.setFieldValue(
                "arrived_at",
                moment().format("YYYY-MM-DD hh:mm:ss")
            );

            if (selectedQR === "arrived_status")
                formik.setFieldValue("arrived_status", 1);
            if (selectedQR === "souvenir_status")
                formik.setFieldValue("souvenir_status", 1);
        }
    }, [invitationQuery.isSuccess, invitationQuery.isFetching]);

    useEffect(() => {
        if (
            resultUpdateInvitation.isSuccess &&
            !resultUpdateInvitation.isFetching
        ) {
            setInvitationId(null);
        }
    }, [resultUpdateInvitation.isSuccess, resultUpdateInvitation.isFetching]);

    const welcome = () => (
        <Card className="overflow-hidden col-span-2 ">
            <form onSubmit={formik.handleSubmit}>
                {invitationQuery?.data?.data && (
                    <>
                        <CardHeader
                            floated={false}
                            shadow={false}
                            color="transparent"
                            className="text-center pb-3 min-h-[65vh] flex flex-col justify-between gap-5"
                        >
                            <Typography className="text-3xl md:text-5xl">
                                {selectedQR == "arrived_status"
                                    ? "Selamat Datang"
                                    : "Terima Kasih"}
                            </Typography>
                            <Typography
                                className="text-8xl"
                                style={{
                                    fontFamily: "AdineKirnberg",
                                }}
                            >
                                {invitationQuery?.data?.data?.fullname
                                    ?.toLowerCase()
                                    .replace(/\b[a-z]/g, function (letter) {
                                        return letter.toUpperCase();
                                    })}
                            </Typography>
                            {selectedQR == "arrived_status" ? (
                                <div>
                                    <Typography className="text-2xl">
                                        Jam Kehadiran :
                                    </Typography>
                                    <Typography className="text-4xl">
                                        {arrived_at}
                                    </Typography>
                                </div>
                            ) : (
                                <Typography className="text-4xl">
                                    Selamat Jalan
                                </Typography>
                            )}
                        </CardHeader>
                        <CardBody className="flex flex-col gap-4 justify-center items-end text-center">
                            <input
                                type="hidden"
                                {...formik.getFieldProps("arrived_at")}
                            />
                            <input
                                type="hidden"
                                {...formik.getFieldProps("arrived_status")}
                            />
                            <input
                                type="hidden"
                                {...formik.getFieldProps("souvenir_status")}
                            />
                            {selectedQR == "arrived_status" && (
                                <Input
                                    type="number"
                                    size="lg"
                                    label="Jumlah Tamu Undangan"
                                    {...formik.getFieldProps("guest_arrived")}
                                />
                            )}
                            {formik.errors.arrived_at &&
                                formik.touched.arrived_at && (
                                    <Typography
                                        variant="small"
                                        color="red"
                                        className="flex items-center gap-1 font-normal mt-2"
                                    >
                                        {formik.errors.arrived_at}
                                    </Typography>
                                )}
                            {formik.errors.arrived_status &&
                                formik.touched.arrived_status && (
                                    <Typography
                                        variant="small"
                                        color="red"
                                        className="flex items-center gap-1 font-normal mt-2"
                                    >
                                        {formik.errors.arrived_status}
                                    </Typography>
                                )}
                            {formik.errors.souvenir_status &&
                                formik.touched.souvenir_status && (
                                    <Typography
                                        variant="small"
                                        color="red"
                                        className="flex items-center gap-1 font-normal mt-2"
                                    >
                                        {formik.errors.souvenir_status}
                                    </Typography>
                                )}
                            <Button type="submit" size="lg" className="w-full">
                                Submit QR
                            </Button>
                        </CardBody>
                    </>
                )}
            </form>
        </Card>
    );

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    InvitationQRScanner
                </h2>
            }
        >
            <Head title="InvitationQRScanner" />
            <section>
                {!invitationId && (
                    <div className="md:grid md:grid-cols-3 gap-4">
                        <Card className="overflow-hidden">
                            <CardHeader
                                floated={false}
                                shadow={false}
                                color="transparent"
                                className="m-0 rounded-none min-h-[65vh]"
                            >
                                <QRCodeScanner
                                    fps={10}
                                    qrbox={250}
                                    // aspectRatio={0.75}
                                    disableFlip={false}
                                    qrCodeSuccessCallback={onNewScanResult}
                                />
                            </CardHeader>
                            <CardFooter className="items-center  ">
                                <Tabs value={QrOption[0].id}>
                                    <TabsHeader>
                                        {QrOption?.map(({ id, label }) => (
                                            <Tab
                                                key={id}
                                                value={id}
                                                onClick={() =>
                                                    setSelectedQR(id)
                                                }
                                            >
                                                {label}
                                            </Tab>
                                        ))}
                                    </TabsHeader>
                                </Tabs>
                            </CardFooter>
                        </Card>
                        <Card className="overflow-hidden col-span-2 hidden sm:block">
                            <CardBody className="grid grid-cols-2 gap-4 text-center items-center">
                                <ol className="pl-4 text-3xl">
                                    <li>
                                        <Typography
                                            color="gray"
                                            className="my-10 text-3xl "
                                        >
                                            1. Buka Link Undangan Digital Anda
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography
                                            color="gray"
                                            className="my-10 text-3xl"
                                        >
                                            2. Buka Menu Di Pojok Kiri Atas
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography
                                            color="gray"
                                            className="my-10 text-3xl"
                                        >
                                            3. Pilih Menu - QR Code
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography
                                            color="gray"
                                            className="my-10 text-3xl"
                                        >
                                            4. Arahkan Ponsel Ke Layar Ini Untuk
                                            Scan QR CODE
                                        </Typography>
                                    </li>
                                </ol>
                                <div className="smartphone">
                                    <img src="/img/open-qr-step.gif" />
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                )}
                {invitationId && welcome()}
            </section>
        </AuthenticatedLayout>
    );
}
