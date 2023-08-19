import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IProduct } from '@/models/models'


export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
  tagTypes: ['Product'],
  endpoints: (build) => ({
    getAllProducts: build.query<IProduct[], number>({
      query: (limit: number = 5) => ({
        url: 'products', 
        params: {
            _limit: limit
        }
    }),
    providesTags: result => ['Product']
    }),
    createProduct: build.mutation<IProduct, IProduct>({
      query: (post) => ({
        url: 'products',
        method: 'POST',
        body: post
    }),
    invalidatesTags: ['Product']
    }),
    updateProduct: build.mutation<IProduct, IProduct>({
      query: (post) => ({
        url: `products/${post.id}`,
        method: 'PUT',
        body: post
    }),
    invalidatesTags: ['Product']
    }),
    deleteProduct: build.mutation<IProduct, IProduct>({
      query: (post) => ({
        url: `products/${post.id}`,
        method: 'DELETE',
    }),
    invalidatesTags: ['Product']
    }),
  }),
})


export const {useGetAllProductsQuery, useCreateProductMutation, useUpdateProductMutation, useDeleteProductMutation} = productApi
