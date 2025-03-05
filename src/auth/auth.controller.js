import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { response, request } from "express";
import Admin from "../user/admin.model.js"; 

export const login = async (req = request, res = response) => {
  const { email, password } = req.body;
  try {

    const admin = await Admin.findOne({ email, role: "ADMIN_ROLE" });
    if (!admin) {
      return res.status(404).json({
        success: false,
        msg: 'Administrador no encontrado'
      });
    }

    
    const validPassword = await argon2.verify(admin.password, password);
    if (!validPassword) {
      return res.status(400).json({
        success: false,
        msg: 'Contraseña incorrecta'
      });
    }

  
    const token = jwt.sign({ uid: admin._id }, process.env.SECRETORPRIVATEKEY, { expiresIn: "4h" });
    res.json({
      success: true,
      admin,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      msg: 'Error al iniciar sesión'
    });
  }
};
