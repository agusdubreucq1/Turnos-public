import React from 'react';
import Form from './Form';
import auth from '../../services/auth';

const Register: React.FC = () => {

    const [registerData, setRegisterData] = React.useState({
        name: '',
        email: '',
        password: ''
    })

    const [error, setError] = React.useState<string | null>(null)

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRegisterData({
            ...registerData,
            [event.target.name]: event.target.value
        })
    }

    const onRegister = async (e: React.MouseEvent) => {
        e.preventDefault()
        setError(null)
        try{
            await auth.register(registerData)
            setRegisterData({
                name: '',
                email: '',
                password: ''
            })
        } catch(e){
            e instanceof Error ? setError(e.message) : setError('Error al registrarse')
        }
    }

    return (
        <section className='w-full flex flex-col items-center'>
            <Form error={error}>
                <Form.Input value={registerData.name} onChange={onChange} label='Name' name='name' placeholder='John Doe' />
                <Form.Input value={registerData.email} onChange={onChange} label='Email' name='email' placeholder='example@example.com' />
                <Form.Input value={registerData.password} onChange={onChange} label='Password' placeholder='********' name='password' type='password' />
                <Form.Button onClick={onRegister} text='Register' />
            </Form>
        </section>
    );
};

export default Register