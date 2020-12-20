import { propTypes } from "react-bootstrap/esm/Image"

//Component is only loaded when spotify responds to auth request.
export const Callback = () => {
  const hash_fragment = window.location.hash
  const params = new URLSearchParams(hash_fragment.substring(1))
  const token = params.get('access_token')
  const tokenType = params.get('token_type')
  const expiresIn = parseInt(params.get('expires_in'))
  const state = params.get('state')
  const csrf = window.localStorage.getItem('csrf')
  if (state !== csrf) {
    //crsf detected
    return null
  }
  window.localStorage.removeItem('csrf')
  const date = new Date()
  date.setSeconds(date.getSeconds() + expiresIn)
  const token_info = {
    token: token,
    tokenType: tokenType,
    expireDate: date,
  }

  window.localStorage.setItem('token', JSON.stringify(token_info))
  window.close()
  return (
    <p>Auth Complete. Return to main window.</p>
  )
}