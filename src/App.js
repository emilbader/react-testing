import React, { Component } from 'react';
import axios from 'axios';

export const doIncrement = (prevState) => ({
  counter: prevState.counter + 1
});

export const doDecrement = (prevState) => ({
  counter: prevState.counter - 1
});

class App extends Component {
  constructor() {
    super();

    this.state = {
      counter: 0,
      asyncIp: null
    };

    this.onIncrement = this.onIncrement.bind(this);
    this.onDecrement = this.onDecrement.bind(this);
  }

  onIncrement() {
    this.setState(doIncrement);
  }

  onDecrement() {
    this.setState(doDecrement);
  }

  componentDidMount() {
    axios.get('https://httpbin.org/ip')
      .then((response) => this.setState({ asyncIp: response }))
      .catch(error => console.error(error));
  }

  render() {
    const { counter } = this.state;

    return (
      <div>
        <h1>My Counter</h1>
        <Counter counter={counter}/>

        <button
          className="increment"
          type="button"
          onClick={this.onIncrement}
        >
          Increment
        </button>

        <button
          className="decrement"
          type="button"
          onClick={this.onDecrement}
        >
          Decrement
        </button>
      </div>
    );
  }
}

export const Counter = ({ counter }) => <p>{counter}</p>;


export default App;