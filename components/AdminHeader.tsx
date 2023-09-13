import Link from 'next/link'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { setSidebarState } from '@/store/reducers/sidebarSlice'
import { useDispatch } from 'react-redux'
import { GrLogout } from 'react-icons/gr'
import Logo from '@/public/logo (1).svg'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { registration, login, logout, check, getCookie } from '@/store/fakeHTTP'
import { setUserState } from '@/store/reducers/userSlice'



const AdminHeader = () => {
  const [isActive, setIsActive] = useState(false)
  const dispatch = useDispatch()

  function handleLogout() {
    logout()
    dispatch(
      setUserState({
        id: null,
        email: '',
        role: '',
      })
    )
  }


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

      <div
      onClick={handleLogout}
        className="border-2 border-black rounded-lg p-3 cursor-pointer flex relative "
      >
        <GrLogout/>
      </div>
      </div>
    </header>
  )
}

export default AdminHeader