import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {Home} from './Home'
import {Callback} from './Callback'
function App() {
  return (
    <Router>
      <Home />
      <Switch>
        <Route path="/callback">
          <Callback />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
