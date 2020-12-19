import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact={true}>
          <Home />
        </Route>
        <Route path="/callback">
          <Callback />
        </Route>
      </Switch>
    </Router>
  );
}

function Home() {
  const spotifyClientID = "23eb37f53ae043208f66d85a3d7080c1"
  const redirectUrl = encodeURIComponent("http://localhost:3000/callback")
  const scope = "user-read-private%20user-read-email%20playlist-modify-public%20playlist-modify-private"
  const handleSpotifyLogin = () => {
    var url = "https://accounts.spotify.com/authorize?"
    url += `client_id=${spotifyClientID}&`
    url += `redirect_uri=${redirectUrl}&`
    url += `scope=${scope}&`
    url += "response_type=token"
    console.log(url)
    window.open(url)
  }
  
  return (
   <div className="App">
  <Button variant="primary" onClick={handleSpotifyLogin}>Login with Spotify</Button>
</div>
  )
}

function Callback() {
  const hash_fragment = window.location.hash
  const params = new URLSearchParams(hash_fragment.substring(1))
  const token = params.get('access_token')
  const tokenType = params.get('token_type')
  const expiresIn = params.get('expires_in')
  const state = params.get('state')  
  return (
    <div>
      <p>token: {token}</p>
      <p>expires in: {expiresIn} seconds</p>
    </div>
  )
}

export default App;
