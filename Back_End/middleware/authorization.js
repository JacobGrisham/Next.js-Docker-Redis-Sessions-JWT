const redis = require("redis");
const redisClient = redis.createClient(process.env.REDIS_URL);

const requireAuth = (req, res, next) => {
  const { authorization } = req.headers;
  console.log(authorization);
  if (!authorization) {
    return res.status(401).json('Unauthorized: problem with requireAuth: no authorization header');
  }
  return redisClient.get(authorization, (err, reply) => {
    if (err || !reply) {
      return res.status(401).json(`Unauthorized: problem with requireAuth: no reply or error: ${err}`);
    }
    // next() is important in middleware since it passes things through to the next function
    return next();
  });
}

module.exports = {
  requireAuth: requireAuth
}