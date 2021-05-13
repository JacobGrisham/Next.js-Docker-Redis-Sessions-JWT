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
          .then(user => {user[0]})
          .catch(err => Promise.reject(`unable to get user: ${err}`))
      } else {
        Promise.reject('wrong credentials')
      }
    })
    .catch(err => Promise.reject(`wrong credentials: ${err}`))
}

const getAuthTokenID = () => {
  console.log('JWT Token goes here')
}

const authentication = (db, bcrypt) => (req, res) => {
  const { authorization } = req.headers;
  authorization ? getAuthTokenID() : 
    handleSignin(req, res, db, bcrypt)
      .then(data => res.json(data))
      .catch(err => res.status(400).json(err))
}

module.exports = {
  authentication: authentication
}