import { Router } from "express";
import { UsuarioController } from "../controllers/usuario_controller";

const router = Router();
router.get("/", UsuarioController.index);

export default router

