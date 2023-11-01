import { router } from "@inertiajs/react";
import {
    Input,
    Typography,
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Switch,
    Textarea,
    Spinner,
} from "@material-tailwind/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";
import {
    useStoreEventMutation,
    useUpdateEventMutation,
} from "@/Redux/Services/Events";
import AlertComponent from "@/Components/AlertComponent";

export default function EventForm({ title, subtitle, data }) {
    const [storeEvent, resultStoreEvent] = useStoreEventMutation();
    const [updateEvent, resultUpdateEvent] = useUpdateEventMutation();

    const formik = useFormik({
        initialValues: {
            event_name: data?.event_name || "",
            start: data?.start || "",
            end: data?.end || "",
            desc: data?.desc || "",
            address: data?.address || "",
            short_address: data?.short_address || "",
            off_end_date: data?.end ? false : true,
            quota: data?.quota || "",
            quota_guest: data?.quota_guest || "",
            image: "",
        },
        validationSchema: Yup.object().shape({
            event_name: Yup.string().trim().max(150).required(),

            start: Yup.date().min(new Date()).required(),

            end: Yup.date().nullable(),

            desc: Yup.string().nullable(),

            address: Yup.string().max(800).required(),

            short_address: Yup.string().max(255).required(),

            quota: Yup.number().min(1).required(),

            quota_guest: Yup.number().min(1).required(),
            // image: Yup.mixed()
            //     .required()
            //     .test("is-valid-type", "Not a valid image type", (value) => {
            //         const validFileExtensions = {
            //             image: ["jpg", "gif", "png", "jpeg", "svg", "webp"],
            //         };
            //         const fileName = value?.name?.toLowerCase();
            //         return (
            //             fileName &&
            //             validFileExtensions.image.indexOf(
            //                 fileName.split(".").pop()
            //             ) > -1
            //         );
            //     })
            //     .test("is-valid-size", "Max allowed size is 5MB", (value) => {
            //         return value && value.size <= 5002400;
            //     }),
        }),
        onSubmit: (values) => {
            delete values.off_end_date;
            if (data) {
                values.id = data.id;
                updateEvent(values);
            } else {
                storeEvent(values);
            }
        },
    });

    useEffect(() => {
        if (resultStoreEvent.isSuccess || resultUpdateEvent.isSuccess) {
            router.get(route("events"), {}, { replace: true });
        }
    }, [resultStoreEvent.isSuccess, resultUpdateEvent.isSuccess]);

    return (
        <Card className="h-full w-full p-2 sm:p-6">
            <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
                <CardHeader
                    floated={false}
                    shadow={false}
                    className="rounded-none"
                >
                    <div className="flex items-center justify-between gap-8">
                        <div>
                            {title && (
                                <Typography
                                    variant="h5"
                                    color="gray"
                                    className="text-lg font-medium"
                                >
                                    {title}
                                </Typography>
                            )}
                            {subtitle && (
                                <Typography
                                    color="gray"
                                    className="mt-1 text-sm"
                                >
                                    {subtitle}
                                </Typography>
                            )}
                        </div>
                    </div>
                </CardHeader>
                <CardBody className="px-0 p-4 space-y-6 ">
                    <AlertComponent
                        option={data ? resultUpdateEvent : resultStoreEvent}
                    />

                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="mb-4 font-medium"
                    >
                        Details
                    </Typography>
                    <section>
                        <Input
                            type="text"
                            size="lg"
                            label="Name of Event"
                            {...formik.getFieldProps("event_name")}
                            error={
                                formik.errors.event_name &&
                                formik.touched.event_name
                                    ? true
                                    : false
                            }
                        />

                        {formik.errors.event_name &&
                            formik.touched.event_name && (
                                <Typography
                                    variant="small"
                                    color="red"
                                    className="flex items-center gap-1 font-normal mt-2"
                                >
                                    {formik.errors.event_name}
                                </Typography>
                            )}
                    </section>

                    <section className="my-4 grid grid-cols-3 gap-4">
                        <div>
                            <Input
                                type="datetime-local"
                                size="lg"
                                label="Start Date"
                                {...formik.getFieldProps("start")}
                                error={
                                    formik.errors.start && formik.touched.start
                                        ? true
                                        : false
                                }
                            />

                            {formik.errors.start && formik.touched.start && (
                                <Typography
                                    variant="small"
                                    color="red"
                                    className="flex items-center gap-1 font-normal mt-2"
                                >
                                    {formik.errors.start}
                                </Typography>
                            )}
                        </div>
                        <div>
                            <Input
                                type="datetime-local"
                                size="lg"
                                label="End Date"
                                {...formik.getFieldProps("end")}
                                error={
                                    formik.errors.end && formik.touched.end
                                        ? true
                                        : false
                                }
                                disabled={formik.values.off_end_date}
                            />

                            {formik.errors.end && formik.touched.end && (
                                <Typography
                                    variant="small"
                                    color="red"
                                    className="flex items-center gap-1 font-normal mt-2"
                                >
                                    {formik.errors.end}
                                </Typography>
                            )}
                        </div>
                        <div>
                            <Switch
                                name="off_end_date"
                                defaultChecked={formik.values.off_end_date}
                                label={
                                    <div>
                                        <Typography
                                            color="blue-gray"
                                            className="font-medium"
                                        >
                                            Tampilkan "- selesai" pada undangan
                                        </Typography>
                                        <Typography
                                            variant="small"
                                            color="gray"
                                            className="font-normal"
                                        >
                                            Pada website undangan tanggal dan
                                            jam selesai akan di tampilkan "-
                                            selesai"
                                        </Typography>
                                    </div>
                                }
                                onChange={(e) => {
                                    formik.setFieldValue(
                                        `off_end_date`,
                                        e.target.checked
                                    );
                                    if (e.target.checked)
                                        formik.setFieldValue(`end`, "");
                                }}
                                containerProps={{
                                    className: "-mt-5",
                                }}
                            />
                        </div>
                    </section>

                    <section className="my-4 grid grid-cols-2 gap-4">
                        <div>
                            <Input
                                type="number"
                                size="lg"
                                label="Quota (Max Invitations)"
                                {...formik.getFieldProps("quota")}
                                error={
                                    formik.errors.quota && formik.touched.quota
                                        ? true
                                        : false
                                }
                            />
                            {formik.errors.quota && formik.touched.quota && (
                                <Typography
                                    variant="small"
                                    color="red"
                                    className="flex items-center gap-1 font-normal mt-2"
                                >
                                    {formik.errors.quota}
                                </Typography>
                            )}
                        </div>
                        <div>
                            <Input
                                type="number"
                                size="lg"
                                label="Quota (Max Guests)"
                                {...formik.getFieldProps("quota_guest")}
                                error={
                                    formik.errors.quota_guest &&
                                    formik.touched.quota_guest
                                        ? true
                                        : false
                                }
                            />
                            {formik.errors.quota_guest &&
                                formik.touched.quota_guest && (
                                    <Typography
                                        variant="small"
                                        color="red"
                                        className="flex items-center gap-1 font-normal mt-2"
                                    >
                                        {formik.errors.quota_guest}
                                    </Typography>
                                )}
                        </div>
                    </section>

                    <section>
                        <Textarea
                            size="lg"
                            label="Descripsion"
                            {...formik.getFieldProps("desc")}
                            error={
                                formik.errors.desc && formik.touched.desc
                                    ? true
                                    : false
                            }
                        />

                        {formik.errors.desc && formik.touched.desc && (
                            <Typography
                                variant="small"
                                color="red"
                                className="flex items-center gap-1 font-normal mt-2"
                            >
                                {formik.errors.desc}
                            </Typography>
                        )}
                    </section>

                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="mb-4 font-medium"
                    >
                        Location
                    </Typography>
                    <section>
                        <Input
                            type="text"
                            size="lg"
                            label="Location"
                            {...formik.getFieldProps("short_address")}
                            error={
                                formik.errors.short_address &&
                                formik.touched.short_address
                                    ? true
                                    : false
                            }
                        />

                        {formik.errors.short_address &&
                            formik.touched.short_address && (
                                <Typography
                                    variant="small"
                                    color="red"
                                    className="flex items-center gap-1 font-normal mt-2"
                                >
                                    {formik.errors.short_address}
                                </Typography>
                            )}
                    </section>

                    <section>
                        <Textarea
                            size="lg"
                            label="Address Location"
                            {...formik.getFieldProps("address")}
                            error={
                                formik.errors.address && formik.touched.address
                                    ? true
                                    : false
                            }
                        />

                        {formik.errors.address && formik.touched.address && (
                            <Typography
                                variant="small"
                                color="red"
                                className="flex items-center gap-1 font-normal mt-2"
                            >
                                {formik.errors.address}
                            </Typography>
                        )}
                    </section>

                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="mb-4 font-medium"
                    >
                        Cover Upload
                    </Typography>

                    <section>
                        <Input
                            type="file"
                            size="lg"
                            label="Location"
                            name="image"
                            onChange={(e) =>
                                formik.setFieldValue(
                                    "image",
                                    e.currentTarget.files[0]
                                )
                            }
                            error={
                                formik.errors.image && formik.touched.image
                                    ? true
                                    : false
                            }
                        />

                        {formik.errors.image && formik.touched.image && (
                            <Typography
                                variant="small"
                                color="red"
                                className="flex items-center gap-1 font-normal mt-2"
                            >
                                {formik.errors.image}
                            </Typography>
                        )}

                        <p
                            className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                            id="file_input_help"
                        >
                            SVG, PNG, JPG or GIF (MAX. 800x400px).
                        </p>
                    </section>
                </CardBody>
                <CardFooter className="flex items-center justify-center gap-3 border-t border-gray-50 p-4">
                    <Button
                        onClick={() =>
                            router.get(route("events"), {}, { replace: true })
                        }
                        color="gray"
                        className="rounded-md"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        className="flex items-center gap-3"
                        disabled={
                            data
                                ? resultUpdateEvent.isLoading
                                : resultStoreEvent.isLoading
                        }
                    >
                        {(resultStoreEvent.isLoading ||
                            resultUpdateEvent.isLoading) && (
                            <Spinner className="h-4 w-4" />
                        )}
                        Save
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}
