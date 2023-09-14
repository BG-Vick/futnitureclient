import Link from 'next/link'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { setSidebarState } from '@/store/reducers/sidebarSlice'
import { useDispatch } from 'react-redux'
import { BsBag } from 'react-icons/bs'
import { BiLogoBaidu } from 'react-icons/bi'
import Logo from '@/public/logo (1).svg'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import clsx from 'clsx'


const Header = () => {
  const [isActive, setIsActive] = useState(false)
  const dispatch = useDispatch()
  const cart = useTypedSelector((state) => state.cart)
  const cartAmount = cart.reduce((accumulator, currentItem)=>{
    return +(accumulator) + +(currentItem.count);
  }, 0)

  const { pathname } = useRouter()
  
  const activeLink = {
    home:'/',
    products:'/products',
    admin:'/auth'
  }

  useEffect(() => {
   window.addEventListener('scroll', () => {
    window.scrollY > 60 ? setIsActive(true) : setIsActive(false)
   })
  }, [])
  

  return (
    <header className={`${isActive ? 'bg-white py-4 shadow-md' : 'bg-none py-6'} fixed w-full z-10 transition-all`}>
      <div className='container mx-auto flex items-center justify-between h-full '>
      <Link
      className='cursor-pointer'
      href={'/'}>
          <div>
          <Image
            className='w-[40px] '
            src={Logo}
            alt="Picture of the author"
          />
          </div>
      </Link>
      <Link
      className={clsx(activeLink.home === pathname && 'bg-blue-200', 'cursor-pointer hover:bg-gray-100 p-4 rounded-lg')}
      href={'/'}>
        Home
      </Link>
      <Link
      className={clsx(activeLink.products === pathname && 'bg-blue-200', 'cursor-pointer hover:bg-gray-100 p-4 rounded-lg')}
      href={'/products'}>
        Products
      </Link>
      <Link
      className={clsx(activeLink.admin === pathname && 'bg-blue-200', 'cursor-pointer hover:bg-gray-100 p-4 rounded-lg')}
      href={'/auth'}>
        Authorization
      </Link>
      <div
        onClick={() => {
          dispatch(setSidebarState())
        }}
        className="cursor-pointer flex relative "
      >
        <BsBag className="text-2xl" />
        <div className="bg-red-500 absolute -right-2 -bottom-2 text-[12px] w-[18px] h-[18px]
         text-white rounded-full flex justify-center items-center">
          {cartAmount}
        </div>
      </div>
      </div>
    </header>
  )
}

export default Header
