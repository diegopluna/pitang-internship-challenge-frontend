import { BrowserRouter, Route, Routes } from 'react-router-dom'
import BaseLayout from './layouts/BaseLayout'
import Home from './pages/Home'
import Schedule from './pages/Schedule'
import ListAppointments from './pages/ListAppointments'

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<BaseLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/list-appointments" element={<ListAppointments />} />
      </Route>
    </Routes>
  </BrowserRouter>
)

export default AppRoutes
