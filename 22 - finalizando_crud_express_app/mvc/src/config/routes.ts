import { Router } from "express";
import { UsuarioController } from "../controllers/usuario_controller";
import { HomeController } from "../controllers/home_controller";

const router = Router();
router.get("/", HomeController.index);
router.get("/sobre", HomeController.sobre);

router.get("/usuarios", UsuarioController.index);
router.get("/usuarios/novo", UsuarioController.novo);
router.post("/usuarios/criar", UsuarioController.criar);
router.post("/usuarios/criar-json", UsuarioController.criar_json);
router.get("/usuarios/:id/editar", UsuarioController.editar);
router.post("/usuarios/:id/alterar", UsuarioController.alterar);
router.post("/usuarios/:id/excluir", UsuarioController.delete);

export default router

