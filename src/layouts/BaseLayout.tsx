import Footer from '@/components/Footer'
import Modal from '@/components/Modal'
import Navbar from '@/components/Navbar'
import { Outlet } from 'react-router-dom'

const BaseLayout = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <Outlet />
    <Footer />
    <Modal />
  </div>
)

export default BaseLayout
