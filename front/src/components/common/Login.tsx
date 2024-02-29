import React from 'react';
import Form from './Form';
import auth from '../../services/auth';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import { setAuth } from '../../statement/auth/slice';
import { Navigate } from 'react-router-dom';

const Login: React.FC = () => {
    const dispatch = useAppDispatch()
    const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated)

    const [login, setLogin] = React.useState({
        email: '',
        password: ''
    })
    const [error, setError] = React.useState<string | null>(null)

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLogin({
            ...login,
            [event.target.name]: event.target.value
        })
    }

    const onLogin = async (e: React.MouseEvent) => {
        e.preventDefault()
        setError(null)
        console.log(login)
        try {
            const loginRes = await auth.login(login)
            setLogin({
                email: '',
                password: ''
            })
            dispatch(setAuth(loginRes))
        } catch (e) {
            e instanceof Error ? setError(e.message) : setError('Error de login')
        }
    }

    if(isAuthenticated){
        return <Navigate to='/' />
    }

    return (
        <section className='w-full flex flex-col items-center'>
            <Form error={error}>
                <Form.Input value={login.email} onChange={onChange} label='Email' name='email' placeholder='example@example.com' />
                <Form.Input value={login.password} onChange={onChange} label='Password' placeholder='********' name='password' type='password' />
                <Form.Button onClick={onLogin} text='Login' />
            </Form>
        </section>
    );
};

export default Login