import React from 'react';

interface ModalProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    children: React.ReactNode
}


const Modal: React.FC<ModalProps> = ({children, ...props}) => {

  return (
    <div {...props} className='fixed flex items-center justify-center w-screen h-screen top-1/2 left-1/2  backdrop-brightness-50 translate-x-[-50%] translate-y-[-50%]  p-5'>
        {children}
    </div>
  );
};

export default Modal