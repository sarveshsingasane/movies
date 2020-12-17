const mongoose = require('mongoose');

const app = require('./app');
const conf = require('./conf/development.json');

const { api, mongo } = conf;
const API_SERVER_PORT = process.env.PORT || api.port;

const URI = `mongodb://${mongo.host}:${mongo.port}/${mongo.db}`;

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to Database');
  app.listen(API_SERVER_PORT, () => {
    console.log('Server is running on port', API_SERVER_PORT);
  });
});