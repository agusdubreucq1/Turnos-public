import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/common/Login'
import Layout from './components/common/Layout'
import Register from './components/common/Register'
import Reservas from './components/common/Reservas'
import Perfil from './components/common/Perfil'
import ProtectedRoutes from './components/common/ProtectedRoutes'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout></Layout>}>
            <Route element={<ProtectedRoutes></ProtectedRoutes>}>
              <Route path='/perfil' element={<Perfil></Perfil>} />
            </Route>
            <Route path='/' element={<Reservas></Reservas>} />
            <Route path='/login' element={<Login></Login>} />
            <Route path='/register' element={<Register></Register>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
