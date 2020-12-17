const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');

const adminRoute = require('./routes/admin');
const userRoutes = require('./routes/user');

var app = express();

//Middlewares
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(bodyParser.json());

app.use(cors());

app.use('/admin', adminRoute);
app.use('/', userRoutes);

module.exports = app;
