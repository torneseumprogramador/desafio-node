import { Router } from "express";
import { UsuarioController } from "../controllers/usuario_controller";
import { HomeController } from "../controllers/home_controller";
import { LoginController } from "../controllers/login_controller";

const router = Router();
router.get("/", HomeController.index);

router.get("/login", LoginController.index);
router.get("/sair", LoginController.sair);
router.get("/login/cadastro", LoginController.cadastro);
router.post("/login/cadastrar", LoginController.cadastrar);
router.post("/login", LoginController.logar);
router.get("/login/esqueci-senha", LoginController.esqueci_senha);
router.post("/login/esqueci-senha", LoginController.esqueci_senha_enviar);

// RESTIFULL
router.get("/usuarios", UsuarioController.index);
router.post("/usuarios", UsuarioController.criar);
router.get("/usuarios/:id", UsuarioController.buscarUsuarioPorId);
router.get("/usuarios/:id/editar", UsuarioController.editar);
router.post("/usuarios/:id/alterar", UsuarioController.alterar);
router.post("/usuarios/:id/excluir", UsuarioController.delete);

export default router

