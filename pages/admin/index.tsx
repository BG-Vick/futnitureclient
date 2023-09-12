import Product from '@/components/Product'
import { useEffect, useState } from 'react'
import { deleteOneDevice, fetchAllDevice } from '@/store/typesApi'
import AdminHeader from '@/components/AdminHeader'
import Footer from '@/components/Footer'
import AdminProduct from '@/components/AdminProduct'
import AdminLayout from '@/components/AdminLayout'



const Admin = () => {
  const [products, setProducts] = useState([])
  const [count, setCount] = useState(5)

  useEffect(() => {
    fetchAllDevice({ limit: count })
      .then((data) => {
        setProducts(data.rows)
        setCount(data.count)
      })
      .catch((e) => console.log(e))
  }, [count])


  const handleRemoveProduct = async (id: number) => {
    await deleteOneDevice(id)
    fetchAllDevice({ limit: count })
      .then((data) => {
        setProducts(data.rows)
        setCount(data.count)
      })
      .catch((e) => console.log(e))
  }

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
