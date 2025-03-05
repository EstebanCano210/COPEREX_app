// middlewares/validator.js
import { body } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
// Si tienes validaciones custom (como existenteEmail) puedes importarlas y usarlas
// import { existenteEmail } from "../helpers/db-validator.js";

export const loginValidator = [
  body("email", "El correo es obligatorio y debe ser válido")
    .exists({ checkFalsy: true })
    .isEmail(),
  body("password", "La contraseña es obligatoria y debe tener al menos 8 caracteres")
    .exists({ checkFalsy: true })
    .isLength({ min: 8 }),
  validarCampos
];
