var uniqid = require('uniqid');
const csv = require('csv-parser');
const fs = require('fs');

var mongoose = require('mongoose');

//DB URL
var mongoDB = 'mongodb://localhost/movie';

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
var Schema = mongoose.Schema;
const adminSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const Admin = mongoose.model('Admin', adminSchema); //create collection

async function addAdmin() {
  const adminData = [{
    username: 'sudarshana',
    password: 'YWRtaW4='
  }, {
    username: 'admin',
    password: 'YWRtaW4='
  }]
  try {
    await Admin.insertMany(adminData)
    console.log("successfully added Admin entry!");
  } catch (error) {
    console.log("error in inserting");
  }
}

addAdmin();
db.on('error', console.error.bind(console, 'MongoDB connection error:'));




