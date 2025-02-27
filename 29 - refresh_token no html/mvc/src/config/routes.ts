import { Router } from "express";
import { UsuarioController } from "../controllers/usuario_controller";
import { HomeController } from "../controllers/home_controller";
import { LoginController } from "../controllers/login_controller";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();
router.get("/", HomeController.index);

router.post("/login/cadastrar", LoginController.cadastrar);
router.post("/login", LoginController.logar);
router.post("/login/esqueci-senha", LoginController.esqueciSenhaEnviar);

router.get("/login/refresh-token", authMiddleware, LoginController.refreshToken);
router.head("/logado", authMiddleware, LoginController.logado);

// RESTIFUL
router.get("/usuarios", authMiddleware, UsuarioController.index);
router.post("/usuarios", authMiddleware, UsuarioController.criar);
router.get("/usuarios/:id", authMiddleware, UsuarioController.buscarUsuarioPorId);
router.put("/usuarios/:id", authMiddleware, UsuarioController.alterar);
router.patch("/usuarios/:id", authMiddleware, UsuarioController.alterarNome);
router.delete("/usuarios/:id", authMiddleware, UsuarioController.delete);

export default router

