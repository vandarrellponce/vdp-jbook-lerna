import React, { Component } from 'react'
export const Buttonz = (props) => {
  return (
    <button
      onClick={() =>
        props.sign == '+' ? props.updateCount(1) : props.updateCount(-1)
      }
    >
      {props.sign}
    </button>
  )
}

class App2 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 1,
    }
  }

  handleCount(value) {
    this.setState((prevState) => ({ count: prevState.count + value }))
  }

  render() {
    return (
      <div>
        Current count: {this.state.count}
        <hr />
        <Buttonz
          sign="+"
          count={this.state.count}
          updateCount={this.handleCount.bind(this)}
        />
        <Buttonz
          sign="-"
          count={this.state.count}
          updateCount={this.handleCount.bind(this)}
        />
      </div>
    )
  }
}

const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center',
}

show(<App2 />)
