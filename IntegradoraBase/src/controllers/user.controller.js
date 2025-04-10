const userService = require('../services/user.service');
const UserModel = require('../models/user.model.js'); // ✅ renombrado para evitar conflicto
const userRepository = require('../repositories/user.repository.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// ✅ Obtener todos los usuarios
exports.getAll = async (req, res) => {
  try {
    const estado = req.query.estado || null;
    const users = await userService.getUsers(estado);
    res.json(users);
  } catch (err) {
    console.error("Error al obtener usuarios:", err);
    res.status(500).json({ message: 'Error interno', error: err.message });
  }
};

// ✅ Crear usuario
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

// ✅ Actualizar usuario
exports.update = async (req, res) => {
  try {
    const updated = await userService.updateUser(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Error al actualizar usuario', error: err.message });
  }
};

// ✅ Cambiar estado (activar/desactivar)
exports.toggleEstado = async (req, res) => {
  try {
    const updated = await userService.toggleEstado(req.params.id);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Error al cambiar estado', error: err.message });
  }
};

// ✅ Login para plataforma web
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Usuario y contraseña son obligatorios"
      });
    }

    const user = await userService.login(username, password);

    const token = jwt.sign(
      { _id: user._id, tipoUsuario: user.tipoUsuario },
      process.env.JWT_SECRET || "secreta",
      { expiresIn: '1h' }
    );

    console.log("✅ Usuario autenticado (web):", username);

    return res.status(200).json({
      success: true,
      message: "Bienvenido",
      data: {
        _id: user._id,
        username: user.username,
        tipoUsuario: user.tipoUsuario,
        token
      }
    });
  } catch (err) {
    console.error("❌ Error en login web:", err);
    return res.status(401).json({
      success: false,
      message: err.message || 'Error al iniciar sesión'
    });
  }
};

// ✅ Login para app móvil (residente o guardia)
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Usuario y contraseña son obligatorios'
      });
    }

    const user = await userService.findByUsername(username); // ⚠️ Este es el usuario real

    if (!user) return res.status(404).json({ success: false, message: 'Usuario no encontrado' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ success: false, message: 'Contraseña incorrecta' });

    // Aquí realizamos el populate para la casa asociada al usuario
    await user.populate('house_id');  // Poblamos la casa asociada al usuario

    const token = jwt.sign(
      { id: user._id, tipoUsuario: user.tipoUsuario },
      process.env.JWT_SECRET || 'secreto123',
      { expiresIn: '1d' }
    );

    // ✅ Imprimir datos enviados para verificar
    console.log('🧠 Usuario logueado en app:', {
      _id: user._id,
      username: user.username,
      nombre: user.nombre,
      apellido: user.apellido,
      tipoUsuario: user.tipoUsuario,
      phone: user.phone,
      birthday: user.birthday,
      house_id: user.house_id  // Ahora la casa tiene toda la información
    });

    return res.json({
      token,
      user: {
        _id: user._id,
        username: user.username,
        nombre: user.nombre,
        apellido: user.apellido,
        tipoUsuario: user.tipoUsuario,
        phone: user.phone,
        birthday: user.birthday,
        house_id: user.house_id // Aquí ya se incluye toda la información de la casa
      }
    });
  } catch (err) {
    console.error('❌ Error en loginUser:', err);
    res.status(500).json({ success: false, message: 'Error del servidor' });
  }
};


// ✅ Verificar si existe un username
exports.checkUsername = async (req, res) => {
  const { username } = req.query;
  const exists = await UserModel.exists({ username });
  res.json({ exists: Boolean(exists) });
};

// ✅ Verificar si existe un teléfono
exports.checkPhone = async (req, res) => {
  const { phone } = req.query;
  const exists = await UserModel.exists({ phone });
        res.json({ exists: Boolean(exists) });
};
