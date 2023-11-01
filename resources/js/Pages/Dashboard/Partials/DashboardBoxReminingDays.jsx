import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Typography,
    Select,
    Option,
} from "@material-tailwind/react";
import Countdown from "react-countdown";

const DashboardBoxReminingDays = ({
    events,
    selectedEvents,
    setSelectedEvents,
}) => {
    const EventCountDown = ({ days, hours, minutes, seconds, completed }) => {
        return (
            <div className="grid grid-cols-4 gap-2">
                <div className="p-2 bg-white shadow sm:rounded-lg text-center">
                    <Typography variant="h5" className="mt-1 text-gray-600">
                        {days}
                    </Typography>
                    <Typography variant="small">Days</Typography>
                </div>

                <div className="p-2 bg-white shadow sm:rounded-lg text-center">
                    <Typography variant="h5" className="mt-1 text-gray-600">
                        {hours}
                    </Typography>
                    <Typography variant="small">Hour</Typography>
                </div>

                <div className="p-2 bg-white shadow sm:rounded-lg text-center">
                    <Typography variant="h5" className="mt-1 text-gray-600">
                        {minutes}
                    </Typography>
                    <Typography variant="small">Min</Typography>
                </div>

                <div className="p-2 bg-white shadow sm:rounded-lg text-center">
                    <Typography variant="h5" className="mt-1 text-gray-600">
                        {seconds}
                    </Typography>
                    <Typography variant="small">Sec</Typography>
                </div>
            </div>
        );
    };

    return (
        <Card className="w-full overflow-hidden">
            <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="m-0 rounded-none"
            >
                <div className="blue-gray absolute left-0 right-0 top-0 bottom-0 m-auto text-center h-[100px] px-[55px]">
                    <Typography
                        className="text-4xl md:text-6xl"
                        style={{
                            fontFamily: "AdineKirnberg",
                        }}
                    >
                        Tiara & Amir
                    </Typography>
                    <Typography className="text-xl">
                        {selectedEvents.event_name}
                    </Typography>
                </div>
                <img
                    src="/img/card-bg.png"
                    alt="ui/ux review check"
                    className="w-full"
                />
            </CardHeader>
            <CardBody>
                <Typography variant="h4" color="blue-gray">
                    REMAINING DAYS
                </Typography>

                <Countdown
                    date={Date.parse(selectedEvents.start)}
                    renderer={EventCountDown}
                />
            </CardBody>
            <CardFooter className="pt-0">
                <Select
                    label="Select Event"
                    value={selectedEvents.id}
                    onChange={(e) => {
                        const selected = events.find((a) => a.id === e);
                        setSelectedEvents(selected);
                    }}
                >
                    {events.map((opt) => (
                        <Option key={opt.id} value={opt.id}>
                            {opt.event_name}
                        </Option>
                    ))}
                </Select>
            </CardFooter>
        </Card>
    );
};

export default DashboardBoxReminingDays;
