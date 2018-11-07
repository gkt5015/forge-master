import React from 'react';
import Login from './Login';
import Register from './Register';

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
        return (
            <div>
                {this.state.login ? (
                    <Login toggleRegisterLogin={this.toggleRegisterLogin} />
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

export default LoginSignUpForm;
