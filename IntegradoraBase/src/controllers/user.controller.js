// controllers/user.controller.js
const userService = require('../services/user.service');
const User = require('../models/user.model');

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