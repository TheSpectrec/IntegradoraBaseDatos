import mongoose from 'mongoose';

const visitaSchema = new mongoose.Schema({
  fecha: { type: Date, required: true },
  hora: { type: String, required: true },
  numeroPersonas: { type: Number, required: true },
  descripcion: { type: String, required: true },
  tipoVisita: {
    type: String,
    enum: ['Familiar', 'Técnica'],
    required: true
  },
  placasVehiculo: { type: String },
  contrasena: { type: String }, // palabra visible, no se encripta
  numeroCasa: { type: String, required: true },
  nombreVisitante: { type: String, required: true },
  estado: {
    type: String,
    enum: ['Pendiente', 'Aprobada', 'Cancelada'],
    default: 'Pendiente'
  },
  residenteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Visita', visitaSchema);
