
import { useEffect, useState } from 'react'
import Constants from './Constants'
import { Button, Jumbotron } from 'react-bootstrap'
import { SpotifyUser } from './SpotifyUser'
export const Home = (props) => {
  //defauts to null
  const [tokenData, setTokenData] = useState(JSON.parse(window.localStorage.getItem('tokenData')))

  //show OAuth popup
  const handleSpotifyLogin = () => {
    //put csrf in localStorage so callback can access it
    window.localStorage.setItem('csrf', props.csrf)
    var url = "https://accounts.spotify.com/authorize?"
    url += `client_id=${Constants.SPOTIFY_CLIENT_ID}&`
    url += `redirect_uri=${Constants.SPOTIFY_AUTH_REDIRECT_URL}&`
    url += `scope=${Constants.SPOTIFY_PERM_SCOPE}&`
    url += `state=${props.csrf}&`
    url += "response_type=token"
    const width = 520
    const height = 805
    const left = window.outerWidth / 2;
    const top = 140;

    const windowFeatures = `toolbar=0,scrollbars=1,status=1,resizable=0,location=1,menuBar=0,width=${width},height=${height},top=${top},left=${left}`;
    window.open(url, 'Login with Spotify', windowFeatures)
  }

  //recieve token from OAuth popup
  useEffect(() => {
    const handler = () => {
      const data = JSON.parse(window.localStorage.getItem('token'))
      if (!data) return
      if (data.token) {
        setTokenData(data)
      } else {
        //OAuth declined.
      }
      window.localStorage.removeItem('token')
    }
    window.addEventListener('storage', handler, false)
  }, [])

  useEffect(() => {
    //persist tokenData through reload
    localStorage.setItem('tokenData', JSON.stringify(tokenData))
    //invalidate expired token
    if (tokenData && tokenData.expireDate) {
      if (new Date(tokenData.expireDate) < new Date()) {
        console.log("token expired") //remove once tested
        setTokenData(null)
      }
    }
  }, [tokenData])

  return (
    <div className="App">
      <Jumbotron>
        <h1>Spotify Importer</h1>
        <p>Import your iTunes or Apple Music library into Spotify</p>
        {tokenData == null && <Button variant="primary" size="lg" onClick={handleSpotifyLogin}>Login with Spotify</Button>}
        {tokenData != null && < SpotifyUser {...tokenData} signOut={() => { setTokenData(null) }} />}
      </Jumbotron>
    </div>
  )
}