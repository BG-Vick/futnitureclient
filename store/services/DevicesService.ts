import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IDevices, IDevice, IQuery } from '@/models/models'

export const deviceApi = createApi({
  reducerPath: 'devicesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:7000/api' }),
  tagTypes: ['Device'],
  endpoints: (build) => ({
    getAllDevices: build.query<IDevices, IQuery>({ 
    query: ({limit =2, page =1, brandId, typeId}) => ({
        url: 'device',
        params: {
          limit: limit,
          page: page,
          // КОСТЫЛЬ ДЛЯ brandId И typeId Я ПЕРЕДАЮ ПУСТУЮ СТРОКУ, ЧТОБЫ ОНА НЕ ВЫЗЫВАЛА "NULL"   getOne
          brandId: brandId,
          typeId: typeId
        },
      }), 
      providesTags: (result) => ['Device'],
    }),
    getOneDevice: build.query<IDevice, number>({ 
      query: (id: number) => ({
          url: `device/${id}`,
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
  useGetOneDeviceQuery,
  useCreateDeviceMutation,
  useUpdateDeviceMutation,
  useDeleteDeviceMutation
} = deviceApi
