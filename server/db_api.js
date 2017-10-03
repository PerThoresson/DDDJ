let History = require('./history');
let State = require('./state');
let API = require('./spotify_api')
let P = require('bluebird');

module.exports = {
	history: (req, res) => {
		History.find().exec((err, documents) => {
			if(err) {
				console.log('The error', err)
				return res.status(400).send({error: 'Error history'})
			}
            promises = []
			for(doc of documents){
				if(!doc.meta){
					// We do not have meta info, fetch it from Spotify
					promises.push(API.search(doc.title + ' ' + doc.artist, req.query.token, doc));
				}
			}
			P.all(promises).then((values) => {
				console.log('Promises resolved')
				return res.send(documents);
			})
		})
	},
	current: (req, res) => {
		State.find().exec((err, documents) => {
			if(err){
				return res.status(400).send({error: 'Error getting current data'})
			}
			return res.send(documents);
		})
	},
	chart_data: (req, res) => {
		History.find().sort('timestamp').exec((err, documents) => {
			timestamps = documents.map((obj) => {
				return new Date(obj.timestamp).getHours() + ':' + new Date(obj.timestamp).getMinutes()
			})
			popularity = documents.map((obj) => {
				return obj.popularity ? obj.popularity : 0;
			})
			energy = documents.map((obj) => {
				return obj.energy ? obj.energy : 0;
			})
			danceabilty = documents.map((obj) => {
				return obj.danceability ? obj.danceability : 0;
			})
			loudness = documents.map((obj) => {
				return obj.loudness ? obj.loudness : 0;
			})
			tempo = documents.map((obj) => {
				return obj.tempo ? obj.tempo : 0;
			})

			res.send({
				xAxis: {
					categories: timestamps,
				},
				series: [
					{
						name: 'Popularity',
						data: popularity
					},
					{
						name: 'Energy',
						data: energy
					},
					{
						name: 'Danceabilty',
						data: danceabilty
					},
					{
						name: 'Loudness',
						data: loudness
					},
					{
						name: 'Tempo',
						data: tempo
					}
				]
			});
		})
    }
}
