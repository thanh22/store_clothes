const hbs = require('express-handlebars');
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';

require('dotenv').config();
const app = express();
const port = process.env.PORT || 8888;

app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

const route = require('./routes');
require('../connection_db');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

// http logger
// app.use(morgan('combined'));

//template engine
app.engine('hbs', hbs.engine({
  extname: 'hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

// routes init
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})