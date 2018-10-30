import React, { Component, Fragment } from 'preact'
import fetch from 'unfetch'

class App extends Component {
  constructor () {
    super()
    this.state = {
      locked: true,
      password: '',
      hits: {}
    }
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handlePasswordSubmit = this.handlePasswordSubmit.bind(this)
    this.getHits = this.getHits.bind(this)
  }

  handlePasswordChange (e) {
    this.setState({ password: e.target.value })
  }

  handlePasswordSubmit (e) {
    e.preventDefault()
    this.getHits()
      .then(() => this.setState({ locked: false }))
      .catch(() => this.setState({ wrongPassword: true, password: '' }))
  }

  getHits () {
    return fetch('http://localhost:3000/apia', { headers: { 'password': this.state.password } })
      .then(res => res.json())
      .then(hits => this.setState({ hits }))
  }

  render () {
    const { locked, password, hits, wrongPassword } = this.state

    if (locked) {
      return (
        <form style={{ display: 'flex', width: '100%' }} onSubmit={this.handlePasswordSubmit}>
          <input type='password' value={password} onChange={this.handlePasswordChange} style={{ flexGrow: 1, borderColor: wrongPassword ? 'red' : '' }} />
          <input type='submit' onChange={console.log} value='Go !' />
        </form>
      )
    } else {
      return (
        <Fragment>
          {Object.entries(hits).map(([endpoint, times]) => (
            <p><code>{endpoint}</code> ~ {Object.values(times).reduce((a, b) => a + b, 0)}</p>
          ))}
        </Fragment>
      )
    }
  }
}

export default App
