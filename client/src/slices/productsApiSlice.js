import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";


const PRODUCTS_URL='/api/products';

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        create: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}`,
                method: 'POST',
                body: data
            })
        })
    })
})

export const { useCreateMutation } = productsApiSlice;