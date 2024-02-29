import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import { logoutAuth } from '../../statement/auth/slice';
import ModalLogout from '../common/ModalLogout';
import logo from '/logo.webp'

const Header: React.FC = () => {
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated)
  const dispatch = useAppDispatch()
  const [showModal, setShowModal] = React.useState(false)

  const logout = () => {
    dispatch(logoutAuth())
    setShowModal(false)
  }

  const handleLogout = () => {
    setShowModal(true)
  }

  return (
    <header className='sticky top-0 w-full bg-slate-600 min-h-20 flex justify-center'>
      <nav className='max-w-7xl w-full flex justify-between items-center'>
        <div className='flex items-center'> 
          <Link to='/' className=''><img src={logo} alt="logo" className='h-8' /></Link>
        </div>
        <div className='flex gap-10'>
          {!isAuthenticated &&
            <>
              <Link className='text-white text-lg hover:scale-110 transition-transform font-medium' to='/login'>Login</Link>
              <Link className='text-white text-lg hover:scale-110 transition-transform font-medium' to='/register'>Register</Link>
            </>
          }
          {isAuthenticated && <button className='text-white  rounded-md-400 px-3 py-1' onClick={handleLogout}>Logout</button>}
          {showModal && <ModalLogout handleCancel={() => setShowModal(false)} handleOk={logout} />}
        </div>

      </nav>
    </header>
  );
};

export default Header