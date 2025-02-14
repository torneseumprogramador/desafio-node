import { Request, Response } from "express";
import { Usuario } from "../models/usuario";

export const UsuarioController = {
    index: async (req: Request, res: Response) => {
        try {
            const usuarios = await Usuario.listarTodos();
            res.render("usuarios/index", { usuarios });
        } catch (error) {
            res.status(500).send("Erro ao buscar usuários");
        }
    },

    novo: async (req: Request, res: Response) => {
        res.render("usuarios/novo");
    },

    criar: async (req: Request, res: Response) => {
        try {
            const { nome, endereco, email, senha } = req.body;
            await new Usuario(nome, endereco, email, senha).salvar();
            res.redirect("/usuarios");
        } catch (error) {
            res.status(500).send("Erro ao criar usuário");
        }
    },

    delete: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            await Usuario.deletar(Number(id));
            res.redirect("/usuarios");
        } catch (error) {
            res.status(500).send("Erro ao excluir usuário");
        }
    }
};
