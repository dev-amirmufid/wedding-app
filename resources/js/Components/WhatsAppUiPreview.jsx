import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    CardFooter,
    Button,
    IconButton,
} from "@material-tailwind/react";
import ScrollScreen from "./ScrollScreen";
import "@/Assets/css/editor.css";

const WhatsAppUIPreview = ({ data, selectedData, scrollHeight }) => {
    return (
        <div
            className="p-1"
            style={{
                backgroundImage: `url("img/bg-wa.jpg")`,
            }}
        >
            <ScrollScreen height={scrollHeight}>
                <div className=" grid content-between gap-2 p-2">
                    <div className="flex justify-end p-0">
                        <Card
                            className="w-full max-w-[26rem] shadow-lg"
                            style={{
                                backgroundColor: "#e1ffc7",
                            }}
                        >
                            <CardHeader
                                className="m-3"
                                floated={false}
                                shadow={false}
                                color="blue-gray"
                            >
                                <img
                                    src="/img/logo.png"
                                    alt="ui/ux review check"
                                    className="w-full bg-white"
                                />
                            </CardHeader>
                            <CardBody className="p-3">
                                <Typography color="black" className="font-bold">
                                    {data?.title}
                                </Typography>

                                <div
                                    className="wa-preview"
                                    dangerouslySetInnerHTML={{
                                        __html: selectedData
                                            ? data?.message
                                                  .replaceAll(
                                                      "[name]",
                                                      selectedData.fullname
                                                  )
                                                  .replaceAll(
                                                      "[greeting]",
                                                      selectedData.greeting
                                                  )
                                            : data?.message,
                                    }}
                                ></div>

                                <p>
                                    Selengkapnya:
                                    <a
                                        href={`${
                                            selectedData
                                                ? `${
                                                      import.meta.env
                                                          .VITE_BASE_URL
                                                  }/site/${selectedData.id}`
                                                : "#"
                                        }`}
                                        className="text-blue-500"
                                    >
                                        {import.meta.env.VITE_BASE_URL}/site/
                                        {selectedData
                                            ? selectedData.id
                                            : "{USER_ID}"}
                                    </a>
                                </p>

                                <p>===============</p>
                                <p>
                                    Ini adalah pesan otomatis dari{" "}
                                    <b>{import.meta.env.VITE_APP_NAME}</b>.
                                </p>
                                <p>Harap tidak membalas pesan ini</p>
                            </CardBody>
                            <CardFooter className="text-center p-3">
                                <a
                                    href={`${
                                        selectedData
                                            ? `${
                                                  import.meta.env.VITE_BASE_URL
                                              }/site/${selectedData.id}`
                                            : "#"
                                    }`}
                                >
                                    <Button
                                        variant="text"
                                        size="lg"
                                        className="w-full text-center flex justify-center gap-3"
                                    >
                                        <FontAwesomeIcon icon="fa-solid fa-link" />
                                        Buka
                                    </Button>
                                </a>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </ScrollScreen>
            <div className="flex items-center gap-2 m-2">
                <div className="flex w-full items-center bg-white rounded-lg">
                    <IconButton color="white">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            id="smiley"
                            x="3147"
                            y="3209"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M9.153 11.603c.795 0 1.44-.88 1.44-1.962s-.645-1.96-1.44-1.96c-.795 0-1.44.88-1.44 1.96s.645 1.965 1.44 1.965zM5.95 12.965c-.027-.307-.132 5.218 6.062 5.55 6.066-.25 6.066-5.55 6.066-5.55-6.078 1.416-12.13 0-12.13 0zm11.362 1.108s-.67 1.96-5.05 1.96c-3.506 0-5.39-1.165-5.608-1.96 0 0 5.912 1.055 10.658 0zM11.804 1.01C5.61 1.01.978 6.034.978 12.23s4.826 10.76 11.02 10.76S23.02 18.424 23.02 12.23c0-6.197-5.02-11.22-11.216-11.22zM12 21.355c-5.273 0-9.38-3.886-9.38-9.16 0-5.272 3.94-9.547 9.214-9.547a9.548 9.548 0 0 1 9.548 9.548c0 5.272-4.11 9.16-9.382 9.16zm3.108-9.75c.795 0 1.44-.88 1.44-1.963s-.645-1.96-1.44-1.96c-.795 0-1.44.878-1.44 1.96s.645 1.963 1.44 1.963z"
                                fill="#7d8489"
                            ></path>
                        </svg>
                    </IconButton>
                    <Typography className="">Type a message</Typography>
                </div>
                <IconButton className="bg-teal-600 rounded-full p-0">
                    <img src="/img/send-wa.png" className="m-0" />
                </IconButton>
            </div>
        </div>
    );
};

export default WhatsAppUIPreview;
