import { Request, Response } from "express";
import { Usuario } from "../models/usuario";

export const LoginController = {
    index: async (req: Request, res: Response) => {
        res.render("login/index");
    },
    cadastro: async (req: Request, res: Response) => {
        res.render("login/cadastro");
    },
    cadastrar: async (req: Request, res: Response) => {
        try {
            const { nome, email, senha, csenha } = req.body;
            if(!senha || !csenha || senha.trim() === "" || csenha.trim() === "" || senha !== csenha){
                req.flash("error_msg", "A senha não bate com a confirmação de senha.");
                return res.redirect("/login/cadastro");
            }

            const usuario = await new Usuario(nome, "", email, senha).salvar();

            const dias_1 = 1000 * 60 * 60 * 24 * 1;

            escreverCookie(res, {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                endereco: usuario.endereco,
            }, dias_1);

            res.redirect("/usuarios");
        } catch (error:any) {
            req.flash("error_msg", "Erro ao criar usuário, email já cadastrado ou dados em branco.");
            res.redirect("/login/cadastro");
        }
    },
    sair: async (req: Request, res: Response) => {
        res.clearCookie("usuario"); // Remove o cookie inválido
        res.redirect("/");
    },
    logar: async (req: Request, res: Response) => {
        try {
            const { email, senha, lembrar } = req.body;
            const usuario = await Usuario.buscarPorEmailSenha(email, senha);
            if(!usuario){
                req.flash("error_msg", "Email ou senha inválidos.");
                return res.redirect("/login");
            }

            // Serializa o usuário sem a senha
            const usuarioData = {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                endereco: usuario.endereco,
            };

            const anos_1 = 1000 * 60 * 60 * 24 * 365;
            const dias_1 = 1000 * 60 * 60 * 24 * 1;
            const maxAge = lembrar ? anos_1 : dias_1;

            // Grava o cookie
            escreverCookie(res, usuarioData, maxAge);

            res.redirect("/usuarios");
        } catch (error:any) {
            req.flash("error_msg", "Erro ao logar, verifique o seu email / senha.");
            res.redirect("/login");
        }
    }
};

const escreverCookie = (res: Response, usuarioData: any, maxAge: number) => {
    res.cookie("usuario", JSON.stringify(usuarioData), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Apenas HTTPS em produção
        maxAge: maxAge
    });
}