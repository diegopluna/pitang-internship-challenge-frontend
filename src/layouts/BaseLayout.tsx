import Navbar from '@/components/Navbar/Navbar'
import { Outlet } from 'react-router-dom'

const BaseLayout = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <Outlet />
  </div>
)

export default BaseLayout
