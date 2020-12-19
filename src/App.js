import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Jumbotron } from 'react-bootstrap'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {useEffect} from 'react'

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
    const width = 300
    const height = 400
    const left = window.outerWidth / 2;
    const top = 140;

    const windowFeatures = `toolbar=0,scrollbars=1,status=1,resizable=0,location=1,menuBar=0,width=${width},height=${height},top=${top},left=${left}`;
    window.open(url,'Login with Spotify',windowFeatures)
  }

  useEffect(()=>{
    window.addEventListener('storage', ()=> {
      console.log(JSON.parse(window.localStorage.getItem('token')))
    })
  },[])
  
  return (
   <div className="App">
     <Jumbotron>
      <h1>Spotify Importer</h1>
      <p>Import your iTunes or Apple Music library into Spotify</p>
      <Button variant="primary" onClick={handleSpotifyLogin}>Login with Spotify</Button>
    </Jumbotron>
  </div>
  )
}

function Callback() {
  const hash_fragment = window.location.hash
  const params = new URLSearchParams(hash_fragment.substring(1))
  const token = params.get('access_token')
  const tokenType = params.get('token_type')
  const expiresIn = parseInt(params.get('expires_in'))
  const state = params.get('state')  
  const date = new Date()
  date.setSeconds( date.getSeconds() + expiresIn)
  const token_info = {
    token: token,
    tokenType: tokenType,
    expireDate: date,
  }

  window.localStorage.setItem('token',JSON.stringify(token_info))
  console.log(date)
  window.close()
  return (
    <p>Auth Complete. Return to main window.</p>
  )
}

export default App;
