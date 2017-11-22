const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const app = express();

const teachers = require('./routes/teachers');
const students = require('./routes/students');
const users = require('./routes/users');
const mongo = require('./config/mongo');

app.use(cors())
app.use(bodyParser.json())


mongo.init();
require('./config/passport')(passport);

//passport
app.use(session({ secret: 'secretkey' }));
app.use(passport.initialize());
app.use(passport.session()); 

//routes
app.get('/', (req, res) => res.send("Hello"));
app.post('/users' , users);
app.use('/teachers' , teachers);
app.use('/students', students);


app.listen(3000, () => console.log("app is running on port 3000"));

