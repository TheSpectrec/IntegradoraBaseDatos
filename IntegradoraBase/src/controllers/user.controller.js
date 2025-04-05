// controllers/user.controller.js
const userService = require('../services/user.service');
const user = require('../models/user.model.js');
const userRepository = require('../repositories/user.repository.js');
const jwt = require('jsonwebtoken');


exports.getAll = async (req, res) => {
  try {
    const estado = req.query.estado || null;
    const users = await userService.getUsers(estado); // ✅ Usa el servicio
    res.json(users);
  } catch (err) {
    console.error("Error al obtener usuarios:", err);
    res.status(500).json({ message: 'Error interno', error: err.message });
  }
};


exports.create = async (req, res) => {
  try {
    console.log("📥 Payload recibido:", req.body);
    const saved = await userService.createUser(req.body);
    res.status(201).json(saved);
  } catch (err) {
    console.error("❌ Error al crear usuario:", err);
    res.status(400).json({ message: err.message || 'Error al crear usuario' });
  }
};

exports.update = async (req, res) => {
  try {
    const updated = await userService.updateUser(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Error al actualizar usuario', error: err.message });
  }
};

exports.toggleEstado = async (req, res) => {
  try {
    const updated = await userService.toggleEstado(req.params.id);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Error al cambiar estado', error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, message: "Usuario y contraseña son obligatorios" });
    }

    const user = await userService.login(username, password); // ✅ Usa el servicio

    const token = jwt.sign({ _id: user._id }, "secreta", { expiresIn: '1h' });

    console.log("✅ Usuario autenticado:", username);

    return res.status(200).json({
      success: true,
      message: "Bienvenido",
      data: {
        _id: user._id,
        username: user.username,
        tipoUsuario: user.tipoUsuario,
        token,
      },
    });
  } catch (err) {
    console.error("❌ Error en login:", err);
    return res.status(401).json({ success: false, message: err.message });
  }
};

// user.controller.js
exports.checkUsername = async (req, res) => {
  const { username } = req.query;
  const exists = await user.exists({ username });
  res.json({ exists: Boolean(exists) });
};

exports.checkPhone = async (req, res) => {
  const { phone } = req.query;
  const exists = await user.exists({ phone });
  res.json({ exists: Boolean(exists) });
};

