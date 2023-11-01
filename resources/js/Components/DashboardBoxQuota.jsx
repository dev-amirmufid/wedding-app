import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Typography,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CircularProgress from "@/Components/CircularProgress";

const DashboardBoxQuota = ({ title, text, value, quota, moreDetails }) => {
    const percentage = (100 * value) / quota;
    return (
        <Card className="w-full text-center">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <Typography
                    variant="h5"
                    color="blue-gray"
                    className="flex items-center gap-2"
                >
                    {title}
                </Typography>
            </CardHeader>
            <CardBody className="min-h-[10rem] relative flex flex-col">
                <div className="m-auto">
                    <div className="grid grid-cols-3 gap-2">
                        <CircularProgress
                            percentage={
                                percentage > 1 || percentage == 0
                                    ? percentage.toFixed(0)
                                    : percentage.toFixed(1)
                            }
                        />
                        <div className="col-span-2 m-auto">
                            <Typography color="blue-gray" className="">
                                {text}
                            </Typography>

                            <Typography variant="h2">
                                {value}/{quota}
                            </Typography>
                        </div>
                    </div>
                </div>
            </CardBody>

            {moreDetails && (
                <CardFooter className="pt-0">
                    <Button
                        size="sm"
                        onClick={moreDetails?.onClick}
                        className="w-full"
                    >
                        {moreDetails?.label}
                    </Button>
                </CardFooter>
            )}
        </Card>
    );
};

export default DashboardBoxQuota;
