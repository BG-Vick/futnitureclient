import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { GrLogout } from 'react-icons/gr'
import Logo from '@/public/logo (1).svg'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { setUserState } from '@/store/reducers/userSlice'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import { destroyCookie } from 'nookies'

const AdminHeader = () => {
  const [isActive, setIsActive] = useState(false)
  const dispatch = useDispatch()
  const router = useRouter()
  const { pathname } = useRouter()

  const activeLink = {
    add: '/admin/add',
    brands: '/admin/brands',
    types: '/admin/types',
  }

  function handleLogout() {
    destroyCookie(null, 'token')
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
    <header
      className={`${
        isActive ? 'bg-white py-4 shadow-md' : 'bg-none py-6'
      } fixed w-full z-10 transition-all`}
    >
      <div className="container mx-auto flex items-center justify-between h-full ">
        <Link href={'/admin'}>
          <div>
            <Image
              className="w-[40px] "
              src={Logo}
              alt="Picture of the author"
            />
          </div>
        </Link>
        <Link
          className={clsx(
            activeLink.add === pathname && 'bg-blue-200',
            'cursor-pointer hover:bg-gray-100 p-4 rounded-lg'
          )}
          href={'/admin/add'}
        >
          Добавить новый продукт
        </Link>
        <Link
          className={clsx(
            activeLink.brands === pathname && 'bg-blue-200',
            'cursor-pointer hover:bg-gray-100 p-4 rounded-lg'
          )}
          href={'/admin/brands'}
        >
          Магазины
        </Link>
        <Link
          className={clsx(
            activeLink.types === pathname && 'bg-blue-200',
            'cursor-pointer hover:bg-gray-100 p-4 rounded-lg'
          )}
          href={'/admin/types'}
        >
          Категория
        </Link>

        <div
          onClick={handleLogout}
          className="border-2 border-black rounded-lg p-3 cursor-pointer flex relative "
        >
          <GrLogout />
        </div>
      </div>
    </header>
  )
}

export default AdminHeader
