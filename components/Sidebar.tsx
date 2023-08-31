import { useTypedSelector } from '@/hooks/useTypedSelector'
import { IoMdArrowForward } from 'react-icons/io'
import { useDispatch } from "react-redux";
import { setSidebarState } from "@/store/reducers/sidebarSlice";
import CartItem from './CartItem';
import { ICart } from '@/models/models';


const Sidebar = () => {
  const isOpen = useTypedSelector((state) => state.sidebar) // ok200
  const cart: ICart[] = useTypedSelector((state) => state.cart)
  
  const dispatch = useDispatch();
  return (
    <div
      className={`${
        isOpen ? 'right-0' : '-right-full'
      } w-full bg-white fixed top-0 h-full shadow-2xl md:w-[35vw] xl:max-w-[30vw] transition-all duration-300 z-20 px-4 lg:px-[35px]`}
    >
      <div className='flex items-center justify-between py-6 border-b'>
        <div className='uppercase text-sm font-semibold'>Shopping bag (0)</div>
        {/*   icon */}
        <div onClick={() => {dispatch(setSidebarState())}} className='cursor-pointer w-8 h-8 flex justify-center items-center'>
          <IoMdArrowForward className='text-2xl'/>
        </div>
      </div>
      <div>{cart.map((item: ICart) => {
        return <CartItem key={item.id} item={item}/>
      })
      }</div>
    </div>
  )
}

export default Sidebar
