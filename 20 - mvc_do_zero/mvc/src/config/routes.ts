import { Router } from "express";
import { UsuarioController } from "../controllers/usuario_controller";
import { HomeController } from "../controllers/home_controller";

const router = Router();
router.get("/", HomeController.index);
router.get("/sobre", HomeController.sobre);

router.get("/usuarios", UsuarioController.index);
router.get("/usuarios/novo", UsuarioController.novo);
router.post("/usuarios/criar", UsuarioController.criar);

export default router

