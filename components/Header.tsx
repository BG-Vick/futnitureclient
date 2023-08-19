import { FaBeer } from 'react-icons/fa'
import Link from 'next/link'
import { Navbar } from './modules/Navbar'

export function Header() {

  return (
    <header className='mb-10 border border-teal-400 bg-slate-400'>
      <div className='mx-3'>
        <FaBeer />
        <Navbar/>
      </div>
    </header>
    
  )
}
