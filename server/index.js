let express = require('express');
let request = require('request');
let morgan = require('morgan');
let CONFIG = require('./config');
let API = require('./spotify_api');
let DB = require('./db_api');
let History = require('./history');
let State = require('./state');
let Promise = require('bluebird');
let mongoose = Promise.promisifyAll(require('mongoose'));
let bodyParser = require('body-parser');



let app = express();

mongoose.connect(CONFIG.DB_URI);

let db = mongoose.connection;

app.use(morgan('dev'));
app.use(bodyParser.json())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
	console.log('The database has connected!')
});

let mock_currently = {
	song_name: 'Levels',
	artist: 'Avicii',
};

app.get('/', (req, res) => {
    res.send('Hello my friend!');
});

app.get('/currently_playing', (req, res) => {
    res.send(mock_currently);
});

app.get('/history', (req, res) => {
	DB.history(req, res);
});

app.get('/login', (req, res) => {
    API.authorize(req, res);
});

app.get('/access', (req, res) => {
    API.exchange(req, res);
});

app.get('/current', (req, res) => {
    DB.current(req, res);
});

app.get('/search', (req, res) => {
	let token = req.query.token;
	API.search('Mockingbird', token);
})

app.get('/me', (req, res) => {
	let token = req.query.token;
	API.me(token).then((data) => {
		console.log('DATA', data);
	})
	res.send('Ok');
})

app.post('/create_playlist', (req, res) => {
	let token = req.query.token;
	let name = req.body.name;
	API.createPlaylist(name, token, res)
})

app.get('/chart_data', (req, res) => {
	DB.chart_data(req, res);
})

app.listen(3000, () => {
    console.log('Whoho app is live listening to port 3000');
});
