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
            
            req.flash("success_msg", "Usuário criado com sucesso!");

            res.redirect("/usuarios");
        } catch (error:any) {
            req.flash("error_msg", "Erro ao criar usuário, email já cadastrado ou dados em branco.");
            res.redirect("/usuarios/novo");
        }
    },

    criar_json: async (req: Request, res: Response) => {
        try {
            const { nome, endereco, email, senha } = req.body;
            await new Usuario(nome, endereco, email, senha).salvar();
            
            res.send({sucesso: "true"});

        } catch (error:any) {
            res.send({sucesso: "false", error: "Erro ao criar usuário, email já cadastrado ou dados em branco."});
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
