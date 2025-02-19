import { Request, Response, NextFunction } from "express";
import { Usuario } from "../models/usuario";

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Verifica se o cookie do usuário existe
        if (!req.cookies.usuario) {
            req.flash("error_msg", "Você precisa estar logado.");
            return res.redirect("/login");
        }

        // Converte o cookie para JSON
        const usuarioCookie = JSON.parse(req.cookies.usuario);

        // Busca o usuário no banco pelo ID
        const usuario = await Usuario.buscarPorId(usuarioCookie.id);

        if (!usuario) {
            req.flash("error_msg", "Sessão inválida, faça login novamente.");
            res.clearCookie("usuario"); // Remove o cookie inválido
            return res.redirect("/login");
        }

        res.locals.autenticado = {
            email: usuario.email,
            nome: usuario.nome
        };

        next();
    } catch (error) {
        console.error("Erro na autenticação:", error);
        req.flash("error_msg", "Erro ao validar sessão, faça login novamente.");
        res.clearCookie("usuario");
        res.redirect("/login");
    }
};

export default authMiddleware;
