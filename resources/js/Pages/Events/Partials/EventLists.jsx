import { useEffect, useMemo, useState } from "react";
import EventItem from "./EventItem";
import FlatList from "flatlist-react";
import ScrollScreen from "@/Components/ScrollScreen";
import { Button, Input, Spinner, Typography } from "@material-tailwind/react";
import Modal from "@/Components/Modal";
import { useDeleteEventMutation } from "@/Redux/Services/Events";
import { useFormik } from "formik";
import * as Yup from "yup";

const EventLists = ({
    data,
    hasMoreData,
    fetchData,
    onAddButtonClick,
    onEditButtonClick,
}) => {
    const [list, setlist] = useState([]);
    const [items, setItems] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [deleteEvent, resultDeleteEvent] = useDeleteEventMutation();

    const formik = useFormik({
        initialValues: {
            password: "",
            id: "",
        },
        validationSchema: Yup.object().shape({
            password: Yup.string().trim().max(255).required(),
        }),
        onSubmit: (values) => {
            deleteEvent(values);
        },
    });

    useEffect(() => {
        if (data) {
            if (list) {
                const result = Object.values(
                    []
                        .concat(list, data)
                        .reduce(
                            (r, c) => (
                                (r[c.id] = Object.assign(r[c.id] || {}, c)), r
                            ),
                            {}
                        )
                );
                setlist(result);
            } else {
                setlist(data);
            }
        } else {
        }
    }, [data]);

    useEffect(() => {
        let newItems = [];
        if (list.length) {
            newItems.push(...list);
        }
        newItems.push({
            id: "add_new_event",
        });
        if (list.length) {
        }
        setItems(newItems);
    }, [list]);

    useEffect(() => {
        if (resultDeleteEvent.isSuccess) {
            const objWithIdIndex = list.findIndex(
                (obj) => obj.id === formik.values.id
            );

            if (objWithIdIndex > -1) {
                list.splice(objWithIdIndex, 1);
                setlist(list);
            }
            closeModal();
        }
    }, [resultDeleteEvent.isSuccess]);

    const onDeleteButtonClick = (id) => {
        formik.setFieldValue(`id`, id);
        setShowDeleteModal(true);
    };

    const closeModal = () => {
        formik.resetForm();
        setShowDeleteModal(false);
    };

    const EvenItemMemo = useMemo(() => {
        return (
            <>
                {items?.length ? (
                    <FlatList
                        list={items}
                        renderItem={(item, key) => (
                            <EventItem
                                key={key}
                                event={item}
                                onAddButtonClick={onAddButtonClick}
                                onEditButtonClick={onEditButtonClick}
                                onDeleteButtonClick={onDeleteButtonClick}
                            />
                        )}
                        renderWhenEmpty={() => <></>}
                        pagination={{
                            hasMore: hasMoreData,
                            loadMore: fetchData,
                            loadingIndicator: <Spinner className="h-12 w-12" />,
                            loadingIndicatorPosition: "center",
                        }}
                        displayGrid={true}
                        minColumnWidth="350px"
                        gridGap="50px"
                    />
                ) : null}
            </>
        );
    }, [items]);

    return (
        <>
            <ScrollScreen>{EvenItemMemo}</ScrollScreen>;
            <Modal show={showDeleteModal} onClose={closeModal}>
                <form onSubmit={formik.handleSubmit} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Are you sure you want to delete this event ?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Once your event is deleted, all of its resources and
                        data will be permanently deleted. Please enter your
                        password to confirm you would like to permanently delete
                        event.
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
                        {formik.errors.password && formik.touched.password && (
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
                            onClick={closeModal}
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
        </>
    );
};

export default EventLists;
