import { Router } from "express";
import { check } from "express-validator";
import { createCompany, getCompanies, updateCompany } from "../companies/company.controller.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { validarCampos } from "../middlewares/validar-campos.js";

const router = Router();

router.post(
  "/",
  [
    validarJWT,
    check("name", "El nombre de la empresa es obligatorio").not().isEmpty(),
    check("impactLevel", "El nivel de impacto es obligatorio").not().isEmpty(),
    check("years", "Los años de trayectoria deben ser numéricos").isNumeric(),
    check("category", "La categoría es obligatoria").not().isEmpty(),
    validarCampos
  ],
  createCompany
);

router.get("/", validarJWT, getCompanies);

router.put(
  "/:id",
  [
    validarJWT,
    check("id", "ID inválido").isMongoId(),
    validarCampos
  ],
  updateCompany
);

export default router;
