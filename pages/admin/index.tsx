import { useEffect, useState } from 'react'
import { deleteOneDevice, fetchAllDevice } from '@/store/typesApi'
import AdminHeader from '@/components/AdminHeader'
import Footer from '@/components/Footer'
import AdminProduct from '@/components/AdminProduct'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { wrapper } from '@/store/store'
import { parseCookies } from 'nookies'
import { check } from '@/store/typesApi'
import { setUserState } from '@/store/reducers/userSlice'
import Link from 'next/link'
import { IProduct } from '@/models/models'
import type { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (ctx) => {
    try {
      const { token } = parseCookies(ctx)
      const userData = await check(token)
      store.dispatch(setUserState(userData))
    } catch (e) {
      return { props: {} }
    }
    return { props: {} }
  })

const Admin = ({}) => {
  const [products, setProducts] = useState<IProduct[]>([])
  const [count, setCount] = useState(5)
  const user = useTypedSelector((state) => state.user)

  useEffect(() => {
    fetchAllDevice({ limit: count })
      .then((data) => {
        setProducts(data.rows)
        setCount(data.count)
      })
      .catch((e) => console.log(e))
  }, [count])

  const handleRemoveProduct = async (id: number, img: string) => {
    await deleteOneDevice(id, img)
    fetchAllDevice({ limit: count })
      .then((data) => {
        setProducts(data.rows)
        setCount(data.count)
      })
      .catch((e) => console.log(e))
  }

  if (user.role !== 'ADMIN')
    return (
      <div className="flex flex-col  justify-center items-center h-screen bg-black">
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl text-white">Войдите как администратор!</h3>
          <Link href="/auth" passHref legacyBehavior>
            <button
              className=" bg-white p-2 border-4 rounded-lg cursor-pointer hover:border-white hover:bg-gray-300 hover:border-4"
              type="button"
            >
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
            {products.map((product) => {
              return (
                <AdminProduct
                  key={product.id}
                  product={product}
                  handleRemoveProduct={handleRemoveProduct}
                />
              )
            })}
          </div>
        </div>
      </section>
      <div className="w-full">
        <Footer />
      </div>
    </div>
  )
}

export default Admin
