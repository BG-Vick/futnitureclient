import { useState } from 'react'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { IoMdArrowForward } from 'react-icons/io'
import { FiTrash2 } from 'react-icons/fi'
import { useDispatch } from 'react-redux'
import { setSidebarState } from '@/store/reducers/sidebarSlice'
import CartItem from './CartItem'
import { ICart } from '@/models/models'
import { useActions } from '@/hooks/redux'
import { ModalSendOrder } from './ModalSendOrder'
import clsx from 'clsx'



const Sidebar = () => {

  const [modalVisible, setModalVisible] = useState(false)
  const isOpen = useTypedSelector((state) => state.sidebar)
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
          className="cursor-pointer w-10 h-10 border border-black flex justify-center items-center rounded-lg  hover:bg-gray-300 animate-bounce"
        >
          <IoMdArrowForward className="text-2xl text-black w-6 h-6" />
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
            <span className="mr-2">Total:</span>{total} ₽
          </div>
          
          <div
            onClick={() => clearCard()}
            className={clsx(cart.length && 'bg-red-500 hover:bg-red-800 cursor-pointer', 'bg-gray-300  py-4   text-white w-12 h-12 flex justify-center items-center text-xl')}
          >
            <FiTrash2 />
          </div>
        </div>
        <button 
        disabled={!cart.length}
        onClick={() => {setModalVisible(true)}}
        className={clsx(cart.length ? 'bg-white text-black border-black border-2 hover:bg-primary hover:text-white' : 'text-white', 'bg-gray-300 flex p-4 justify-center items-center  w-full font-medium'  )}>
            Оформить заказ
        </button>
      </div>
      <ModalSendOrder isVisible={modalVisible} onClose={setModalVisible} cart={cart}/>
    </div>
  )
}

export default Sidebar
