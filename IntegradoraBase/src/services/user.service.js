const House = require('../models/house.model'); // 👈 esto faltaba
const User = require('../models/user.model');
const mongoose = require('mongoose');

exports.getUsers = async (estado) => {
  const filtro = {};
  if (estado === 'Activo') filtro.enabled = true;
  if (estado === 'Inactivo') filtro.enabled = false;

  try {
    return await User.find(filtro).populate('house_id');
  } catch (err) {
    console.error("❌ Error en populate house_id:", err);
    throw new Error("Error al obtener usuarios con casas");
  }
};


exports.createUser = async (data) => {
  data.username = data.username?.trim();
  data.tipoUsuario = data.tipoUsuario?.toUpperCase();

  if (data.tipoUsuario === 'RESIDENTE') {
    if (!data.house_id || !mongoose.isValidObjectId(data.house_id)) {
      throw new Error('Se requiere una casa válida para un residente.');
    }

    const yaAsignado = await User.findOne({
      house_id: data.house_id,
      tipoUsuario: 'RESIDENTE',
    });

    if (yaAsignado) {
      throw new Error('Esa casa ya está asignada a otro residente.');
    }
  } else {
    data.house_id = null;
  }

  const nuevoUsuario = new User(data);
  return await nuevoUsuario.save();
};

exports.updateUser = async (id, data) => {
  data.username = data.username?.trim();
  data.tipoUsuario = data.tipoUsuario?.toUpperCase();

  if (data.tipoUsuario === 'RESIDENTE') {
    if (!data.house_id || !mongoose.isValidObjectId(data.house_id)) {
      throw new Error('Se requiere una casa válida para un residente.');
    }

    const yaAsignado = await User.findOne({
      house_id: data.house_id,
      tipoUsuario: 'RESIDENTE',
      _id: { $ne: id },
    });

    if (yaAsignado) {
      throw new Error('Esa casa ya está asignada a otro residente.');
    }
  } else {
    data.house_id = null;
  }

  return await User.findByIdAndUpdate(id, data, { new: true }).populate('house_id');
};

exports.toggleEstado = async (id) => {
  const user = await User.findById(id);
  if (!user) throw new Error('Usuario no encontrado');

  user.enabled = !user.enabled;
  return await user.save();
};
