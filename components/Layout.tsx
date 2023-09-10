import { useTypedSelector } from '@/hooks/useTypedSelector'
import Footer from './Footer'
import Header from './Header'
import Hero from './Hero'
import Sidebar from './Sidebar'
import { setSidebarState } from '@/store/reducers/sidebarSlice'
import { useDispatch } from 'react-redux'
interface ILayoutProps {
  children: React.ReactNode
}
const Layout = ({ children }: ILayoutProps) => {
  return (
    <>
      <Header />
      <div>{children}</div>
      <Sidebar />
      <Footer />
    </>
  )
}

export default Layout
