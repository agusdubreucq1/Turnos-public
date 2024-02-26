import React from 'react';
import Form from './Form';

const Login: React.FC = () => {

    return (
        <section className='w-full flex flex-col items-center'>
            <Form>
                <Form.Input label='Email' name='email' />
                <Form.Input label='Password' name='password' type='password' />
                <Form.Button text='Login' />
            </Form>
        </section>
    );
};

export default Login