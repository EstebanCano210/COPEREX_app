import { Router } from "express";
import { generateReport } from "../report/report.controller.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.get("/Report", validarJWT, generateReport);

export default router;
