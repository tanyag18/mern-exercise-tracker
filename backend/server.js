const express = require('express'); //packegase required
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express(); // create express server
const port = process.env.PORT || 5000;  //port

app.use(cors());  // midware
app.use(express.json()); //parse json

const uri = process.env.ATLAS_URI;   // database uri from mongoDB
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology: true }
);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

//to use route files
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter); // load all data in exercise file
app.use('/users', usersRouter);  // load all data in user file

app.listen(port, () => {   // starts the server
    console.log(`Server is running on port: ${port}`);
});