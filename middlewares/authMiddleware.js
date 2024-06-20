import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const authenticate = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied' });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Access denied' });
    }

    req.user = await User.findByPk(user.id);
    next();
  });
};

const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
};

const authorizeClient = (req, res, next) => {
  if (req.user.role !== 'client') {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
};

export { authenticate, authorizeAdmin, authorizeClient };

