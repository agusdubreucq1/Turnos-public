import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Layout/Header';



const Layout: React.FC = () => {

    return (
        <div className='w-full min-h-dvh flex flex-col items-center bg-gray-200'>
            <Header></Header>
            <main className='max-w-7xl flex flex-col gap-4 p-7 min-h-full h-full w-full'>
                <Outlet></Outlet>
            </main>
        </div>
    );
};

export default Layout