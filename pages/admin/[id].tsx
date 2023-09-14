import { useTypedSelector } from '@/hooks/useTypedSelector'
import axios from 'axios'
import Image from 'next/image'
import { ICart } from '@/models/models'
import { useActions } from '@/hooks/redux'
import Layout from '@/components/Layout'
import { fetchBrands, fetchOneDevice, fetchTypes } from '@/store/typesApi'
import { EditForm } from '@/components/EditForm'
import { useState } from 'react'
import EditForms from '@/components/EditForms'
import clsx from 'clsx'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AdminHeader from '@/components/AdminHeader'
import { wrapper } from '@/store/store'
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import { setUserState } from '@/store/reducers/userSlice'
import { check } from '@/store/fakeHTTP'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Link from 'next/link'





/////////////////////////////////////////////////////////////////////////


export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (ctx) => {
    try{
      const { id } = ctx.params
      const product = await fetchOneDevice(id)
      const types = await fetchTypes()
      const brands = await fetchBrands()
      const { token } = parseCookies(ctx)
      const userData = await check(token)
      store.dispatch(setUserState(userData))
      return { props: {
        product,
        types,
        brands
      } }
    }catch(e) {
      console.log(e)
      return {
        props: {}
      }
    }
  }) 



const OneProduct = ({ product, types, brands }: any) => {
  const [edit, setEdit] = useState(false)
  const user = useTypedSelector(state => state.user)
  const router = useRouter()




  if(!product?.name) return <div>Loading...</div>

  const { name, price, img, info, brandId, typeId, id} = product
  const actualType = types.find(type => type.id === typeId)
  const actualBrand = brands.find(brand => brand.id === brandId)

  if(user.role !== 'ADMIN')   return (
    <div className='flex flex-col  justify-center items-center h-screen bg-black'>
      <div className='flex flex-col gap-4'>
      <h3 className='text-2xl text-white'>Войдите как администратор!</h3>
      <Link href="/auth" passHref legacyBehavior>
          <button
          className=' bg-white p-2 border-4 rounded-lg cursor-pointer hover:border-white hover:bg-gray-300 hover:border-4'
          type="button" >
            Return To Home
          </button>
        </Link>
      </div>
  </div>
  )
  return (
    <>
    {!edit && <AdminHeader/>}
    <div>
    <section className=" pt-32 lg:py-32 flex items-center">
      <div className="container mx-auto ">
        
        <div className='flex flex-col lg:flex-row items-center gap-5'>
         
          <div className='flex flex-1 justify-center items-center mb-8 lg:mb-0'>
          <Image
              className="w-[80%] h-auto group-hover:scale-110 transition duration-300 object-cover"
              src={'http://localhost:7000/' + img}
              width={400}
              height={400}
              alt="product"
              priority
            />
          </div>
          
          <div className='flex-1 text-center lg:text-left'>
            <h1 className='text-[26px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0'>{name}</h1>
            <div className='text-xl text-red-500 font-medium mb-6'>$ {price}</div>
            <div className='mb-8 border'>{info.map(i => 
              <div key={i.id}>
                <p> Хар-ка: {i.title}</p>
                <p>Опис-е: {i.description}
                </p>
              </div>
            )
            }</div>
            <button 
                onClick={() => setEdit(!edit)} 
                className={`${ 'bg-primary py-4 px-8 text-white'}bg-primary py-4 px-8 text-white`}
            >
                {clsx(edit ? 'Скрыть' : 'Редактировать' )}
            </button>
          </div>
        </div>
        <div>
          


         {edit && <EditForms
                types={types}
                brands={brands}
                actualType={actualType}
                actualBrand={actualBrand}
                setEdit={setEdit}
                edit={edit}
                name={name}
                price={price}
                info={info}
                id={id}
            />} 
        </div>
      </div>
    </section>
    </div>
    </>
  )

}

export default OneProduct






