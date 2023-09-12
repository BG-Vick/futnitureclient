import { useActions } from '@/hooks/redux'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { ICart } from '@/models/models'
import Image from 'next/image'
import Link from 'next/link'
import { IoMdAdd, IoMdClose, IoMdRemove } from 'react-icons/io'

const CartItem = ({ item }: any) => {
  const cart = useTypedSelector((state) => state.cart)
  const {addItem, removeItem, countDecrement,countIncrement} = useActions()




  function handleRemoveCart(product: ICart) {
    if(product.count < 2){
        removeItem(product)
    } else {
      countDecrement(product)
    }
  }

  const { id, price, name, count, img } = item
  return (
    <div className="flex gap-x-4 py-2 lg:px-6 border-b border-gray-200 w-full font-light text-gray-500">
      <div className="w-full min-h-[150px] flex items-center gap-x-4">
        {/* image */}
        <Link href={`/products/${id}`}>
          <Image
            className="max-h-[80px] group-hover:scale-110 transition duration-300 w-auto h-auto"// w-auto h-auto возможны проблемы
            src={'http://localhost:7000/' + img}
            width={80}
            height={80}
            alt="Picture of the author"
            priority
          />
        </Link>
        <div className="w-full flex flex-col">
          {/* title & remove icon */}
          <div className="flex justify-between mb-2">
            {/* title */}
            <Link
              className="text-sm uppercase font-medium max-w-[240px] text-gray-900 hover:underline"
              href={`/products/${id}`}
            >
              {name}
            </Link>
            {/* remove icon */}
            <div className="text-xl cursor-pointer">
              <IoMdClose onClick={() => removeItem(item)} className="text-gray-500 hover:text-red-500 transition" />
            </div>
          </div>
          <div className=" flex gap-x-2 h-[36px] text-sm">
            {/* qty */}
            <div className="flex flex-1 max-w-[100px]  items-center h-full border text-gray-900 font-medium">
              {/* minus icon */}
              <div onClick={() => handleRemoveCart(item)} className="flex-1 flex justify-center items-center cursor-pointer h-full">
                <IoMdRemove />
              </div>
              {/* amount */}
              <div className="h-full flex justify-center items-center px-2">
                {count}
              </div>
              {/* plus icon */}
              <div onClick={() => countIncrement(item)} className="flex-1 h-full flex justify-center items-center cursor-pointer">
                <IoMdAdd/>
              </div>
            </div>
            {/* item price */}
            <div className='flex-1 flex items-center justify-around'>$ {price}</div>
            {/* final price */}
            {/* make the price at 2 decimals */}
            <div className="flex-1 flex justify-end items-center text-gray-900 font-medium">
              {`$ ${(price * count)}`}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem
