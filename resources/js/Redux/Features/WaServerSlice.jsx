import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import WaNumberFormater from "@/Helpers/WaNumberFormatter";
import InvitationsApi from "@/Redux/Services/Invitations";
import { wsEmit } from "@/Redux/Features/WebSocketSlice";

const initialState = {
    connected: false,
    connecting: false,
    error: false,
    qr: "",
    authenticated: false,
    user: null,
    message: "",
    message_create: "",
    error_message: "",
    send_message_status: false,
    send_message_queue: [],
    delivered_message_queue: [],
    delivered_message_count: 0,
};

export const waSetDeliveredMessageQueue = createAsyncThunk(
    "WaServer/waSetDeliveredMessageQueue",
    async (payload, { dispatch, getState, rejectWithValue }) => {
        try {
            const state = getState().WaServer;

            let result = {
                delivered_message_queue: state.delivered_message_queue,
                send_message_queue: JSON.parse(
                    JSON.stringify(state.send_message_queue)
                ),
                delivered_message_count: state.delivered_message_count,
            };

            const index = state.send_message_queue.findIndex(
                (item) =>
                    WaNumberFormater(item.phone_number) == payload.phone_number
            );

            if (index >= 0) {
                const res_api = await dispatch(
                    InvitationsApi.endpoints.updateInvitationDeliveredStatus.initiate(
                        {
                            id: state.send_message_queue[index].invitation_id,
                            delivered_status: payload.status ? 1 : 2,
                        }
                    )
                );
                console.log(res_api?.data?.success, res_api, "res_api");
                if (res_api?.data?.success) {
                    result.delivered_message_queue = [
                        ...result.delivered_message_queue,
                        state.send_message_queue[index].invitation_id,
                    ];
                    result.send_message_queue.splice(index, 1);
                    result.delivered_message_count =
                        state.delivered_message_count + 1;

                    dispatch(
                        wsEmit({
                            event: "wa:send_message",
                            message: result.send_message_queue[0],
                        })
                    );
                    console.log("end", "res_api");
                    return result;
                }
            } else {
                return rejectWithValue(null);
            }
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

const WaServerSlice = createSlice({
    name: "WaServer",
    initialState,
    reducers: {
        waConnected: (state) => {
            state.connected = true;
            state.connecting = false;
        },

        waDisconnected: (state, action) => {
            state.connected = false;
            state.connecting = false;
            state.error_message = "DC";
        },

        waConnecting: (state) => {
            state.connected = false;
            state.connecting = true;
        },

        waQR: (state, action) => {
            state.connecting = false;
            state.authenticated = false;
            state.qr = action.payload;
        },

        waAuth: (state, action) => {
            state.connecting = false;
            state.connected = true;
            state.authenticated = action.payload.status;
            state.message = action.payload.message;
        },

        waMessage: (state, action) => {
            state.message = action.payload;
        },

        waMessageCreate: (state, action) => {
            state.message_create = action.payload;
        },

        waErrorMessage: (state, action) => {
            state.error_message = action.payload;
        },

        waUser: (state, action) => {
            state.user = action.payload;
        },

        waSetMessageQueue: (state, action) => {
            state.send_message_queue = action.payload;
            state.delivered_message_queue = [];
        },

        waSetDeliveredMessageCount: (state, action) => {
            state.delivered_message_count =
                action.payload >= 0
                    ? action.payload
                    : state.delivered_message_count + 1;
        },

        waDestroy: (state) => {
            state.connected = false;
            state.connecting = false;
            state.error = false;
            state.qr = "";
            state.authenticated = false;
            state.user = null;
            state.message = "";
            state.message_create = "";
            state.error_message = "";
            state.send_message_status = false;
            state.send_message_queue = [];
            state.delivered_message_queue = [];
            state.delivered_message_count = 0;
        },

        waSetSendMessageStatus: (state, action) => {
            state.send_message_status = action.payload;
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(
            waSetDeliveredMessageQueue.fulfilled,
            (state, action) => {
                console.log(action.payload, "res_api");
                if (action.payload) {
                    state.send_message_queue =
                        action.payload.send_message_queue;
                    state.delivered_message_queue =
                        action.payload.delivered_message_queue;
                    state.delivered_message_count =
                        action.payload.delivered_message_count;
                }
            }
        );
    },
});

export const {
    waConnected,
    waDisconnected,
    waConnecting,
    waQR,
    waAuth,
    waMessage,
    waErrorMessage,
    waMessageCreate,
    waUser,
    waDestroy,
    waSetMessageQueue,
    waSetDeliveredMessageCount,
    waSetSendMessageStatus,
} = WaServerSlice.actions;

export default WaServerSlice;
