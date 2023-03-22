import express from 'express';
import { engine } from 'express-handlebars';
import morgan from 'morgan';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import route from './routes';
import connect from './config/db';
require('dotenv').config();


const app = express();
const PORT = process.env.PUPPET_PORT || 4000;

app.use(cors());

// HTTP logger
app.use(morgan('combined'));

// Template engine
app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

connect();

app.use(bodyParser.json())
// method

route(app);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
