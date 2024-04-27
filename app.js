require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const mainRoute = require('./routes/main.routes');

const app = express();

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(express.json());
app.set('view engine', 'ejs');

// routes
app.use('/', mainRoute);

// mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net/<dbname>?retryWrites=true&w=majority
const mongoDBConnectionURI = process.env.MONGODB_CONNECTION_STRING;
const serverPort = 5000;

mongoose.connect(mongoDBConnectionURI)
  .then(() => {
    console.log('connection to database successful');
    app.listen(serverPort, () => {
      console.log(`App is listening at port ${serverPort}`);
    });
  });
