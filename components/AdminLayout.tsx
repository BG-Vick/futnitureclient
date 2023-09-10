import { useTypedSelector } from '@/hooks/useTypedSelector'
import Footer from './Footer'
import Header from './Header'
import Hero from './Hero'
import Sidebar from './Sidebar'
import { setSidebarState } from '@/store/reducers/sidebarSlice'
import { useDispatch } from 'react-redux'
import AdminHeader from './AdminHeader'
interface ILayoutProps {
  children: React.ReactNode
}
const AdminLayout = ({ children }: ILayoutProps) => {
  return (
    <>
      <AdminHeader />
      <div>{children}</div>
      <Sidebar />
      <Footer />
    </>
  )
}

export default AdminLayout
