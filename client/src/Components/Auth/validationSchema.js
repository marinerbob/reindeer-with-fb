import * as yup from 'yup';

const loginSchema = yup.object().shape({
    email: yup.string().required('Email is required').email('Enter valid email address'),
    password: yup.string().required('Password is required').min(6, 'Password length must be minimum 6 symbols')
});

export default loginSchema;