import jwt from "jsonwebtoken";
import { request, response } from "express";
import User from "../user/admin.model.js"; 

export const validarJWT = async (req = request, res = response, next) => {
    const token = req.header("x-token");

    if (!token) {
        return res.status(401).json({
            success: false,
            msg: "No hay token en la petición.",
        });
    }

    try {
        if (!process.env.SECRETORPRIVATEKEY) {
            return res.status(500).json({
                success: false,
                msg: "Error interno del servidor.",
            });
        }

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const user = await User.findById(uid);

        if (!user) {
            return res.status(401).json({
                success: false,
                msg: "Token no válido - usuario no existe en la base de datos.",
            });
        }

        if (!user.estado) {
            return res.status(401).json({
                success: false,
                msg: "Token no válido - usuario desactivado.",
            });
        }

        req.user = {
            uid: user._id,
            username: user.username,
            role: user.role,
        };

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            msg: "Token no válido o expirado.",
        });
    }
};