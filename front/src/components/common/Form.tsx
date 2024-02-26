import React from 'react';

const Form = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='relative px-4 flex flex-col items-center bg-slate-300 '>
            <form className='relative top-4 z-20 w-fit flex flex-col p-7 gap-4 min-w-96 border  rounded-sm bg-white'>
                {children}
            </form>
        </div>
    );
};

interface InputProps {
    label: string
    type?: string
    name: string
}

const Input: React.FC<InputProps> = ({ label, type = 'text', name }) => {
    return (
        <div className='flex gap-2 w-full justify-between items-center'>
            <label>{label}</label>
            <input type={type} name={name} className='border border-gray-400 p-2 rounded-md' placeholder='example@example.com' />
        </div>
    )
}

interface ButtonProps {
    text: string,
    props?: Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'>
}

const Button: React.FC<ButtonProps> = ({ text, ...props }) => {
    return (
        <button {...props}  className='bg-slate-600 text-white p-2 rounded-md hover:opacity-90 transition-opacity'>{text}</button>
    )
}

Form.Input = Input
Form.Button = Button

export default Form