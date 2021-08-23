[{"content":"","id":"qif8f","type":"text"},{"content":"import { useState } from 'react'\r\nconst App = () => {\r\n  const [count, setCount] = useState(0)\r\n  return (\r\n    <div\r\n      style={{\r\n        display: 'flex',\r\n        paddingTop: '75px',\r\n        flexDirection: 'column',\r\n        alignItems: 'center',\r\n        justifyContent: 'space-between',\r\n      }}\r\n    >\r\n      Count: {count}\r\n      <button\r\n        onClick={() => setCount((prev) => prev + 1)}\r\n        style={{ width: '100px' }}\r\n      >\r\n        {' '}\r\n        Click Me!{' '}\r\n      </button>\r\n    </div>\r\n  )\r\n}\r\nshow(<App />)\r\n","id":"iup11","type":"code"},{"content":"import React, { Component } from 'react'\r\nexport const Buttonz = (props) => {\r\n  return (\r\n    <button\r\n      onClick={() =>\r\n        props.sign == '+' ? props.updateCount(1) : props.updateCount(-1)\r\n      }\r\n    >\r\n      {props.sign}\r\n    </button>\r\n  )\r\n}\r\n\r\nclass App2 extends Component {\r\n  constructor(props) {\r\n    super(props)\r\n    this.state = {\r\n      count: 1,\r\n    }\r\n  }\r\n\r\n  handleCount(value) {\r\n    this.setState((prevState) => ({ count: prevState.count + value }))\r\n  }\r\n\r\n  render() {\r\n    return (\r\n      <div>\r\n        Current count: {this.state.count}\r\n        <hr />\r\n        <Buttonz\r\n          sign=\"+\"\r\n          count={this.state.count}\r\n          updateCount={this.handleCount.bind(this)}\r\n        />\r\n        <Buttonz\r\n          sign=\"-\"\r\n          count={this.state.count}\r\n          updateCount={this.handleCount.bind(this)}\r\n        />\r\n      </div>\r\n    )\r\n  }\r\n}\r\n\r\nconst styles = {\r\n  fontFamily: 'sans-serif',\r\n  textAlign: 'center',\r\n}\r\n\r\nshow(<App2 />)\r\n","id":"v9lzq","type":"code"},{"content":"function App3() {\r\n  const [users, setUsers] = React.useState([])\r\n\r\n  const f = async () => {\r\n    const res = await fetch('https://reqres.in/api/users/')\r\n    const json = await res.json()\r\n    setUsers(json.data)\r\n  }\r\n  React.useEffect(() => {\r\n    f()\r\n  }, [])\r\n\r\n  return (\r\n    <div className=\"App\">\r\n      <h1>Hello ReqRes users!</h1>\r\n      <div className=\"flex\">\r\n        {users.length &&\r\n          users.map((user) => {\r\n            return (\r\n              <div key={user.id}>\r\n                <p>\r\n                  <strong>{user.first_name}</strong>\r\n                </p>\r\n                <p>{user.email}</p>\r\n                <img key={user.avatar} src={user.avatar} />\r\n              </div>\r\n            )\r\n          })}\r\n      </div>\r\n    </div>\r\n  )\r\n}\r\n\r\nshow(<App3 />)\r\n","id":"i8lf4","type":"code"}]