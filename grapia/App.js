import React, { Component } from 'preact'
import fetch from 'unfetch'

class App extends Component {
  constructor () {
    super()
    this.state = { hits: {} }
  }

  componentDidMount () {
    fetch('http://localhost:3000/apia', { headers: { 'password': 'helloworld' } }).then(res => res.json()).then(hits => this.setState({ hits }))
  }

  render () {
    return (
      <div style={{ maxWidth: '640px', margin: 'auto' }}>
        {Object.entries(this.state.hits).map(([endpoint, times]) => (
          <p><code>{endpoint}</code> ~ {Object.values(times).reduce((a, b) => a + b, 0)}</p>
        ))}
      </div>
    )
  }
}

export default App
