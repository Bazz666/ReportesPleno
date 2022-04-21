const express = require('express');

const app = express();

app.use(require('./types/aut.routes'));
app.use(require('./types/generate.document.routes'));
app.use(require('./types/level.routes'));
app.use(require('./types/login.routes'));
app.use(require('./types/demre.routes'));
app.use(require('./types/demre.config.routes'));
app.use(require('./types/asignatura.routes'));


module.exports = app;
