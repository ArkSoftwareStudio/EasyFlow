import React, { Component } from 'react';

export class Counter extends Component {
  static displayName = Counter.name;

  constructor(props) {
    super(props);
    this.state = { text: "", loading: true };
  }

    incrementCounter() {
        var PL = {
            a: 1,
            b: 2
        };
        var data = new FormData();
        data.append("PoLos", JSON.stringify(PL));


      fetch('users', {
          method: "POST",
          body: data
      })
  }

  render() {
    return (
      <div>
        <h1>Counter</h1>

        <p>This is a simple example of a React component.</p>

        <p aria-live="polite">Current count: <strong>{this.state.currentCount}</strong></p>

        <button className="btn btn-primary" onClick={this.incrementCounter}>Increment</button>
      </div>
    );
  }
}
