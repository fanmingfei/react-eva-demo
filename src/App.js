import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Img from './Img';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      rotation: 0,
      txt: ''
    };

    setInterval(() => {
      this.setState({
        rotation: this.state.rotation += 0.01,
        txt: `当前旋转角度 ${this.state.rotation.toFixed(2)}`
      })

    }, 10)
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <eva width="300" height="400">
            <Img
              x={150}
              y={200}
              width={212}
              height={150}
              rotation={this.state.rotation}
              originX={0.5}
              originY={0.5}
              src='https://gw.alicdn.com/tfs/TB1DNzoOvb2gK0jSZK9XXaEgFXa-658-1152.webp'
            >
              <Img
                x={0}
                y={0}
                width={100}
                height={100}
                rotation={0}
                originX={0.5}
                originY={0.5}
                anchorX={0.5}
                anchorY={0.5}
                src={logo} />
            </Img>
            <gameobject color="yellow">{this.state.txt}</gameobject>
          </eva>
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          <div className="button-container">
            <button className="decrement-button" onClick={() => this.setState({ counter: this.state.counter - 1 })}>
              -
            </button>
            <div className="counter-text">{this.state.counter}</div>
            <button className="increment-button" onClick={() => this.setState({ counter: this.state.counter + 1 })}>
              +
            </button>
          </div>
        </p>
      </div>
    );
  }
}

export default App;