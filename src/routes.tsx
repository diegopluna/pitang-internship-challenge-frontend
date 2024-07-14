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
        <Route path="/agendamentos">
          <Route index element={<ListAppointments />} />
          <Route path="criar" element={<Schedule />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
)

export default AppRoutes
