import React from 'react';
import LoginForm from './LoginForm';
import Register from './Register';
import { observer, inject } from 'mobx-react';

class LoginSignUpForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: true
        };
        this.controller = this.props.controller;
    }

    toggleRegisterLogin = () => {
        const loginState = !this.state.login;
        this.setState({
            login: loginState
        });
    };

    handleLogin = () => {
        console.log('call login API');
    };

    render() {
        if (this.props.store.user) {
            return null;
        }
        return (
            <div className="login-sign-form">
                {this.state.login ? (
                    <LoginForm toggleRegisterLogin={this.toggleRegisterLogin} />
                ) : (
                    <Register
                        controller={this.controller}
                        toggleRegisterLogin={this.toggleRegisterLogin}
                    />
                )}
            </div>
        );
    }
}

export default inject('store')(observer(LoginSignUpForm));
