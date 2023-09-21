// @ts-nocheck
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { setCookie, destroyCookie } from 'nookies'
import { IQuery } from '@/models/models'


//////////////////////////////////////////////////          Get  cookie                   ///////////////////////////////////////////////////////

export function getCookie(name: string) {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts?.pop().split(';').shift()
}


//////////////////////////////////////////////////            Config                  ///////////////////////////////////////////////////////

export const $authHost = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
})

export const $host = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
})

export const authInterceptor = (config: any) => {
  config.headers.authorization = `Bearer ${getCookie('token')}`
  return config
}

$authHost.interceptors.request.use(authInterceptor)



//////////////////////////////////////////////////            User                 ///////////////////////////////////////////////////////



export const registration = async (email: string, password: string) => {
  const { data } = await $host.post('api/user/registration', {
    email,
    password,
    role: 'ADMIN',
  })
  return jwt_decode(data.token)
}

export const login = async (email: string, password: string) => {
  const { data } = await $host.post('api/user/login', { email, password })
  setCookie(null, 'token', data.token, {
    maxAge: 30 * 24 * 60 * 60,
  })
  return jwt_decode(data.token)
}

export const logout = () => {
  destroyCookie(null, 'token')
}

export const check = async (token: string) => {
  const { data } = await $host.get('api/user/auth', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  setCookie(null, 'token', data.token, {
    maxAge: 30 * 24 * 60 * 60,
  })
  return jwt_decode(data.token)
}



export const getAllProducts = async ({
  typeId,
  brandId,
  page,
  limit,
  name,
}: IQuery) => {
  const { data } = await $host.get('/api/device', {
    params: {
      typeId,
      brandId,
      page,
      limit,
      name,
    },
  })
  return data
}







//////////////////////////////////////////////////            Type                   ///////////////////////////////////////////////////////

export const createType = async (type: { name: string }) => {
  const { data } = await $authHost.post('api/types', type)
  return data
}

export const fetchTypes = async () => {
  const { data } = await $host.get('api/types')
  return data
}

export const deleteType = async (id: number) => {
  const { data } = await $authHost.delete(`api/types/${id}`)
  return data
}

export const updateType = async (name: string, id: number) => {
  const { data } = await $authHost.patch('api/types', {
    name,
    id,
  })
  return data
}

//////////////////////////////////////////////////             Brand                   ///////////////////////////////////////////////////////

export const createBrand = async (brand: { name: string }) => {
  const { data } = await $authHost.post('api/brand', brand)
  return data
}

export const fetchBrands = async () => {
  const { data } = await $host.get('api/brand')
  return data
}

export const deleteBrand = async (id: number) => {
  const { data } = await $authHost.delete(`api/brand/${id}`)
  return data
}

export const updateBrand = async (name: string, id: number) => {
  const { data } = await $authHost.patch('api/brand', {
    name,
    id,
  })
  return data
}

//////////////////////////////////////////////////             Info                   /////////////////////////////////////////////////////////////

export const deleteInfo = async (id: number) => {
  const { data } = await $authHost.delete(`api/info/${id}`)
  return data
}

//////////////////////////////////////////////////             Device                   ////////////////////////////////////////////////////

export const createDevice = async (device: FormData) => {
  const { data } = await $authHost.post('api/device', device)
  return data
}

export const updateDevice = async (device: FormData) => {
  const { data } = await $authHost.patch('api/device', device)
  return data
}

export const fetchAllDevice = async ({
  brandId = '',
  typeId = '',
  limit = 9,
  page = 1,
}) => {
  const { data } = await $host.get('api/device', {
    params: {
      brandId: '',
      typeId: '',
      limit,
      page,
    },
  })
  return data
}

export const fetchOneDevice = async (id: number) => {
  const { data } = await $host.get(`api/device/${id}`)
  return data
}

export const deleteOneDevice = async (id: number, img: string) => {
  const { data } = await $authHost.delete(`api/device/ ${id}`, {
    data: {
      img,
    },
  })
  console.log(data)
  return data
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



