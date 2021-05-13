const handleProfileGet = (req, res, db) => {
  const { id } = req.params;
  db.select('*').from('users').where({id})
    .then(user => {
      if (user.length) {
        res.json(user[0])
      } else {
        res.status(400).json('Not found')
      }
    })
    .catch(err => res.status(400).json('error getting user'))
}

const handleProfileUpdate = (req, res, db) => {
  const { id } = req.params;
  const { name } = req.body.formInput
  db('users')
    .where({ id })
    .update({ name })
    .then(resp => {
      (resp) ? res.json('success') : res.status(400).json('unable to update')
    })
    .catch(err => res.status(400).json(`Ooooops! ${err}`))
}

module.exports = {
  handleProfileGet,
  handleProfileUpdate
}