let request = require('request');
let queryString = require('query-string');
let CONFIG = require('./config');
let BASE_URL = 'https://accounts.spotify.com/';
let SCOPES = 'user-read-private playlist-modify-private playlist-modify-public playlist-read-private';
let URL = 'https://api.spotify.com/v1/';
let History = require('./history');

const me = (token) => {
    return new Promise((resolve, reject) => {
        let authOptions = {
            url: URL + 'me',
            headers: {
                Authorization: 'Bearer ' + token
            }
        }

        request.get(authOptions, (err, response, body) => {
            resolve(JSON.parse(body))
        })
    })

}

const addToPlaylist = (playlist_id, user_id, uris, token) => {
    return new Promise((resolve, reject) => {
        let authOptions = {
            url: URL + `users/${user_id}/playlists/${playlist_id}/tracks`,
            headers: {
                Authorization: 'Bearer '+ token,
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                uris: uris
            })
        }

        request.post(authOptions, (err, response, body) => {
            resolve('Right');
        })
    })
}


module.exports = {
	authorize: (req, res) => {
		let href = BASE_URL + 'authorize?' + queryString.stringify(
			{
				client_id: CONFIG.SPOTIFY_CLIENT_ID,
				response_type: 'code',
				state: '123',
				redirect_uri: CONFIG.REDIRECT_URI,
				scope: SCOPES
			}
		)
		res.send({href: href})

	},
	exchange: (req, res) => {
		var authOptions = {
	     	url: 'https://accounts.spotify.com/api/token',
	     	form: {
	       		code: req.query.code,
	    		redirect_uri: CONFIG.REDIRECT_URI,
        		grant_type: 'authorization_code'
	      	},
	      	headers: {
	    		'Authorization': 'Basic ' + (new Buffer(CONFIG.SPOTIFY_CLIENT_ID + ':' + CONFIG.SECRET_KEY).toString('base64'))
	     	},
	    	json: true
	    };
		request.post(authOptions, (err, response, body) => {
			if(err){
				return res.status(400).send({error: err});
			}
			if(body.access_token){
				return res.redirect(`http://localhost:8080/#${body.access_token}`);
			}
			return res.status(400).send({error: 'Undefined error'})
		})
	},
	search: (query, token, doc) => {
        return new Promise((resolve, reject) => {
            let authOptions = {
                url: URL + 'search?q=' + encodeURI(query) + '&type=track,artist&limit=1 ',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'content-type': 'application/json'
                }
            }

            request.get(authOptions, (err, response, body) => {
                let json = JSON.parse(body)
                let id, cover_url, uri, popularity, explicit, duration, danceability, energy, key, loudness, tempo, album = undefined
                try {
                    console.log('Gotten metadata body:')
                    console.log(body)
                    id = json.tracks.items[0].id;
                    uri = json.tracks.items[0].uri;
                    popularity = json.tracks.items[0].popularity;
                    explicit = json.tracks.items[0].explicit;
                    duration = json.tracks.items[0].duration_ms;
                    album = json.tracks.items[0].album.name;
                    cover_url = json.tracks.items[0].album.images[0].url;

                    // Get audio track features for the track
                    let authOptions = {
                        url: URL + 'audio-features/' + id,
                        headers: {
                            'Authorization': 'Bearer ' + token,
                            'content-type': 'application/json'
                        }
                    }
                    request.get(authOptions, (err, response, body) => {
                        let json = JSON.parse(body)
                        try {
                            danceability = json.danceability;
                            energy = json.energy;
                            key = json.key;
                            loudness = json.loudness;
                            tempo = json.tempo;
                        } catch(exception) {
                            console.log('Failed to fetch innermost metadata')
                            // console.log(exception)
                        }
                        doc.track_id = id;
                        doc.cover_url = cover_url;
                        doc.uri = uri;
                        doc.popularity = popularity;
                        doc.explicit = explicit;
                        doc.duration = duration;
                        doc.meta = true;
                        doc.danceability = danceability;
                        doc.energy = energy;
                        doc.key = key;
                        doc.loudness = loudness;
                        doc.tempo = tempo;
                        doc.album = album;

                        doc.save((err) => {
                            resolve();
                        })
                    })
                }
                catch(exception) {
                    console.log('Failed to fetch outermost metadata')
                    // console.log(exception)

                    doc.track_id = id;
                    doc.cover_url = cover_url;
                    doc.uri = uri;
                    doc.popularity = popularity;
                    doc.explicit = explicit;
                    doc.duration = duration;
                    doc.meta = true;
                    doc.danceability = danceability;
                    doc.energy = energy;
                    doc.key = key;
                    doc.loudness = loudness;
                    doc.tempo = tempo;
                    doc.album = album;

                    doc.save((err) => {
                        resolve();
                    })
                }
    		})
        })
	},

    // see function above module exports
    me: me,
    addToPlaylist: addToPlaylist,

    createPlaylist: (name, token, res) => {
        me(token).then((user_data) => {
            let user_id = user_data.id;

            let authOptions = {
                url: URL + `users/${user_id}/playlists`,
                headers: {
                    Authorization: 'Bearer ' + token,
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    name: name || 'Testlist1'
                })
            }

            request.post(authOptions, (err, response, body) => {
                body = JSON.parse(body)
                let playlist_id = body.id;
                History.find({uri: { $ne: null }}).select('uri').then((uris) => {
                    uris = uris.map((obj) => {
                        return obj.uri
                    })

                    addToPlaylist(playlist_id, user_id, uris, token).then(() => {
                        res.send('Yellow type')
                    })
                })
            })
        })
    }
}
