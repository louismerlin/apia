import { h, Component } from 'preact' // eslint-disable-line no-unused-vars
import fetch from 'unfetch'

class App extends Component {
  constructor () {
    super()
    this.state = { hits: {} }
  }

  componentDidMount () {
    fetch('http://localhost:3000/apia').then(res => res.json()).then(hits => this.setState({ hits }))
  }

  render () {
    return (
      <div style={{ maxWidth: '640px', margin: 'auto', left: '50%' }}>
        {Object.entries(this.state.hits).map(([endpoint, times]) => (
          <p><code>{endpoint}</code> ~ {Object.values(times).reduce((a, b) => a + b, 0)}</p>
        ))}
      </div>
    )
  }
}

export default App