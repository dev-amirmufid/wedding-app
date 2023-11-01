import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import Serialize from "@/Helpers/Serialize";

const base = "invitations";
const tag = "invitations";

const InvitationsApi = createApi({
    reducerPath: "InvitationsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BASE_URL}/api/`,
    }),
    tagTypes: ["invitations"],
    endpoints: (builder) => ({
        getInvitationList: builder.query({
            query: (params) => ({
                url: `${base}?${Serialize(params)}`,
            }),
            providesTags: [`${tag}`],
        }),
        getInvitation: builder.query({
            query: (params) => ({
                url: `${base}/${params.id}`,
            }),
            providesTags: [`${tag}`],
        }),
        storeInvitation: builder.mutation({
            query: (params) => ({
                url: `${base}`,
                method: "POST",
                body: params,
            }),
            invalidatesTags: [`${tag}`],
        }),

        updateInvitation: builder.mutation({
            query: (params) => ({
                url: `${base}/${params.id}`,
                method: "PUT",
                body: params,
            }),
            invalidatesTags: [`${tag}`],
        }),

        updateInvitationDeliveredStatus: builder.mutation({
            query: (params) => ({
                url: `${base}/update-delivered/${params.id}`,
                method: "PUT",
                body: params,
            }),
        }),

        deleteInvitation: builder.mutation({
            query: (params) => ({
                url: `${base}/${params.id}`,
                method: "DELETE",
                body: params,
            }),
            invalidatesTags: [`${tag}`],
        }),
    }),
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
});

export const {
    useGetInvitationListQuery,
    useGetInvitationQuery,
    useStoreInvitationMutation,
    useUpdateInvitationMutation,
    useUpdateInvitationDeliveredStatusMutation,
    useDeleteInvitationMutation,
} = InvitationsApi;

export default InvitationsApi;
