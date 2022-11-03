const express = require('express');
const { engine } = require('express-handlebars')
const morgan = require('morgan');
const path = require('path');
const app = express();
const port = 3000;
const cors = require('cors');
var bodyParser = require('body-parser')
const route = require('./routes');

app.use(cors());

// HTTP logger
app.use(morgan('combined'));

// Template engine
app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));
const db = require('./config/db');

db.connect();
app.use(bodyParser.json())
// method

route(app);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


