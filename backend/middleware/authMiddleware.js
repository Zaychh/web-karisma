const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const bearer = req.headers.authorization;
  if (!bearer) return res.sendStatus(403);
  const token = bearer.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.sendStatus(403);
  }
}

function checkRole(allowedRoles) {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access Denied' });
    }
    next();
  };
}

module.exports = { verifyToken, checkRole };
