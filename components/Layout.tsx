import { Footer } from './Footer'
import { Header } from './Header'

// I should to change "any" type*********************************////
interface ILayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: ILayoutProps) => {
  return (
    <>
      <Header />
      <div className="mx-10">{children}</div>
      <Footer />
    </>
  )
}

export default Layout
