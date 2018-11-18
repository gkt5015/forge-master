import React, { Component } from 'react';
import './App.css';
import ForgeMatrix from './components/ForgeMatrix';
import AddEditArea from './components/AddEditArea';
import LoginSignUpForm from './components/LoginSignUpForm';
import LogoutButton from './components/LogoutButton';
import controller from './controllers/controller';
import datastore from './datastore/datastore';
import { Provider } from 'mobx-react';

class App extends Component {
    constructor() {
        super();
        this.ds = new datastore();
        this.controller = new controller(this.ds);
    }

    render() {
        return (
            <Provider store={this.ds}>
                <div className="App container">
                    <div className="main-title">The Forge Master</div>
                    <LogoutButton controller={this.controller}/>
                    <LoginSignUpForm controller={this.controller} />
                    <AddEditArea />
                    <ForgeMatrix />
                </div>
            </Provider>
        );
    }
}

export default App;
