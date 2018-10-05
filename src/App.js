import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ForgeMatrix from './components/ForgeMatrix'
import AddEditArea from './components/AddEditArea';
import controller from './controllers/controller'
import datastore from './datastore/datastore'
import {Provider} from 'mobx-react'

class App extends Component {
  constructor() {
    super()

    this.ds = new datastore()
    this.controller = new controller(this.ds)
  }

  render() {

    return (
      <Provider store={this.ds}>
        <div className="App">
        <AddEditArea />
        <ForgeMatrix />
        </div>
      </Provider>
    );
  }
}

export default App;
