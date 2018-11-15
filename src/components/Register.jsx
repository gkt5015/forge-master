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
    handleSubmit: (values, { setSubmitting, props, resetForm, setErrors }) => {
        const payload = {
            ...values
        };
        const { toggleLogin } = props.store;
        props.controller
            .handleRegister(payload)
            .then(user => {
                console.log('api has been called successfully to register');
                toggleLogin(user);
                props.controller.init();
                setSubmitting(false);
                resetForm({ email: '', password: '' });
            })
            .catch(error => {
                console.log(error);
                setErrors(error);
                setSubmitting(false);
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
        isSubmitting,
        errors
    } = props;
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1 className="login-form-title">REGISTRATION FORM</h1>
                <input
                    className="login-email"
                    placeholder="E-mail"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <input
                    className="login-password"
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors && (
                    <div className="error-message">{errors.message}</div>
                )}
                <div className="action-area">
                    <button
                        type="submit"
                        className="submit-btn register-button"
                        disabled={isSubmitting}
                    >
                        REGISTER
                    </button>
                </div>
            </form>
            <p className="login-reg-toggler" onClick={toggleRegisterLogin}>
                Already have a login? Click here
            </p>
        </div>
    );
};

export default inject('store')(observer(formEnhancer(Register)));
