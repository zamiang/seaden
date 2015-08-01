let express = require('express');
let routes = require('./routes');

let app = module.exports = express();
app.set('views', __dirname);
app.set('view engine', 'jade');

app.get('/posts', routes.index);
