const express = require('express');
const http = require('http');
const compression = require('compression');
const app = express();
const server = http.createServer(app);
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(compression());
app.use(cors());
// enables cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


app.use(express.static(`${__dirname}/public`));

// Settings
app.set('port', 8080);

// Middlewares
app.use(express.json({limit: '20mb'}));
// parse application/x-www-form-urlencoded.
app.use(bodyParser.urlencoded({ extended: true , limit: '20mb'}));



// parse application/json.
app.use(bodyParser.json());


app.use(require('./api/routes/routes'));

// set the view engine to ejs
// START THE SERVER
app.listen(app.get('port'), () => {
  console.log(`[SUCCESS]: Servidor iniciado en el [PORT] => ${app.get('port')}.`);
});
