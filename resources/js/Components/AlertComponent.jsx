import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";

function AlertComponent({ option }) {
    const [open, setOpen] = useState(false);
    const [color, setcolor] = useState("gray");
    const [icon, seticon] = useState("");
    const [title, setTitle] = useState("Title");
    const [message, setMessage] = useState("message");

    useEffect(() => {
        if (option.isSuccess) {
            openAndAutoClose();
            setcolor("green");
            setTitle("Success");
            setMessage(
                <Typography className="mt-2 font-normal">
                    {option.data.message}
                </Typography>
            );
            seticon(<FontAwesomeIcon icon="fa-solid fa-circle-check" />);
        }
    }, [option.isSuccess]);
    useEffect(() => {
        if (option.isError) {
            setOpen(true);
            setcolor("red");
            console.log(option);
            if (
                option.error.status === 442 ||
                option.error?.data?.message === "validation"
            ) {
                setTitle("Ensure that these requirements are met : ");
                const htmlString = [];
                const html = [];
                for (const fieldname in option.error.data.data) {
                    for (const messageIndex in option.error.data.data[
                        fieldname
                    ]) {
                        html.push(
                            <li key={`${fieldname}${messageIndex}`}>
                                <b>{fieldname}</b> :{" "}
                                {
                                    option.error.data.data[fieldname][
                                        messageIndex
                                    ]
                                }
                            </li>
                        );
                    }
                }
                setMessage(
                    <ol className="mt-2 ml-2 list-disc list-inside">{html}</ol>
                );
            } else {
                setTitle("Error");
            }
            seticon(
                <FontAwesomeIcon icon="fa-solid fa-triangle-exclamation" />
            );
        }
    }, [option.isError]);

    const openAndAutoClose = () => {
        setOpen(true);
        setTimeout(() => {
            setOpen(false);
        }, 3000);
    };

    return (
        <Alert
            open={open}
            color={color}
            icon={icon}
            onClose={() => setOpen(false)}
            className="w-full"
            variant="outlined"
        >
            <Typography className="font-medium">{title}</Typography>
            {message}
        </Alert>
    );
}

export default AlertComponent;
