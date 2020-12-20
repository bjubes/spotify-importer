import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Home } from './Home'
import { Callback } from './Callback'

function dec2hex(dec) {
  return dec.toString(16).padStart(2, "0")
}

// generateId :: Integer -> String
function generateUUID(len) {
  var arr = new Uint8Array((len || 40) / 2)
  window.crypto.getRandomValues(arr)
  return Array.from(arr, dec2hex).join('')
}

function App() {
  const csrfToken = generateUUID(32)
  return (
    <Router>
      <Switch>
        <Route path="/callback">
          <Callback />
        </Route>
        <Route path="/">
          <Home csrf={csrfToken} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
