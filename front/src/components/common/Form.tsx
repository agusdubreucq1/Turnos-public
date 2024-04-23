import React from 'react';
import { ErrorIcon } from './icons/ErrorIcon';


interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
    children: React.ReactNode;
    error?: string | null
}
interface FormType {
    (props: FormProps): JSX.Element;
    Input: React.FC<InputProps>;
    Button: React.FC<ButtonProps>;
}


const Form: FormType = ({ children, error=null, ...props }) => {
    return (
        <div className='relative mb-4 px-4 flex flex-col items-center bg-slate-300 '>
            <form {...props} className='relative top-4 z-20 w-fit flex flex-col p-7 gap-4 min-w-96 border rounded-sm bg-white shadow-lg'>
                {error && <div className='w-full flex justify-center p-3 bg-red-300 rounded-lg gap-3'>
                    <ErrorIcon className='w-5 aspect-square'></ErrorIcon>
                    <p className='text-black capitalize'>{error}</p>
                </div>}
                {children}
            </form>
        </div>
    );
};

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className'> {
    label: string
    type?: string
    name: string,
}

const Input: React.FC<InputProps> = ({ label, type = 'text', name, ...props }) => {
    return (
        <div className='flex gap-2 w-full justify-between items-center'>
            <label>{label}</label>
            <input type={type} {...props} name={name} className='border border-gray-400 p-2 rounded-md' />
        </div>
    )
}

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
    text: string,
}

const Button: React.FC<ButtonProps> = ({ text, ...props }) => {
    return (
        <button {...props} className='bg-slate-600 text-white p-2 rounded-md hover:opacity-90 transition-opacity'>{text}</button>
    )
}

Form.Input = Input
Form.Button = Button

export default Form