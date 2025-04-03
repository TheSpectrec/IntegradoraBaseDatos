const mongoose = require('mongoose');

const visitTypeSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('VisitType', visitTypeSchema);
