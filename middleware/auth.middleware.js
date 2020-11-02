const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'пользователь не авторизован' });
    }
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    req.body.user = decodedToken;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'пользователь не авторизован' });
  }
};
