import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import Serialize from "@/Helpers/Serialize";

const base = "wa-blast-template";
const tag = "wa-blast-template";

const WaTemplateApi = createApi({
    reducerPath: "watemplatesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BASE_URL}/api/`,
    }),
    tagTypes: [`${tag}`],
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    endpoints: (builder) => ({
        getWaTemplateByEvents: builder.query({
            query: (params) => ({
                url: `${base}/${params.event_id}`,
            }),
            providesTags: [`${tag}`],
        }),

        storeWaTemplate: builder.mutation({
            query: (params) => ({
                url: `${base}`,
                method: "POST",
                body: params,
            }),
            invalidatesTags: [`${tag}`],
        }),

        updateWaTemplate: builder.mutation({
            query: (params) => ({
                url: `${base}/${params.id}`,
                method: "PUT",
                body: params,
            }),
            invalidatesTags: [`${tag}`],
        }),

        deleteWaTemplate: builder.mutation({
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
    useGetWaTemplateByEventsQuery,
    useStoreWaTemplateMutation,
    useUpdateWaTemplateMutation,
    useDeleteWaTemplateMutation,
} = WaTemplateApi;

export default WaTemplateApi;
