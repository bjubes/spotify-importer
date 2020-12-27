import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Home } from './Home'
import { Callback } from './Callback'
import { XMLDropzone } from './XMLDropzone'
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/callback">
          <Callback />
        </Route>
        <Route path="/">
          <Home />
          < XMLDropzone />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
