import Link from 'next/link'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { setSidebarState } from '@/store/reducers/sidebarSlice'
import { useDispatch } from 'react-redux'
import { GrLogout } from 'react-icons/gr'
import Logo from '@/public/logo (1).svg'
import Image from 'next/image'
import { useState, useEffect } from 'react'


const AdminHeader = () => {
  const [isActive, setIsActive] = useState(false)
  const dispatch = useDispatch()
  const cart = useTypedSelector((state) => state.cart)
  
  const cartAmount = cart.reduce((accumulator, currentItem)=>{
    return +(accumulator) + +(currentItem.count);
  }, 0)


  useEffect(() => {
   window.addEventListener('scroll', () => {
    window.scrollY > 60 ? setIsActive(true) : setIsActive(false)
   })
  }, [])
  

  return (
    <header className={`${isActive ? 'bg-white py-4 shadow-md' : 'bg-none py-6'} fixed w-full z-10 transition-all`}>
      <div className='container mx-auto flex items-center justify-between h-full '>
      <Link  href={'/admin'}>
          <div>
          <Image
            className='w-[40px] '
            src={Logo}
            alt="Picture of the author"
          />
          </div>
      </Link>
      <Link href={'/admin/add'}>
       Добавить новый продукт
      </Link>
      <Link href={'/admin/brands'}>
        Бренды
      </Link>
      <Link href={'/admin/types'}>
       Типы
      </Link>
      {/* Logout   onClick => logout! */}
      <div
        className="border-2 border-black rounded-lg p-3 cursor-pointer flex relative "
      >
        <GrLogout/>
      </div>
      </div>
    </header>
  )
}

export default AdminHeader