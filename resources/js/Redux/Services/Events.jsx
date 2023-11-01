import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import Serialize from "@/Helpers/Serialize";

const base = "events";
const tag = "events";

const EventsApi = createApi({
    reducerPath: "EventsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BASE_URL}/api/`,
    }),
    tagTypes: ["events"],
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    endpoints: (builder) => ({
        getEventList: builder.query({
            query: (params) => ({
                url: `${base}?${Serialize(params)}`,
            }),
            providesTags: [`${tag}`],
        }),
        getEvent: builder.query({
            query: (params) => ({
                url: `${base}/${params.id}`,
            }),
            providesTags: [`${tag}`],
        }),
        getEventDashboard: builder.query({
            query: (params) => ({
                url: `${base}/dashboard/${params.id}`,
            }),
            providesTags: [`${tag}`],
        }),

        storeEvent: builder.mutation({
            async queryFn(params, _queryApi, _extraOptions, fetchWithBQ) {
                // upload with multipart/form-data
                const formData = new FormData();
                Object.keys(params).forEach((key) => {
                    formData.append(key, params[key]);
                });
                const response = await fetchWithBQ(
                    {
                        url: `${base}/store`,
                        method: "POST",
                        body: formData,
                    },
                    _queryApi,
                    _extraOptions
                );
                return response;
            },
        }),

        updateEvent: builder.mutation({
            async queryFn(params, _queryApi, _extraOptions, fetchWithBQ) {
                // upload with multipart/form-data
                const formData = new FormData();
                Object.keys(params).forEach((key) => {
                    formData.append(key, params[key]);
                });
                const response = await fetchWithBQ(
                    {
                        url: `${base}/update/${params.id}`,
                        method: "POST",
                        body: formData,
                    },
                    _queryApi,
                    _extraOptions
                );
                return response;
            },
        }),

        deleteEvent: builder.mutation({
            query: (params) => ({
                url: `${base}/${params.id}`,
                method: "DELETE",
                body: params,
            }),
            invalidatesTags: [`${tag}`],
        }),
    }),
});

export const {
    useGetEventListQuery,
    useGetEventDashboardQuery,
    useGetEventQuery,
    useStoreEventMutation,
    useUpdateEventMutation,
    useDeleteEventMutation,
} = EventsApi;

export default EventsApi;
