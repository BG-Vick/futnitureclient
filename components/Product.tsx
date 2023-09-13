import { BsPlus, BsEyeFill } from 'react-icons/bs'
import Image from 'next/image'
import Link from 'next/link'
import { useActions } from '@/hooks/redux'
import { ICart } from '@/models/models'
import { useTypedSelector } from '@/hooks/useTypedSelector'

const Product = ({ product }: any) => {
  const cart = useTypedSelector((state) => state.cart)

  const alreadyInCart = cart.some((item) => item.id === product.id)
  function handleAddIntoCart(product: ICart) {
    if (!alreadyInCart) {
      addItem(product)
    } else {
      return
    }
  }

  const { addItem, removeItem, countDecrement, countIncrement } = useActions()
  const { id, img, brandId, name, price } = product

  return (
    <div >
      <div className="border border-[#e4e4e4] h-[300px] mb-4 relative overflow-hidden group transition ">
        <div className="w-full h-full flex justify-center items-center ">
           <div className="w-[200px] mx-auto flex justify-center items-center ">
            <Image
              className="group-hover:scale-110 transition duration-300 object-cover"
              src={'http://localhost:7000/' + img}
              width={400}
              height={400}
              alt="product"
              
            />
          </div>
        </div>
        
        <div
          className="absolute top-6 -right-11 group-hover:right-5  p-2 flex flex-col 
                        items-center justify-center gap-y-2 opacity-0 group-hover:opacity-100 
                        transition-all duration-300"
        >
          <button onClick={() => handleAddIntoCart({ ...product })}>
            <div
              className={`${
                alreadyInCart ? 'bg-gray-300 text-gray-200' : 'bg-red-500 text-white'
              } flex justify-center items-center  w-12 h-12 `}
            >
              <BsPlus className="text-3xl" />
            </div>
          </button>
          <Link
            href={`/products/${id}`}
            className="w-12 h-12 bg-white flex justify-center items-center text-primary drop-shadow-xl"
          >
            <BsEyeFill />
          </Link>
        </div>
      </div>
      <div>
        <div className="text-sm capitalize text-gray-500 mb-1">
          {brandId === 1 ? 'Samsung' : 'Apple'}
        </div>
        <Link href={`/products/${id}`}>
          <h2 className="font-semibold mb-1">{name}</h2>
        </Link>
        <div className="font-semibold">$ {price}</div>
      </div>
    </div>
  )
}

export default Product
