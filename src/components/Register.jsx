import React from 'react';
import { withFormik } from 'formik';
import { observer, inject } from 'mobx-react';
import * as Yup from 'yup';

const formEnhancer = withFormik({
    validationSchema: Yup.object().shape({
        email: Yup.string()
            .email()
            .required('email is required!'),
        password: Yup.string().required('password required')
    }),
    mapPropsToValues: props => ({
        email: '',
        password: '',
        requirements: []
    }),
    handleSubmit: (values, { setSubmitting, props, resetForm, setValues }) => {
        const payload = {
            ...values
        };
        const { toggleLogin } = props.store;
        props.controller.handleRegister(payload).then(user => {
            console.log('handling register');
            toggleLogin(user);
            props.controller.init(user);
            setSubmitting(false);
            resetForm({ email: '', password: '' });
        });
    }
});

const Register = props => {
    const {
        toggleRegisterLogin,
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting
    } = props;
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>LOGIN</h1>
                <input
                    placeholder="E-mail"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <input
                    placeholder="Password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <div className="action-area">
                    <button
                        type="submit"
                        className="submit-btn"
                        disabled={isSubmitting}
                    >
                        REGISTER
                    </button>
                </div>
            </form>
            <button onClick={toggleRegisterLogin}>LOGIN</button>
        </div>
    );
};

export default inject('store')(observer(formEnhancer(Register)));
