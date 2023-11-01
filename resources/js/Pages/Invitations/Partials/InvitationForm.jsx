import { router } from "@inertiajs/react";
import {
    Input,
    Typography,
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Spinner,
    Select,
    Option,
    Checkbox,
} from "@material-tailwind/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";
import {
    useStoreInvitationMutation,
    useUpdateInvitationMutation,
} from "@/Redux/Services/Invitations";
import AlertComponent from "@/Components/AlertComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function InvitationForm({ title, subtitle, data, events }) {
    const [storeInvitation, resultStoreInvitation] =
        useStoreInvitationMutation();
    const [updateInvitation, resultUpdateInvitation] =
        useUpdateInvitationMutation();

    const formik = useFormik({
        initialValues: {
            event_ids: data?.events
                ? data?.events?.map((item) => item.event_id)
                : [],
            greeting: data?.greeting || "",
            fullname: data?.fullname || "",
            whatsapp: data?.whatsapp || "",
            guest_max: data?.guest_max || 2,
            labels: data?.labels || "",
            inv_type: data?.inv_type || "",
        },
        validationSchema: Yup.object().shape({
            event_ids: Yup.array().min(1),

            greeting: Yup.string().trim().max(100).required(),

            fullname: Yup.string().trim().max(150).required(),

            whatsapp: Yup.string().trim().max(20).required(),

            guest_max: Yup.number().max(5).min(1).required(),

            labels: Yup.string().trim().required(),

            inv_type: Yup.string().trim().required(),
        }),
        onSubmit: (values) => {
            delete values.off_end_date;
            if (data) {
                values.id = data.id;
                updateInvitation(values);
            } else {
                storeInvitation(values);
            }
        },
    });

    useEffect(() => {
        if (
            resultStoreInvitation.isSuccess ||
            resultUpdateInvitation.isSuccess
        ) {
            router.get(route("invitations"), {}, { replace: true });
        }
    }, [resultStoreInvitation.isSuccess, resultUpdateInvitation.isSuccess]);

    return (
        <Card className="h-full w-full p-2 sm:p-6">
            <form onSubmit={formik.handleSubmit}>
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
                        option={
                            data
                                ? resultUpdateInvitation
                                : resultStoreInvitation
                        }
                    />
                    <section>
                        <div className="relative w-full min-w-[200px]">
                            <label
                                className={`
                                ${
                                    formik.errors.event_ids &&
                                    formik.touched.event_ids
                                        ? "before:border-red-500 after:border-red-500 text-red-500"
                                        : "before:border-blue-gray-200 after:border-blue-gray-200 text-blue-gray-400"
                                }
                                flex w-full h-full pointer-events-none absolute left-0 font-normal leading-tight peer-focus:leading-tight -top-1.5 text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 before:rounded-tl-md before:border-t after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[4.1]  peer-focus:text-blue-500  peer-focus:after:!border-blue-500
                                `}
                            >
                                Invite to Events
                            </label>
                            <div
                                className={`
                                ${
                                    formik.errors.event_ids &&
                                    formik.touched.event_ids
                                        ? "border-red-500"
                                        : "border-blue-gray-200"
                                }
                                peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 border border-t-transparent text-sm px-3 py-3 rounded-md border-blue-gray-200
                                `}
                            >
                                {events?.map((opt) => (
                                    <Checkbox
                                        key={opt.id}
                                        id={opt.id}
                                        value={opt.id}
                                        label={opt.event_name}
                                        name="event_ids"
                                        checked={formik.values.event_ids.includes(
                                            opt.id
                                        )}
                                        onChange={(e) => {
                                            const { checked, value } = e.target;
                                            if (checked) {
                                                formik.setFieldValue(
                                                    "event_ids",
                                                    [
                                                        ...formik.values
                                                            .event_ids,
                                                        value,
                                                    ]
                                                );
                                            } else {
                                                formik.setFieldValue(
                                                    "event_ids",
                                                    formik.values.event_ids.filter(
                                                        (v) => v !== value
                                                    )
                                                );
                                            }
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                        {formik.errors.event_ids &&
                            formik.touched.event_ids && (
                                <Typography
                                    variant="small"
                                    color="red"
                                    className="flex items-center gap-1 font-normal mt-2"
                                >
                                    {formik.errors.event_ids}
                                </Typography>
                            )}
                    </section>

                    <section className="my-4 grid lg:grid-cols-4 gap-4">
                        <div>
                            <Input
                                type="text"
                                size="lg"
                                label="Greeting"
                                {...formik.getFieldProps("greeting")}
                                error={
                                    formik.errors.greeting &&
                                    formik.touched.greeting
                                        ? true
                                        : false
                                }
                            />
                            {formik.errors.greeting &&
                                formik.touched.greeting && (
                                    <Typography
                                        variant="small"
                                        color="red"
                                        className="flex items-center gap-1 font-normal mt-2"
                                    >
                                        {formik.errors.greeting}
                                    </Typography>
                                )}
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="italic flex items-center gap-1 font-normal mt-2"
                            >
                                ex : Yth, Dear
                            </Typography>
                        </div>
                        <div className="lg:col-span-3">
                            <Input
                                type="text"
                                size="lg"
                                label="Name"
                                autoComplete="off"
                                {...formik.getFieldProps("fullname")}
                                error={
                                    formik.errors.fullname &&
                                    formik.touched.fullname
                                        ? true
                                        : false
                                }
                            />
                            {formik.errors.fullname &&
                                formik.touched.fullname && (
                                    <Typography
                                        variant="small"
                                        color="red"
                                        className="flex items-center gap-1 font-normal mt-2"
                                    >
                                        {formik.errors.fullname}
                                    </Typography>
                                )}
                        </div>
                    </section>

                    <section className="my-4 grid lg:grid-cols-4 gap-4">
                        <div>
                            <Select
                                label="Invitation Labels"
                                size="lg"
                                {...formik.getFieldProps("labels")}
                                onChange={(value) =>
                                    formik.setFieldValue("labels", value)
                                }
                                error={
                                    formik.errors.labels &&
                                    formik.touched.labels
                                        ? true
                                        : false
                                }
                            >
                                <Option value="Keluarga">Keluarga</Option>
                                <Option value="Teman">Teman</Option>
                                <Option value="Lainnya">Lainnya</Option>
                            </Select>
                            {formik.errors.labels && formik.touched.labels && (
                                <Typography
                                    variant="small"
                                    color="red"
                                    className="flex items-center gap-1 font-normal mt-2"
                                >
                                    {formik.errors.labels}
                                </Typography>
                            )}
                        </div>
                        <div>
                            <Select
                                label="Invitation Type"
                                size="lg"
                                {...formik.getFieldProps("inv_type")}
                                onChange={(value) =>
                                    formik.setFieldValue("inv_type", value)
                                }
                                error={
                                    formik.errors.inv_type &&
                                    formik.touched.inv_type
                                        ? true
                                        : false
                                }
                            >
                                <Option value="Reguler">Reguler</Option>
                                <Option value="VIP">VIP</Option>
                                <Option value="VVIP">VVIP</Option>
                            </Select>
                            {formik.errors.inv_type &&
                                formik.touched.inv_type && (
                                    <Typography
                                        variant="small"
                                        color="red"
                                        className="flex items-center gap-1 font-normal mt-2"
                                    >
                                        {formik.errors.inv_type}
                                    </Typography>
                                )}
                        </div>
                    </section>

                    <section className="max-w-xl">
                        <Input
                            type="number"
                            size="lg"
                            label="Guest (Max)"
                            {...formik.getFieldProps("guest_max")}
                            error={
                                formik.errors.guest_max &&
                                formik.touched.guest_max
                                    ? true
                                    : false
                            }
                        />
                        {events?.map((opt) => (
                            <Typography
                                key={opt.id}
                                variant="small"
                                className="italic gap-1 font-normal mt-2"
                            >
                                {opt.event_name} Guest Max :{" "}
                                <b>
                                    {opt.sum_guest_max || 0} /{" "}
                                    {opt.quota_guest || 0}
                                </b>
                            </Typography>
                        ))}
                        {formik.errors.guest_max &&
                            formik.touched.guest_max && (
                                <Typography
                                    variant="small"
                                    color="red"
                                    className="flex items-center gap-1 font-normal mt-2"
                                >
                                    {formik.errors.guest_max}
                                </Typography>
                            )}
                    </section>

                    <section>
                        <div className="flex w-full max-w-[24rem] my-6">
                            <div
                                className={`border 
                  ${
                      formik.errors.whatsapp && formik.touched.whatsapp
                          ? "border-red-500 bg-red-500 text-white"
                          : "border-blue-gray-200 bg-gray-200 text-blue-gray"
                  }  
                  rounded-md flex h-11 items-center gap-2 rounded-r-none p-3 border-r-0 px-3`}
                            >
                                <FontAwesomeIcon icon="fa-brands fa-whatsapp" />{" "}
                                +62
                            </div>
                            <Input
                                type="tel"
                                placeholder="WhatsApp Number"
                                className="rounded-l-none"
                                labelProps={{
                                    className: "before:content-none ",
                                }}
                                containerProps={{
                                    className: "min-w-0",
                                }}
                                size="lg"
                                {...formik.getFieldProps("whatsapp")}
                                error={
                                    formik.errors.whatsapp &&
                                    formik.touched.whatsapp
                                        ? true
                                        : false
                                }
                            />
                        </div>

                        {formik.errors.whatsapp && formik.touched.whatsapp && (
                            <Typography
                                variant="small"
                                color="red"
                                className="flex items-center gap-1 font-normal mt-2"
                            >
                                {formik.errors.whatsapp}
                            </Typography>
                        )}
                    </section>
                </CardBody>
                <CardFooter className="flex items-center justify-center gap-3 border-t border-gray-50 p-4">
                    <Button
                        onClick={() =>
                            router.get(
                                route("invitations"),
                                {},
                                { replace: true }
                            )
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
                                ? resultUpdateInvitation.isLoading
                                : resultStoreInvitation.isLoading
                        }
                    >
                        {(resultStoreInvitation.isLoading ||
                            resultUpdateInvitation.isLoading) && (
                            <Spinner className="h-4 w-4" />
                        )}
                        Save
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}
