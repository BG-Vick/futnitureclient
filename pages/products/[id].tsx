import { useTypedSelector } from '@/hooks/useTypedSelector'
import axios from 'axios'
import Image from 'next/image'
import { ICart } from '@/models/models'
import { useActions } from '@/hooks/redux'
import Layout from '@/components/Layout'




export const getStaticPaths = async () => {
  const res = await axios.get('http://localhost:7000/api/device')
  const data = res.data.rows
  const paths = data.map(({ id }: any) => ({
    params: { id: id.toString() },
  }))
  return {
    paths,
    fallback: false, // Error handling
  }
}

export const getStaticProps = async (ctx: any) => {
  const { id } = ctx.params
  const res = await axios.get(`http://localhost:7000/api/device/${id}`)
  const product = res.data

  return { props: { product } }
}

const OneProduct = ({ product }: any) => {
  console.log(product)
  
  const cart = useTypedSelector((state) => state.cart)
  const {addItem, removeItem, countDecrement,countIncrement} = useActions()

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
    <section className=" pt-32 pb-12 lg:py-32 h-screen flex items-center">
      <div className="container mx-auto">
        
        <div className='flex flex-col lg:flex-row items-center'>
         
          <div className='flex flex-1 justify-center items-center mb-8 lg:mb-0 '>
          <Image
            className='max-w-[200px] lg:max-w-sm '
            src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
            alt="Picture of the author"
            width={200}
            height={200}
          />
          </div>
          
          <div className='flex-1 text-center lg:text-left'>
            <h1 className='text-[26px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0'>{name}</h1>
            <div className='text-xl text-red-500 font-medium mb-6'>$ {price}</div>
            <p className='mb-8 border'>{info.map(i => 
              <div key={i.id}>
                <p> Хар-ка: {i.title}</p>
                <p>Опис-е: {i.description}</p>
              </div>
            )
            }</p>
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

