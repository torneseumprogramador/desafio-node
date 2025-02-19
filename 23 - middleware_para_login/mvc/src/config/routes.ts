import { Router } from "express";
import { UsuarioController } from "../controllers/usuario_controller";
import { HomeController } from "../controllers/home_controller";
import { LoginController } from "../controllers/login_controller";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();
router.get("/", HomeController.index);
router.get("/sobre", HomeController.sobre);

router.get("/login", LoginController.index);
router.get("/sair", LoginController.sair);
router.get("/login/cadastro", LoginController.cadastro);
router.post("/login/cadastrar", LoginController.cadastrar);
router.post("/login", LoginController.logar);

router.get("/usuarios", authMiddleware, UsuarioController.index);
router.get("/usuarios/novo", authMiddleware, UsuarioController.novo);
router.post("/usuarios/criar", authMiddleware, UsuarioController.criar);
router.post("/usuarios/criar-json", authMiddleware, UsuarioController.criar_json);
router.get("/usuarios/:id/editar", authMiddleware, UsuarioController.editar);
router.post("/usuarios/:id/alterar", authMiddleware, UsuarioController.alterar);
router.post("/usuarios/:id/excluir", authMiddleware, UsuarioController.delete);

export default router

