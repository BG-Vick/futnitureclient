import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import { config } from 'process'

export function getCookie(name: string) {
  // нужно будет написать предупреждение в футере или для одмена.
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop().split(';').shift()
}

export const $host = axios.create({
  baseURL: 'http://localhost:7000',
})





export const registration = async (email:string, password:string) => {
  const { data } = await $host.post('api/user/registration', {
    email,
    password,
    role: 'ADMIN',
  })
  return jwt_decode(data.token)
}

export const login = async (email:string, password:string) => {
  const { data } = await $host.post('api/user/login', { email, password })
  setCookie(null, 'token', data.token, {
    maxAge: 30 * 24 * 60 * 60,
  })
  return jwt_decode(data.token)
}


export const logout = () => {
  destroyCookie(null, 'token')
}



export const check = async (token: any) => {

    const { data } = await $host.get('api/user/auth', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    setCookie(null, 'token', data.token, {
      maxAge: 30 * 24 * 60 * 60,
    })
    return jwt_decode(data.token)
    
}


export const getAllProducts = async () => {
  const { data } = await $host.get('/api/device')
  return data
} 



//`Bearer ${localStorage.getItem('token')}`
//localStorage.setItem('token', data.token)
//localStorage.setItem('token', data.token)
//localStorage.removeItem('token');


/* export const authInterceptor = (config) => {
  config.headers.authorization = `Bearer ${getCookie('token')}`
  return config
}

$authHost.interceptors.request.use(authInterceptor) */


/* export const check = async () => {
  const { data } = await $authHost.get('api/user/auth')
  setCookie(null, 'token', data.token, {
    maxAge: 30 * 24 * 60 * 60,
  })
  return jwt_decode(data.token)
} */

/* export const $authHost = axios.create({
  baseURL: 'http://localhost:7000',
}) */