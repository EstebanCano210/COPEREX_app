import { Schema, model } from 'mongoose';

const AdminSchema = new Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
  },
  email: {
    type: String,
    required: [true, 'El correo es obligatorio'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
  },
  role: {
    type: String,
    default: 'ADMIN_ROLE',
    enum: ['ADMIN_ROLE'],
  },
  estado: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
  versionKey: false,
});

AdminSchema.methods.toJSON = function () {
  const { __v, password, _id, ...admin } = this.toObject();
  admin.uid = _id;
  return admin;
};

export default model('Admin', AdminSchema);
