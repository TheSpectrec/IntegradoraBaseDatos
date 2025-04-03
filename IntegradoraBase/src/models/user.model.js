const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  phone: { type: String, required: true },
  birthday: { type: Date, required: true },
  tipoUsuario: { type: String, enum: ['ADMIN', 'RESIDENTE', 'GUARDIA'], required: true },
  house_id: { type: mongoose.Schema.Types.ObjectId, ref: 'House', default: null },
  enabled: { type: Boolean, default: true }
}, { timestamps: true });


module.exports = mongoose.model('User', userSchema);
