import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { Outlet } from 'react-router-dom'

const BaseLayout = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <Outlet />
    <Footer />
  </div>
)

export default BaseLayout
