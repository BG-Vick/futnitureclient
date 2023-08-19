import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IDevices, IDevice } from '@/models/models'

export const deviceApi = createApi({
  reducerPath: 'devicesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:7000/api' }),
  tagTypes: ['Device'],
  endpoints: (build) => ({
    getAllDevices: build.query<IDevices, number>({
      query: (limit: number) => ({
        url: 'device',
        params: {
          limit: limit,
        },
      }),
      providesTags: (result) => ['Device'],
    }),
    createDevice: build.mutation<IDevice, IDevice>({
      query: (post) => ({
        url: 'products',
        method: 'POST',
        body: post,
      }),
      invalidatesTags: ['Device'],
    }),
    updateDevice: build.mutation<IDevice, IDevice>({
      query: (post) => ({
        url: `products/${post.id}`,
        method: 'PUT',
        body: post,
      }),
      invalidatesTags: ['Device'],
    }),
    deleteDevice: build.mutation<IDevice, IDevice>({
      query: (post) => ({
        url: `products/${post.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Device'],
    }),
  }),
})


export const {
  useGetAllDevicesQuery,
  useCreateDeviceMutation,
  useUpdateDeviceMutation,
  useDeleteDeviceMutation
} = deviceApi
