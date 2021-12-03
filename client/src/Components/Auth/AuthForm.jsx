import React, { useState } from 'react';

import { signWithPassword, registerWithPassword } from '../../firebase';

import { useForm, Controller } from 'react-hook-form';

import { Form, Alert, Button } from 'react-bootstrap';

import validationSchema from './validationSchema';
import { yupResolver } from '@hookform/resolvers/yup';

const AuthForm = ({ isLogin }) => {
    const [err, setErr] = useState('');
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = async (data) => {
        try {
            setErr('');
            if (isLogin) {
                await signWithPassword(data.email, data.password);
            } else {
                await registerWithPassword(data.email, data.password);
            }
        } catch (error) {
            setErr(error.message);
        }
    }


    return (
        <Form name="auth-form" onSubmit={handleSubmit(onSubmit)}>
            {err && <Alert variant="danger">{err}</Alert>}
              <Form.Group className="mb-3" controlId="emailInput">
    <Form.Label>Email</Form.Label>
    <Controller control={control}
                        name="email"
                        render={({
                            field
                        }) => (
                            <Form.Control type="email" placeholder="Enter email" {...field} />
                        )} />
  </Form.Group>
  <Form.Group className="mb-3" controlId="passwordInput">
    <Form.Label>Password</Form.Label>
    <Controller control={control}
                        name="password"
                        render={({
                            field
                        }) => (
                            <Form.Control type="password" placeholder="Enter password" {...field} />
                        )} />
  </Form.Group>

            <Button type="submit" variant="primary" block>
                {isLogin ? 'Login' : 'Register'}
            </Button>
        </Form>
    );
}

export default AuthForm;