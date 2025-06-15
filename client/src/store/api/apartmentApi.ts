import { Apartment, AptFilter, AptDto } from "@/lib/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apartmentApi = createApi({
  reducerPath: "apartmentApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,  }),
  tagTypes: ["Apartment"],
  endpoints: (builder) => ({
    getAllApartments: builder.query<Apartment[], AptFilter>({
      query: (params) => ({
        url: "/apartments",
        method: "GET",
        params,
      }),
      providesTags: ["Apartment"],
    }),

    getApartmentById: builder.query<Apartment, string>({
      query: (id: string) => `/apartments/${id}`,
      providesTags: (result, error, id) => [{ type: "Apartment", id }],
    }),

    createApartment: builder.mutation<Apartment, AptDto>({
      query: (data) => ({
        url: "/apartments",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Apartment"],
    }),

    addApartmentImages: builder.mutation<
      Apartment,
      { id: string; files: File[] }
    >({
      query: ({ id, files }) => {
        const formData = new FormData();
        files.forEach((file) => formData.append("images", file));
        return {
          url: `/apartments/${id}/images`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: (res, err, { id }) => [{ type: "Apartment", id }],
    }),

    deleteApartmentImage: builder.mutation<
      Apartment,
      { id: string; imageUrl: string }
    >({
      query: ({ id, imageUrl }) => ({
        url: `/apartments/${id}/images`,
        method: "DELETE",
        body: { imageUrl },
      }),
      invalidatesTags: (res, err, { id }) => [{ type: "Apartment", id }],
    }),

    updateApartment: builder.mutation<Apartment, { id: string; data: AptDto }>({
      query: ({ id, data }) => ({
        url: `apartments/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Apartment"],
    }),

    deleteApartment: builder.mutation<boolean, string>({
      query: (id) => ({
        url: `apartments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Apartment"],
    }),
  }),
});

export const {
  useGetAllApartmentsQuery,
  useGetApartmentByIdQuery,
  useCreateApartmentMutation,
  useAddApartmentImagesMutation,
  useDeleteApartmentImageMutation,
  useUpdateApartmentMutation,
  useDeleteApartmentMutation,
} = apartmentApi;
