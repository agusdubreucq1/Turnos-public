import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/common/Login'
import Layout from './components/common/Layout'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout></Layout>}>
              <Route path='/login' element={<Login></Login>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
