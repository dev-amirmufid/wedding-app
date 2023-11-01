import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    connected: false,
    status: "", //connecting, connected, disconnect
    autoReconnect: false,
    reconnected: false,
    socket_id: null,
    socket_room_ids: [],
    last_socket_emit: null,
};

const WebSocketSlice = createSlice({
    name: "WebSocket",
    initialState,
    reducers: {
        wsConnect: (state, action) => {
            state.status = "connecting";
        },

        wsConnected: (state, action) => {
            state.connected = true;
            state.status = "connected";
            state.socket_id = action.payload.socket_id;
        },

        wsDisconnect: (state, action) => {
            state.connected = false;
            state.status = "disconnect";
        },

        wsDisconnected: (state, action) => {
            state.connected = false;
            state.status = "disconnect";
            state.reconnected = true;
        },

        wsReconnected: (state, action) => {
            state.connected = true;
            state.status = "connected";
            state.reconnected = true;
        },

        wsSetStatus: (state, action) => {
            state.status = action.payload;
        },

        wsSetAutoReconnect: (state, action) => {
            state.autoReconnect = action.payload;
        },

        wsJoinRoom: (state, action) => {
            state.socket_room_ids.push(action.payload);
        },

        wsLeaveRoom: (state, action) => {
            let ids = state.socket_room_ids.filter(
                (item) => item !== action.payload
            );
            state.socket_room_ids = ids;
        },

        wsEmit: (state, action) => {
            state.last_socket_emit = action.payload;
        },
    },
});

export const {
    wsConnect,
    wsConnected,
    wsDisconnect,
    wsDisconnected,
    wsReconnected,
    wsSetStatus,
    wsSetAutoReconnect,
    wsJoinRoom,
    wsLeaveRoom,
    wsEmit,
} = WebSocketSlice.actions;

export default WebSocketSlice;
