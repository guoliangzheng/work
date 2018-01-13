

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import  Provider from './Provider'
import Canvas from './canvas'
import Store from './store'
import {LeftSide,RightSide} from './side' 
import styles from "./App.css";
class App extends Component {
  render() {
    let store = new Store();

    return (
      <div className={styles.container}>
        <Provider store={store}>
           <Canvas></Canvas>
        </Provider>
      </div>
    );
  }
}
export default App;
