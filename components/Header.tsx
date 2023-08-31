import Link from 'next/link'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { setSidebarState } from '@/store/reducers/sidebarSlice'
import { useDispatch } from 'react-redux'
import { BsBag } from 'react-icons/bs'

const Header = () => {
  const dispatch = useDispatch()

  return (
    <header className='bg-pink-200'>
      <div>Header</div>
      <div>
        <button
          onClick={() => {
            dispatch(setSidebarState())
          }}
          className="cursor-pointer flex relative"
        >
          <BsBag className="text-2xl" />
        </button>
      </div>
    </header>
  )
}

export default Header
