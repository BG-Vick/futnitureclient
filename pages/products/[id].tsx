import { useTypedSelector } from '@/hooks/useTypedSelector'
import axios from 'axios'
import Image from 'next/image'
import { ICart } from '@/models/models'
import { useActions } from '@/hooks/redux'
import Layout from '@/components/Layout'
import { getAllProducts } from '@/store/fakeHTTP'
import { fetchOneDevice } from '@/store/typesApi'




export const getServerSideProps = async (ctx: any) => {
  const { id } = ctx.params
  const product = await fetchOneDevice(id)
  return { props: { product } }
}



const OneProduct = ({ product }: any) => {
  
  const cart = useTypedSelector((state) => state.cart)
  const { addItem } = useActions()

  const alreadyInCart = cart.some((item) => item.id === product?.id)
  function handleAddIntoCart(product: ICart) {
    
    if (!alreadyInCart) {
      addItem(product)
    } else{
      return
    }
  }
  
  const { name, price, img, info} = product
  return (
    <Layout>
    <section className=" pt-[15vh] min-h-screen mb-20 flex items-center">
      <div className="container mx-auto">
        
        <div className='flex flex-col lg:flex-row items-center gap-5 '>
          <div className='flex flex-1 justify-center items-center mb-8 lg:mb-0'>
          <Image
              className="w-full h-full   max-w-[300px] lg:max-w-md sm:max-w-[350px] object-cover"
              src={`http://${process.env.NEXT_PUBLIC_DB_HOST}:${process.env.NEXT_PUBLIC_PORT}/` + img}
              width={400}
              height={400}
              alt="product"
              priority
            />  
          </div>
          
          <div className=' text-center lg:text-left flex-1 '>
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
            <button onClick={() => handleAddIntoCart({...product})} className={`${alreadyInCart ? 'bg-gray-300 text-gray-200' : 'bg-primary py-4 px-8 text-white'}bg-primary py-4 px-8 text-white`}>
              Add to cart</button>
          </div>
        </div>
      </div>
    </section>
    </Layout>
  )

}

export default OneProduct

