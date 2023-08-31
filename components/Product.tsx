import { BsPlus, BsEyeFill } from 'react-icons/bs'
import Image from 'next/image'
import Link from 'next/link'
import { useActions } from '@/hooks/redux'
import { ICart } from '@/models/models'
import { useTypedSelector } from '@/hooks/useTypedSelector'


const Product = ({ product }: any) => {
  console.log(product)
  const cart = useTypedSelector((state) => state.cart)


  function handleAddIntoCart(product: ICart) {
    console.log(product)
    const alreadyIntoCart = cart.some((item) => item.id === product.id)
    if (!alreadyIntoCart) {
      addItem(product)
    } else{
      countIncrement(product)
    }
  }

  const {addItem, removeItem, countDecrement,countIncrement} = useActions()
  const { id, img, brandId, name, price } = product
  return (
    <div>
      <div className="border border-[#e4e4e4] h-[300px] mb-4 relative overflow-hidden group transition">
        <div className="w-full h-full flex justify-center items-center">
          {/* image */}
          <div className="w-[200px] mx-auto flex justify-center items-center">
            <Image
              className="max-h-[160px] group-hover:scale-110 transition duration-300"
              src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
              width={160}
              height={160}
              alt="Picture of the author"
              priority
            />
          </div>
        </div>
        {/* buttons */}
        <div
          className="absolute top-6 -right-11 group-hover:right-5  p-2 flex flex-col 
                        items-center justify-center gap-y-2 opacity-0 group-hover:opacity-100 
                        transition-all duration-300"
        >
          <button onClick={() => handleAddIntoCart(product)}>
            <div className="flex justify-center items-center text-white w-12 h-12 bg-red-500">
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
      {/* category & title & price */}
      <div>
        <div className='text-sm capitalize text-gray-500 mb-1'>{brandId === 1 ? 'Samsung' : 'Apple'}</div>
        <Link href={`/products/${id}`}>
          <h2 className='font-semibold mb-1'>{name}</h2>
        </Link>
        <div className='font-semibold'>$ {price}</div>
      </div>
    </div>
  )
}

export default Product
