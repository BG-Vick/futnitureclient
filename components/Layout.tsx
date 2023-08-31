import Footer from "./Footer"
import Header from "./Header"
import Sidebar from "./Sidebar"
interface ILayoutProps {
  children: React.ReactNode
}
const Layout = ({ children }: ILayoutProps) => {
  return (
    <>
      <Header />
      <div>{children}</div>
      <Sidebar/>
      <Footer />
    </>
  )
}

export default Layout
