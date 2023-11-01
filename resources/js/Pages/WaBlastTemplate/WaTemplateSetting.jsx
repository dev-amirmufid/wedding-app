import {
    Typography,
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Input,
    Select,
    Option,
    Spinner,
} from "@material-tailwind/react";
import { useEffect, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Editor } from "@tinymce/tinymce-react";

import WhatsAppUIPreview from "@/Components/WhatsAppUiPreview";
import { useUpdateWaTemplateMutation } from "@/Redux/Services/WaTemplate";
import AlertComponent from "@/Components/AlertComponent";
import { AddEventButton } from "../Events/Partials/EventItem";
import { useState } from "react";

const WaTemplateSetting = ({ events, waTemplates }) => {
    const [editorLoaded, setEditorLoaded] = useState(false);
    const messageEditorRef = useRef();
    const [updateWaTemplate, resultUpdateWaTemplate] =
        useUpdateWaTemplateMutation();

    const formik = useFormik({
        initialValues: {
            id: waTemplates[0].id,
            template_name: waTemplates[0].template_name,
            title: waTemplates[0].title,
            message: waTemplates[0].message,
        },
        validationSchema: Yup.object().shape({
            id: Yup.string().trim(),
        }),
        onSubmit: (values) => {
            updateWaTemplate(values);
        },
    });

    useEffect(() => {
        handleChangeTemplate(waTemplates[0].id);
    }, [editorLoaded]);

    const handleChangeTemplate = (value) => {
        const selectedData = waTemplates?.filter((item) => item.id == value)[0];
        if (selectedData) {
            formik.setFieldValue("id", value);
            formik.setFieldValue("template_name", selectedData.template_name);
            formik.setFieldValue("title", selectedData.title);
            formik.setFieldValue("message", selectedData.message);
            if (editorLoaded) {
                window?.tinymce?.activeEditor?.setContent(selectedData.message);
            }
        }
    };

    return (
        <>
            {events.length > 0 ? (
                <>
                    <Card className="h-full w-full p-2 sm:p-6">
                        <form onSubmit={formik.handleSubmit}>
                            <CardHeader
                                floated={false}
                                shadow={false}
                                className="rounded-none"
                            >
                                <div className="flex items-center justify-between gap-8">
                                    <div>
                                        <Typography
                                            variant="h5"
                                            color="gray"
                                            className="text-lg font-medium"
                                        >
                                            WhatsApp Blast Invitation Template
                                        </Typography>
                                        <Typography
                                            color="gray"
                                            className="mt-1 text-sm"
                                        >
                                            Setting template pesan WhatsApp yang
                                            akan di kirim ke seluruh tamu
                                            undangan
                                        </Typography>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardBody className="px-0 p-4">
                                <div className="grid md:grid-cols-2 gap-4 mt-4">
                                    <div className="space-y-6">
                                        <section>
                                            {waTemplates && (
                                                <Select
                                                    label="WA Blast Template"
                                                    size="lg"
                                                    {...formik.getFieldProps(
                                                        "id"
                                                    )}
                                                    onChange={
                                                        handleChangeTemplate
                                                    }
                                                    error={
                                                        formik.errors.id &&
                                                        formik.touched.id
                                                            ? true
                                                            : false
                                                    }
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
                                            {formik.errors.id &&
                                                formik.touched.id && (
                                                    <Typography
                                                        variant="small"
                                                        color="red"
                                                        className="flex items-center gap-1 font-normal mt-2"
                                                    >
                                                        {formik.errors.id}
                                                    </Typography>
                                                )}
                                        </section>

                                        <section>
                                            <Input
                                                type="text"
                                                size="lg"
                                                label="Title"
                                                {...formik.getFieldProps(
                                                    "title"
                                                )}
                                                error={
                                                    formik.errors.title &&
                                                    formik.touched.title
                                                        ? true
                                                        : false
                                                }
                                            />
                                            {formik.errors.title &&
                                                formik.touched.title && (
                                                    <Typography
                                                        variant="small"
                                                        color="red"
                                                        className="flex items-center gap-1 font-normal mt-2"
                                                    >
                                                        {formik.errors.title}
                                                    </Typography>
                                                )}
                                        </section>

                                        <section>
                                            <Editor
                                                tinymceScriptSrc="/tinymce/tinymce.min.js"
                                                onInit={(evt, editor) => {
                                                    messageEditorRef.current =
                                                        editor;
                                                    setEditorLoaded(true);
                                                }}
                                                // initialValue={formik.values.message}
                                                init={{
                                                    height: 300,
                                                    menubar: false,
                                                    toolbar:
                                                        "undo redo | formatselect | " +
                                                        "bold italic",
                                                    branding: false,
                                                }}
                                                onEditorChange={(value) =>
                                                    formik.setFieldValue(
                                                        "message",
                                                        value
                                                    )
                                                }
                                            />
                                            <Typography
                                                variant="small"
                                                className="flex items-center gap-1 font-normal mt-2"
                                            >
                                                **[name] akan digantikan oleh
                                                nama undangan,
                                            </Typography>
                                            <Typography
                                                variant="small"
                                                className="flex items-center gap-1 font-normal mt-2"
                                            >
                                                **[event_name] akan digantikan
                                                oleh nama event.
                                            </Typography>
                                            <Typography
                                                variant="small"
                                                className="flex items-center gap-1 font-normal mt-2"
                                            >
                                                **Masing-masing enter akan
                                                dipisahkan oleh 1 line break
                                                (enter)
                                            </Typography>
                                        </section>
                                    </div>
                                    <div
                                        className="rounded-lg bg-fixed"
                                        style={{
                                            backgroundImage: `url("/img/bg-wa.jpg")`,
                                        }}
                                    >
                                        <WhatsAppUIPreview
                                            data={formik.values}
                                            scrollHeight="550px"
                                        />
                                    </div>
                                </div>
                            </CardBody>
                            <CardFooter className="grid grid-cols-2 content-end gap-3 border-t border-gray-50 p-4">
                                <div>
                                    <AlertComponent
                                        option={resultUpdateWaTemplate}
                                    />
                                </div>
                                <div className="flex justify-end items-center gap-3">
                                    <Button
                                        type="submit"
                                        className="flex items-center gap-3"
                                        disabled={
                                            resultUpdateWaTemplate.isLoading
                                        }
                                    >
                                        {resultUpdateWaTemplate.isLoading && (
                                            <Spinner className="h-4 w-4" />
                                        )}
                                        Save
                                    </Button>
                                </div>
                            </CardFooter>
                        </form>
                    </Card>
                </>
            ) : (
                <AddEventButton
                    onAddButtonClick={() => router.get(route("events.create"))}
                />
            )}
        </>
    );
};

export default WaTemplateSetting;
