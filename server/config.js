const spotifyClientID = process.env.DDDJ_SPOTIFY_CLIENT_ID
const secretKey = process.env.DDDJ_SECRET_KEY

if (!spotifyClientID) {
    console.log('Environment variable DDDJ_SPOTIFY_CLIENT_ID needs to be set')
    process.exit()
}

if (!secretKey) {
    console.log('Environment variable DDDJ_SECRET_KEY needs to be set')
    process.exit()
}

module.exports = {
	SPOTIFY_CLIENT_ID: spotifyClientID,
	SECRET_KEY: secretKey,
	DB_URI: 'mongodb://localhost/dddj',
	REDIRECT_URI: 'http://localhost:3000/access'
}
