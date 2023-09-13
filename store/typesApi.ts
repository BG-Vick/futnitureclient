import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import { config } from 'process'
import { getCookie } from './fakeHTTP'


export const $authHost = axios.create({
    baseURL: 'http://localhost:7000',
  })

export const $host = axios.create({
  baseURL: 'http://localhost:7000',
})

export const authInterceptor = (config) => {
    config.headers.authorization = `Bearer ${getCookie('token')}`
    return config
  }

$authHost.interceptors.request.use(authInterceptor)


//////////////////////////////////////////////////            Type                   ///////////////////////////////////////////////////////


export const createType = async (type) => {
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


export const updateType = async (name: string, id: number) => {   //working!!!
  const { data } = await $authHost.patch('api/types', {
    name,
    id
  })
  return data
}



//////////////////////////////////////////////////             Brand                   ///////////////////////////////////////////////////////



export const createBrand = async (brand) => {
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
      id
    })
    return data
  }



//////////////////////////////////////////////////             Info                   /////////////////////////////////////////////////////////////




export const createInfo = async (information: any, id: number) => {  
  const { data } = await $authHost.post('api/info', {
    info: information,
    id
  })
  return data
}

export const deleteInfo = async (id: number) => {
  const { data } = await $authHost.delete(`api/info/${id}`)
  return data
}



//////////////////////////////////////////////////             Device                   ////////////////////////////////////////////////////



export const createDevice = async (device: any) => {
  const { data } = await $authHost.post('api/device', device)
  return data
}


export const updateDevice = async (device: any) => {
const { data } = await $authHost.patch('api/device', device)
return data
}


export const fetchAllDevice = async ({brandId ='', typeId ='', limit= 9, page=1}) => {
    const { data } = await $host.get('api/device', {
      params: {
        brandId:'',
        typeId:'',
        limit,
        page
      },
    })
    return data
  }

  export const fetchOneDevice = async (id:number) => {
    const { data } = await $host.get(`api/device/${id}`)
    return data
  }

  export const deleteOneDevice = async (id:number, img: string) => {
    const { data } = await $host.delete(`api/device/ ${id}`,{
      data: {
        img
      }
    })
    console.log(data)
    return data
  }



















////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




  //`Bearer ${localStorage.getItem('token')}`
//localStorage.setItem('token', data.token)
//localStorage.setItem('token', data.token)
//localStorage.removeItem('token');


/*  */


/* export const check = async () => {
  const { data } = await $authHost.get('api/user/auth')
  setCookie(null, 'token', data.token, {
    maxAge: 30 * 24 * 60 * 60,
  })
  return jwt_decode(data.token)
} */

/*  */


