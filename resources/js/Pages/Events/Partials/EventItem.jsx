import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Timeline,
    TimelineItem,
    TimelineConnector,
    TimelineIcon,
    TimelineHeader,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";

const EventItem = ({
    event,
    onAddButtonClick,
    onEditButtonClick,
    onDeleteButtonClick,
}) => {
    const [show, setShow] = useState(false);
    useEffect(() => {
        setShow(true);
    }, [5000]);
    return (
        <Transition
            show={show}
            enter="transition-opacity duration-[400ms]"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            {event.id == "add_new_event" ? (
                <AddEventButton onAddButtonClick={onAddButtonClick} />
            ) : (
                <Card className="w-full">
                    <CardBody>
                        <Typography
                            variant="h5"
                            color="blue-gray"
                            className="mb-2"
                        >
                            {event.event_name}
                        </Typography>
                        <Typography className="text-ellipsis overflow-hidden">
                            {event.desc?.substring(0, 150)}...
                        </Typography>

                        <Timeline className="mt-4">
                            <TimelineItem className="h-28">
                                <TimelineConnector className="!w-[78px]" />
                                <TimelineHeader className="relative rounded-xl border border-blue-gray-50 bg-white py-3 pl-4 pr-8 shadow-lg shadow-blue-gray-900/5">
                                    <TimelineIcon
                                        className="p-3"
                                        variant="ghost"
                                    >
                                        <FontAwesomeIcon
                                            icon="fa-regular fa-calendar-check"
                                            className="h-5 w-5"
                                        />
                                    </TimelineIcon>
                                    <div className="flex flex-col gap-1">
                                        <Typography
                                            variant="h6"
                                            color="blue-gray"
                                        >
                                            Started On
                                        </Typography>
                                        <Typography
                                            variant="small"
                                            color="gray"
                                            className="font-normal"
                                        >
                                            {moment(event.start).format("LLLL")}
                                        </Typography>
                                    </div>
                                </TimelineHeader>
                            </TimelineItem>
                            <TimelineItem className="h-28">
                                <TimelineConnector className="!w-[78px]" />
                                <TimelineHeader className="relative rounded-xl border border-blue-gray-50 bg-white py-3 pl-4 pr-8 shadow-lg shadow-blue-gray-900/5">
                                    <TimelineIcon
                                        className="p-3"
                                        variant="ghost"
                                        color="red"
                                    >
                                        <FontAwesomeIcon
                                            icon="fa-regular fa-calendar-xmark"
                                            className="h-5 w-5"
                                        />
                                    </TimelineIcon>
                                    <div className="flex flex-col gap-1">
                                        <Typography
                                            variant="h6"
                                            color="blue-gray"
                                        >
                                            Ends On
                                        </Typography>
                                        <Typography
                                            variant="small"
                                            color="gray"
                                            className="font-normal"
                                        >
                                            {event.end
                                                ? moment(event.end).format(
                                                      "LLLL"
                                                  )
                                                : "Until Finish"}
                                        </Typography>
                                    </div>
                                </TimelineHeader>
                            </TimelineItem>
                            <TimelineItem className="h-36">
                                <TimelineHeader className="relative rounded-xl border border-blue-gray-50 bg-white py-3 pl-4 pr-8 shadow-lg shadow-blue-gray-900/5">
                                    <TimelineIcon
                                        className="p-3"
                                        variant="ghost"
                                        color="green"
                                    >
                                        <FontAwesomeIcon
                                            icon="fa-solid fa-map-location-dot"
                                            className="h-5 w-5"
                                        />
                                    </TimelineIcon>
                                    <div className="flex flex-col gap-1">
                                        <Typography
                                            variant="h6"
                                            color="blue-gray"
                                        >
                                            Located At
                                        </Typography>
                                        <Typography
                                            variant="small"
                                            color="gray"
                                            className="font-normal"
                                        >
                                            {event.short_address}
                                        </Typography>
                                        <Typography
                                            variant="small"
                                            color="gray"
                                            className="font-normal"
                                        >
                                            {event.address}
                                        </Typography>
                                    </div>
                                </TimelineHeader>
                            </TimelineItem>
                        </Timeline>
                    </CardBody>
                    <CardFooter className="pt-0 flex items-center justify-between">
                        <Button
                            onClick={() => onDeleteButtonClick(event.id)}
                            size="sm"
                            color="red"
                            variant="outlined"
                            className="flex items-center gap-2"
                        >
                            <FontAwesomeIcon icon="fa-solid fa-trash" />
                            Delete Events
                        </Button>
                        <Button
                            onClick={() => onEditButtonClick(event.id)}
                            size="sm"
                            variant="outlined"
                            className="flex items-center gap-2"
                        >
                            <FontAwesomeIcon icon="fa-solid fa-pencil" />
                            Ubah Events
                        </Button>
                    </CardFooter>
                </Card>
            )}
        </Transition>
    );
};
//
export const AddEventButton = ({ onAddButtonClick }) => {
    return (
        <Card
            className="cursor-pointer w-full border-dashed border-blue-500 border-4 min-h-[600px]"
            onClick={onAddButtonClick}
        >
            <CardBody className="m-auto">
                <Typography
                    variant="h1"
                    color="blue"
                    className="mb-2 text-center"
                >
                    <FontAwesomeIcon icon="fa-regular fa-calendar-plus" />
                </Typography>
                <Typography variant="h5" color="blue" className="mb-2">
                    Add New Event
                </Typography>
            </CardBody>
        </Card>
    );
};

export default EventItem;
