import { Schema, model } from 'mongoose';

const CompanySchema = new Schema({
  name: {
    type: String,
    required: [true, 'El nombre de la empresa es obligatorio'],
    unique: true,
  },
  impactLevel: {
    type: String,
    required: [true, 'El nivel de impacto es obligatorio'],
    enum: ["Alto", "Medio", "Bajo"],
  },
  years: {
    type: Number,
    required: [true, 'Los años de trayectoria son obligatorios'],
  },
  category: {
    type: String,
    required: [true, 'La categoría es obligatoria'],
  },
  estado: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
  versionKey: false,
});

export default model('Company', CompanySchema);
