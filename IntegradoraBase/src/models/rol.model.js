const mongoose = require('mongoose');

const rolSchema = new mongoose.Schema({
  nombre: { type: String, required: true, unique: true },
}, { timestamps: true });

module.exports = mongoose.model('Rol', rolSchema);
