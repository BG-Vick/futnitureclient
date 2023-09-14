import Product from '@/components/Product'
import { useEffect, useState } from 'react'
import { deleteOneDevice, fetchAllDevice } from '@/store/typesApi'
import AdminHeader from '@/components/AdminHeader'
import Footer from '@/components/Footer'
import AdminProduct from '@/components/AdminProduct'
import AdminLayout from '@/components/AdminLayout'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { wrapper } from '@/store/store'
import { parseCookies } from 'nookies'
import { check } from '@/store/fakeHTTP'
import { setUserState } from '@/store/reducers/userSlice'
import { useRouter } from 'next/router'
import Layout from '@/components/Layout'
import Link from 'next/link'




export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (ctx) => {
    try {
      const { token } = parseCookies(ctx)
      const userData = await check(token)
      store.dispatch(setUserState(userData))
    } catch (e) {
      console.log(e)
      return { props: {} }
    }
    return { props: {} }
  })



const Admin = ({}) => {

  const [products, setProducts] = useState([])
  const [count, setCount] = useState(5)
  const user = useTypedSelector(state => state.user)
  console.log(user)
  
  





  useEffect(() => {
    fetchAllDevice({ limit: count })
      .then((data) => {
        setProducts(data.rows)
        setCount(data.count)
      })
      .catch((e) => console.log(e))
  }, [count])



  
  const handleRemoveProduct = async (id: number, img:string) => {
    await deleteOneDevice(id, img)
    fetchAllDevice({ limit: count })
      .then((data) => {
        setProducts(data.rows)
        setCount(data.count)
      })
      .catch((e) => console.log(e))
  }
  console.log(user)
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
    <div className="flex flex-col h-screen items-center">
      <AdminHeader />
      <section className="pt-[30vh] pb-[5vh] grow flex  ">
        <div className="">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0 ">
            {products.map((product: any) => {
              return <AdminProduct key={product.id} product={product}  handleRemoveProduct={handleRemoveProduct}/>
            })}
          </div>
        </div>
      </section>
      <div className='w-full'>
        <Footer />
      </div>
      
    </div>
  )
}

export default Admin



