import * as yup from 'yup';

const loginSchema = yup.object().shape({
    email: yup.string().required('Email is required').email('Enter valid email address'),
    password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters')
});

export default loginSchema;