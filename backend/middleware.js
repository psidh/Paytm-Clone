const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./config');

const middleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    return res.status(401).json({
      message: 'Invalid Header',
    });
  }

  const token = authHeader.split(' ')[1];
  console.log(token);

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    req.userId = decoded.userId;
    console.log(req.userId);
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({
      message: error,
    });
  }
};

module.exports = {
  middleware,
};
