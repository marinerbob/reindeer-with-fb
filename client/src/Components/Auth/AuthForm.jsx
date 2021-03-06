import React, { useState } from 'react';

import { signWithPassword, registerWithPassword } from '../../firebase';

import { useForm, Controller } from 'react-hook-form';

import { Form, Alert, Button } from 'react-bootstrap';

import validationSchema from './validationSchema';
import { yupResolver } from '@hookform/resolvers/yup';

const AuthForm = ({ isLogin }) => {
    const [err, setErr] = useState('');
    const [success, setSuccess] = useState(false);
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
            password: ''
        },
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
    };

    const beforeInputChange = () => {
        if (err !== '') {
            setErr('');
        }
    }

    return (
        <Form style={{ width: '85%' }} name="auth-form" onSubmit={handleSubmit(onSubmit)}>
            {err && <Alert variant="danger">{err}</Alert>}
            {success && <Alert variant="success">{isLogin ? 'Login is successful' : 'Registration is successful'}</Alert>}
            <Form.Group className="mb-3" controlId="emailInput">
                <Form.Label>Email</Form.Label>
                <Controller control={control}
                            name="email"
                            render={({
                                         field
                                     }) => (
                                <Form.Control type="email"
                                              placeholder="Enter email" {...field}
                                              onChange={(e) => {
                                                  beforeInputChange();
                                                  field.onChange(e);
                                              }} />
                            )} />
                {errors.email && <Form.Text style={{ color: '#f00' }}>{errors.email.message}</Form.Text>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="passwordInput">
                <Form.Label>Password</Form.Label>
                <Controller control={control}
                            name="password"
                            render={({
                                         field
                                     }) => (
                                <Form.Control type="password"
                                              placeholder="Enter password"
                                              {...field}
                                              onChange={(e) => {
                                                  beforeInputChange();
                                                  field.onChange(e);
                                              }}
                                />
                            )} />
                {errors.password && <Form.Text style={{ color: '#f00' }}>{errors.password.message}</Form.Text>}
            </Form.Group>

            <Form.Group>
                <Button type="submit" variant="primary" style={{ width: '100%' }}>
                    {isLogin ? 'Login' : 'Register'}
                </Button>
            </Form.Group>
        </Form>
    );
}

export default AuthForm;