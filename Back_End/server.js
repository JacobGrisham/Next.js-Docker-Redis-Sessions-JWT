const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
// const helmet = require('helmet');
const cors = require('cors');
const knex = require('knex');
// const morgan = require('morgan');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const auth = require('./middleware/authorization');

const db = knex({
  client: 'pg',
  connection: {
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB
  }
});

const app = express();

// Enable logging
// app.use(morgan('combined'));
app.use(bodyParser.json());

// Enable pre-flight across-the-board
// app.options('*', cors()); // include before all other routes
// Enable CORS
// var corsOptions = {
//   origin: ["http://localhost:3000", "http://localhost:3001"],
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   preflightContinue: false,
//   optionsSuccessStatus: 204
// }
const whitelist = ['http://localhost:3001']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions))

// Sets Referrer-Policy
// app.use(
//   helmet.referrerPolicy({
//     policy: "unsafe-url"
//   })
// );

// CRUD API Routes
app.get('/', (req, res)=> { res.send(db.users) });
app.post('/signin', signin.authentication(db, bcrypt));
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });
app.get('/profile/:id', auth.requireAuth, (req, res) => { profile.handleProfileGet(req, res, db)});
app.post('/profile/:id',auth.requireAuth, (req, res) => { profile.handleProfileUpdate(req, res, db)});
app.put('/image', auth.requireAuth, (req, res) => { image.handleImage(req, res, db)});
app.post('/imageurl', auth.requireAuth, (req, res) => { image.handleApiCall(req, res)});

app.listen(3000, ()=> {
  console.log('CORS-enabled API web server running on port 3000');
});