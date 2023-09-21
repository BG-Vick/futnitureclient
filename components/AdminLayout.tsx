import Footer from './Footer'
import Sidebar from './Sidebar'
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
