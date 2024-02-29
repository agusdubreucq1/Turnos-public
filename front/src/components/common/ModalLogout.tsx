import React from 'react';
import Modal from './Modal';

interface ModalLogoutProps {
    handleCancel: () => void;
    handleOk: () => void;
}

const ModalLogout: React.FC<ModalLogoutProps> = ({ handleCancel, handleOk }) => {

    return (
        <Modal onClick={handleCancel}>
            <div onClick={(e) => e.stopPropagation()} className='flex flex-col gap-12 bg-white px-12 py-8 '>
                <h1 className='text-2xl text-center'>¿Desea deslogearse?</h1>
                <div className='flex gap-4 justify-around z-10'>
                    <button onClick={handleCancel} className='bg-red-500 text-white py-3 px-7 text-1xl'>Cancelar</button>
                    <button onClick={handleOk} className='bg-red-500 text-white py-3 px-7 text-1xl'>Confirmar</button>
                </div>
            </div>
        </Modal>
    );
};

export default ModalLogout