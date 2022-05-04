import logo from './logo.svg'
import './App.css'
import { Ball } from './models/Ball'

function App() {
  const ball = new Ball({ x: 1, dx: 1, dy: 1, omega: 100, rotation: 1, y: 1 })
  console.log('🚀 ~ file: App.tsx ~  line 8 ~ App ~ ball', ball)
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React a a
        </a>
      </header>
    </div>
  )
}

export default App
