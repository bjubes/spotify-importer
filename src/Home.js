
import { useEffect, useState} from 'react'
import Constants from './Constants'
import { Button, Jumbotron } from 'react-bootstrap'
import {SpotifyUser} from './SpotifyUser'
export const Home = () => {
  //defauts to null
  const [tokenData, setTokenData] = useState(JSON.parse(window.localStorage.getItem('tokenData')))

  //show OAuth popup
  const handleSpotifyLogin = () => {
    var url = "https://accounts.spotify.com/authorize?"
    url += `client_id=${Constants.SPOTIFY_CLIENT_ID}&`
    url += `redirect_uri=${Constants.SPOTIFY_AUTH_REDIRECT_URL}&`
    url += `scope=${Constants.SPOTIFY_PERM_SCOPE}&`
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
    window.addEventListener('storage', () => {
      const data = JSON.parse(window.localStorage.getItem('token'))
      console.log(data)
      if (data.token) {
        setTokenData(data)
      } else {
        //OAuth declined.
      }
    })
  }, [])

  //persist tokenData through reload
  useEffect(() => {
    localStorage.setItem('tokenData',JSON.stringify(tokenData))
  },[tokenData])
  
  return (
    <div className="App">
      <Jumbotron>
        <h1>Spotify Importer</h1>
        <p>Import your iTunes or Apple Music library into Spotify</p>
        {tokenData == null && <Button variant="primary" onClick={handleSpotifyLogin}>Login with Spotify</Button>}
        {tokenData != null && < SpotifyUser {...tokenData} signOut={()=>{setTokenData(null)}} />}
      </Jumbotron>
    </div>
  )
}