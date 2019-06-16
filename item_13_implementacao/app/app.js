const express = require('express');
var bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({extended: true}));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.json({ type: 'application/json' }))

app.use(express.static(__dirname + '/public'));
app.use(require('./routes'))

app.listen(8080, () => console.log('App listening on port 8080!'));