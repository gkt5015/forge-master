import React from 'react';
import { withFormik } from 'formik';

const Login = props => {
    const { toggleRegisterLogin } = props;
    return (
        <div>
            <h1>LOGIN</h1>
            <button onClick={toggleRegisterLogin}>REGISTER</button>
        </div>
    );
};

export default Login;
