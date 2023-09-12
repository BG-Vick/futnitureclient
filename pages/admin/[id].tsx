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


export const getServerSideProps = async (ctx: any) => {
  const { id } = ctx.params
  const product = await fetchOneDevice(id)
  const types = await fetchTypes()
  const brands = await fetchBrands()
  return { props: {
    product,
    types,
    brands
  } }
}





/////////////////////////////////////////////////////////////////////////






const OneProduct = ({ product, types, brands }: any) => {
  const [edit, setEdit] = useState(false)
  
  const { name, price, img, info, brandId, typeId, id} = product

  const actualType = types.find(type => type.id === typeId)
  const actualBrand = brands.find(brand => brand.id === brandId)
  



  return (
    <>
    {!edit && <AdminHeader/>}
    <div>
    <section className=" pt-32 lg:py-32 flex items-center">
      <div className="container mx-auto ">
        
        <div className='flex flex-col lg:flex-row items-center'>
         
          <div className='flex flex-1 justify-center items-center mb-8 lg:mb-0 '>
          <Image
            //className='max-w-[200px] lg:max-w-sm '
            src={'http://localhost:7000/' + img}
            alt="Picture of the author"
            width="0"
            height="0"
            sizes="100vw"
            className="w-full h-auto lg:max-w-sm "
          />
          </div>
          
          <div className='flex-1 text-center lg:text-left'>
            <h1 className='text-[26px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0'>{name}</h1>
            <div className='text-xl text-red-500 font-medium mb-6'>$ {price}</div>
            <div className='mb-8 border'>{info.map(i => 
              <div key={i.id}>
                <p> Хар-ка: {i.title}</p>
                <p>Опис-е: {i.description}</p>
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
        <div className=''>
          


         {edit && <EditForms
                types={types}
                brands={brands}
                actualType={actualType}
                actualBrand={actualBrand}
                setEdit={setEdit}
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