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

// RESTIFUL
router.get("/usuarios", UsuarioController.index);
router.post("/usuarios", UsuarioController.criar);
router.get("/usuarios/:id", UsuarioController.buscarUsuarioPorId);
router.put("/usuarios/:id", UsuarioController.alterar);
router.patch("/usuarios/:id", UsuarioController.alterarNome);
router.delete("/usuarios/:id", UsuarioController.delete);

export default router

