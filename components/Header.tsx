import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { setSidebarState } from '@/store/reducers/sidebarSlice'
import { useDispatch } from 'react-redux'
import { BsBag } from 'react-icons/bs'
import { MdAdminPanelSettings } from 'react-icons/md'
import { TbHomeSearch } from 'react-icons/tb'
import Logo from '@/public/logo (1).svg'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import clsx from 'clsx'

const Header = () => {
  const [isActive, setIsActive] = useState(false)
  const dispatch = useDispatch()
  const cart = useTypedSelector((state) => state.cart)
  const cartAmount = cart.reduce((accumulator, currentItem) => {
    return +accumulator + +currentItem.count
  }, 0)

  const { pathname } = useRouter()

  const activeLink = {
    home: '/',
    products: '/products',
    admin: '/auth',
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
        <Link
          className={clsx(
            activeLink.home === pathname && 'bg-gray-200',
            '  cursor-pointer hover:bg-gray-100 p-4 rounded-lg'
          )}
          href={'/'}
        >
          <div>
            <TbHomeSearch className="w-[40px] h-[40px]" />
          </div>
        </Link>
        <Link
          className={clsx(
            activeLink.products === pathname && 'bg-gray-200',
            '  cursor-pointer hover:bg-gray-100 p-4 rounded-lg'
          )}
          href={'/products'}
        >
          <div>
            <Image
              className="w-[40px] "
              src={Logo}
              alt="Picture of the author"
            />
          </div>
        </Link>
        <div className="flex items-center ">
          <Link
            className={clsx(
              activeLink.admin === pathname && 'bg-blue-200',
              'cursor-pointer hover:bg-gray-100 p-4 rounded-lg '
            )}
            href={'/auth'}
          >
            <MdAdminPanelSettings className="w-6 h-6" />
          </Link>
          <div>
            <div
              onClick={() => {
                dispatch(setSidebarState())
              }}
              className="cursor-pointer flex relative "
            >
              <BsBag className="text-2xl" />
              <div
                className="bg-red-500 absolute -right-2 -bottom-2 text-[12px] w-[18px] h-[18px]
         text-white rounded-full flex justify-center items-center"
              >
                {cartAmount}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
