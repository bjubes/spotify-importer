import {useState} from 'react'
import {Button} from 'react-bootstrap'

export const SpotifyUser = (props) => {
const [name, setName] = useState(null)
const [email, setEmail] = useState(null)
  fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${props.token}`
    }
  }).then(x => x.json())
    .then(data => {
     setName(data['display_name']) 
     setEmail(data['email'])
    })

  return (
    <div>
      {name && <p>Signed in as {name} ({email})</p> }
      <Button variant="danger" onClick={props.signOut}>Sign Out</Button>
    </div>
  )
}