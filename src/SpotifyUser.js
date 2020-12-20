export const SpotifyUser = (props) => {

  return (
    <div>
      <p>Welcome, User!</p>
      {props.token && <p>{props.token}</p>}
    </div>
  )
}