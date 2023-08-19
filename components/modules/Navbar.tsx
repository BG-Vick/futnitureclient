import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { publicPaths } from '@/utils/constants'


export function Navbar() {
  const { pathname } = useRouter()  
  return (
    <nav>
      <div>Elista Shop</div>
      <ul className="flex gap-7 mb-5">
        {publicPaths.map((el) => {
          return (
            <li key={el.id}>
              <Link href={el.path} legacyBehavior passHref>
                <a className={clsx(pathname === el.path && 'border border-red-700')}   >{el.title}</a>
              </Link>
            </li>
          )})}
      </ul>
    </nav>

  )
}
