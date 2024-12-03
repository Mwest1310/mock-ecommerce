import { apiSlice } from './apiSlice';

const USERS_URL = '/api/users';

// Allows the client to interact with the users API
export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: 'POST',
                body: data
            })
        }),
        signup: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: 'POST',
                body: data
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST'
            })
        })
    })
});

export const { useLoginMutation, useLogoutMutation, useSignupMutation } = usersApiSlice;