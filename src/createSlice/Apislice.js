// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// Define a base URL for API requests.
export const api = createApi({
  reducerPath: "api",
  tagTypes: ["Products"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1/ecommerce",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (page) => `/products?page=${page}&limit=20`,
      providesTags: ["Products"],
      // Only have one cache entry because the arg always maps to one string
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems) => {
      
          currentCache.data.products.push(...newItems.data.products);
       
      },
      
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
  }),
});
export const { useGetAllProductsQuery } = api;
