import { configureStore } from "@reduxjs/toolkit";
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from "@reduxjs/toolkit/query";
import EventsApi from "./Services/Events";
import InvitationsApi from "./Services/Invitations";
import WaTemplateApi from "./Services/WaTemplate";
import WebSocketSlice from "./Features/WebSocketSlice";
import WaServerSlice from "./Features/WaServerSlice";
import SocketMiddleware from "./Middleware/SocketMiddleware";

const Store = configureStore({
    reducer: {
        // Add the generated reducer as a specific top-level slice
        [WebSocketSlice.name]: WebSocketSlice.reducer,
        [WaServerSlice.name]: WaServerSlice.reducer,
        [EventsApi.reducerPath]: EventsApi.reducer,
        [InvitationsApi.reducerPath]: InvitationsApi.reducer,
        [WaTemplateApi.reducerPath]: WaTemplateApi.reducer,
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
            .concat(EventsApi.middleware)
            .concat(InvitationsApi.middleware)
            .concat(WaTemplateApi.middleware)
            .concat(SocketMiddleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(Store.dispatch);

export default Store;
