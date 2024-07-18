import { Outlet } from 'react-router-dom'

import Footer from '@/components/Footer'
import Modal from '@/components/Modal'
import Navbar from '@/components/Navbar'

const BaseLayout = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-1">
      <Outlet />
    </main>
    <Footer />
    <Modal />
  </div>
)

export default BaseLayout
