const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'secretoUltraSecreto';

exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token requerido' });

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token inválido o expirado' });
  }
};

// Middleware para roles
exports.requireRole = (role) => (req, res, next) => {
  if (!req.user || req.user.tipoUsuario !== role) {
    return res.status(403).json({ message: 'Acceso denegado' });
  }
  next();
};
