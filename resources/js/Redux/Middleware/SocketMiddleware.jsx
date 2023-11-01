import { io } from "socket.io-client";
import {
    wsConnected,
    wsDisconnect,
    wsDisconnected,
    wsReconnected,
} from "@/Redux/Features/WebSocketSlice";
import {
    waConnected,
    waDisconnected,
    waConnecting,
    waQR,
    waAuth,
    waMessage,
    waUser,
    waDestroy,
    waMessageCreate,
    waSetMessageQueue,
    waSetDeliveredMessageQueue,
    waSetDeliveredMessageCount,
} from "@/Redux/Features/WaServerSlice";
let host = `http://localhost:1000`;

const SocketMiddleware = () => {
    let socket = null;
    return (store) => (next) => (action) => {
        switch (action.type) {
            case "WebSocket/wsConnect":
                if (socket === null) {
                    socket = io(host, {
                        transports: ["websocket"],
                        reconnectionAttempts: 5,
                    });

                    socket.on("connect", () => {
                        //SOCKET CONNECTED
                        if (socket.connected) {
                            store.dispatch(
                                wsConnected({
                                    socket_id: socket.id,
                                })
                            );
                        }

                        //SOCKET DISCONNECT
                        socket.on("disconnect", () => {
                            store.dispatch(wsDisconnect());
                            store.dispatch(waDestroy());
                            localStorage.removeItem("wa_server_connected");
                            localStorage.removeItem("wa_server_user");
                        });

                        //SOCKET RECONNECT ATTEMPT
                        socket.io.on("reconnect_attempt", (count) => {
                            if (count >= 5) {
                                store.dispatch(wsDisconnected());
                                socket.close();
                                socket = null;
                            }
                        });

                        socket.io.on("reconnect", () => {
                            store.dispatch(wsReconnected());
                        });

                        socket.on("wa:status", (data) => {
                            switch (data.status) {
                                case "ready":
                                    store.dispatch(waConnected());
                                    store.dispatch(waUser(data.data.user));
                                    localStorage.setItem(
                                        "wa_server_connected",
                                        true
                                    );
                                    localStorage.setItem(
                                        "wa_server_user",
                                        JSON.stringify(data.data.user)
                                    );
                                    break;

                                case "disconnected":
                                    store.dispatch(waDisconnected());
                                    break;

                                case "connecting":
                                    store.dispatch(waConnecting());
                                    break;
                            }
                        });

                        socket.on("wa:qr", (qr) => {
                            store.dispatch(waQR(qr));
                        });

                        socket.on("wa:authenticated", (auth) => {
                            store.dispatch(waAuth(auth));
                        });

                        socket.on("wa:message", (message) => {
                            store.dispatch(waMessage(message));
                        });

                        socket.on("wa:message_create", (data) => {
                            store.dispatch(waMessageCreate(data));
                            // const state = store.getState();

                            store.dispatch(
                                waSetDeliveredMessageQueue({
                                    phone_number: data.to,
                                    status: true,
                                })
                            );
                        });

                        socket.on("wa:send_message_error", (data) => {
                            // store.dispatch(waMessageCreate(data));
                            // const state = store.getState();

                            store.dispatch(
                                waSetDeliveredMessageQueue({
                                    phone_number: data.phone_number,
                                    status: false,
                                })
                            );
                        });
                    });
                }
                break;

            case "WebSocket/wsEmit":
                if (socket !== null && action?.payload?.event) {
                    socket.emit(action.payload.event, action.payload.message);
                }
                break;
            default:
                return next(action);
        }
    };
};

export default SocketMiddleware();
