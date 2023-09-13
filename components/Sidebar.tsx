import { useTypedSelector } from '@/hooks/useTypedSelector'
import { IoMdArrowForward } from 'react-icons/io'
import { FiTrash2 } from 'react-icons/fi'
import { useDispatch } from 'react-redux'
import { setSidebarState } from '@/store/reducers/sidebarSlice'
import CartItem from './CartItem'
import { ICart } from '@/models/models'
import { useActions } from '@/hooks/redux'
import Link from 'next/link'



const Sidebar = () => {
  const isOpen = useTypedSelector((state) => state.sidebar) // ok200
  const cart: ICart[] = useTypedSelector((state) => state.cart)
  const { clearCard } = useActions()
  const dispatch = useDispatch()
  const cartAmount = cart.reduce((accumulator, currentItem) => {
    return +accumulator + +currentItem.count
  }, 0)
  const total = cart.reduce((accumulator, currentItem) =>{
    return +accumulator + (currentItem.count * currentItem.price)
  },0)

  return (
    <div
      className={`${
        isOpen ? 'right-0' : '-right-full'
      }  w-full bg-white fixed top-0 h-full shadow-2xl md:w-[35vw] xl:max-w-[30vw] transition-all duration-300 z-20 px-4 lg:px-[35px]`}
    >
      <div className="flex items-center justify-between py-6 border-b ">
        <div className="uppercase text-sm font-semibold">
          Корзина ({cartAmount})
        </div>
        
        <div
          onClick={() => {
            dispatch(setSidebarState())
          }}
          className="cursor-pointer w-8 h-8 flex justify-center items-center"
        >
          <IoMdArrowForward className="text-2xl" />
        </div>
      </div>
      <div className=" flex flex-col gap-y-2 h-[400px] overflow-y-auto overflow-x-hidden border-b"> 
        {cart.map((item: ICart) => {
          return <CartItem key={item.id} item={item} />
        })}
      </div>
      <div className=" flex flex-col gap-y-3 py-4 mt-4 ">
        <div className=" flex w-full justify-between items-center">
          
          <div className="uppercase font-semibold">
            <span className="mr-2">Total:</span>$ {total}
          </div>
          
          <div
            onClick={() => clearCard()}
            className="cursor-pointer py-4 bg-red-500 text-white 
                w-12 h-12 flex justify-center items-center text-xl"
          >
            <FiTrash2 />
          </div>
        </div>
        <Link href={'/'} className='bg-primary flex p-4 justify-center items-center text-white w-full font-medium'  >
            Оформить заказ
        </Link> 
      </div>
    </div>
  )
}

export default Sidebar
