const perms = [
  "user-read-private",
  "user-read-email",
  "playlist-modify-public",
  "playlist-modify-private"
]

class Constants {
  static SPOTIFY_CLIENT_ID = "23eb37f53ae043208f66d85a3d7080c1"
  static SPOTIFY_AUTH_REDIRECT_URL = encodeURIComponent("http://localhost:3000/callback")
  static SPOTIFY_PERM_SCOPE = perms.join("%20")
}

module.exports = Constants