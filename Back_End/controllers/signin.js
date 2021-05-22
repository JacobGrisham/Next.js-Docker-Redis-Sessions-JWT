const { json } = require("body-parser");
const jwt = require('jsonwebtoken');
const redis = require("redis");
const redisClient = redis.createClient(process.env.REDIS_URL);

const handleSignin = (db, bcrypt, req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return Promise.reject('incorrect form submission');
  }
  return db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db.select('*').from('users')
          .where('email', '=', email)
          .then(user => user[0])
          .catch(err => Promise.reject(`unable to get user: ${err}`))
      } else {
        Promise.reject('wrong credentials')
      }
    })
    .catch(err => Promise.reject(`wrong credentials: ${err}`))
}

const getAuthTokenID = (req, res) => {
  const { authorization } = req.headers;
  console.log(authorization);
  return redisClient.get(authorization, (err, reply) => {
    if (err || !reply) {
      return res.status(400).json(`Unauthorized: problem with getAuthTokenID: error: ${err}`);
    }
    return res.json({id: reply});
  });
}

const setToken = (tokenKey,idValue) => {
  return Promise.resolve(redisClient.set(tokenKey, idValue));
}

const createSession = (user) => {
  const {email, id} = user;
  const token = signToken(email);
  return setToken(token, id)
    .then(() => { 
      return  {success: 'true', userId: id, token: token }
    })
    .catch(console.log);
}

const signToken = (email) => {
  const jwtPayload = { email }
  return jwt.sign(jwtPayload, process.env.JWT, { expiresIn: '2 days' });
}

const authentication = (db, bcrypt) => (req, res) => {
  const { authorization } = req.headers;
  return authorization ? getAuthTokenID(req, res) : 
    handleSignin(db, bcrypt, req, res)
      .then(data => {
        return data.id && data.email ? createSession(data) : Promise.reject('user id and/or email does not exist') 
      })
      .then(session => res.json(session))
      .catch(err => res.status(400).json(err));
}

module.exports = {
  authentication: authentication
}