import { Request, Response } from "express";
import { Usuario } from "../models/usuario";

export const UsuarioController = {
    index: async (req: Request, res: Response) => {
        const pagina = parseInt(req.query.pagina as string) || 1;
        const nome = typeof req.query.nome === "string" ? req.query.nome : "";
        const dataInicio = typeof req.query.data_inicio === "string" ? req.query.data_inicio : "";
        const dataFim = typeof req.query.data_fim === "string" ? req.query.data_fim : "";

        const { data, currentPage, totalPages, totalItems } = await Usuario.listarTodos(Number(pagina), 10, nome, dataInicio, dataFim);
        res.render("usuarios/index", { 
            nome: nome,
            dataInicio: dataInicio,
            dataFim: dataFim,
            usuarios: data,
            quantidate: totalItems,
            currentPage,
            totalPages
        });
    },

    novo: async (req: Request, res: Response) => {
        res.render("usuarios/novo");
    },

    editar: async (req: Request, res: Response) => {
        const usuario = await Usuario.buscarPorId(Number(req.params.id))
        if(usuario) return res.render("usuarios/editar", { usuario });

        req.flash("error_msg", "Usuário não encontrado");
        res.redirect("/usuarios");
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

    alterar: async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        try {
            const usuario = await Usuario.buscarPorId(id)
            if(!usuario) {
                req.flash("error_msg", "Usuário não encontrado");
                return res.redirect("/usuarios");
            }

            const { nome, endereco, email, senha } = req.body;
            await new Usuario(nome, endereco, email, senha, id).atualizar();
            
            req.flash("success_msg", "Usuário atualizado com sucesso!");

            res.redirect("/usuarios");
        } catch (error:any) {
            req.flash("error_msg", "Erro ao atualizar usuário, email já cadastrado, dados em branco ou id null.");
            res.redirect(`/usuarios/${id}/editar`);
        }
    },

    delete: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {

            const usuario = await Usuario.buscarPorId(Number(id))
            if(!usuario) {
                req.flash("error_msg", "Usuário não encontrado");
                return res.redirect("/usuarios");
            }

            await Usuario.deletar(Number(id));
            res.redirect("/usuarios");
        } catch (error) {
            req.flash("error_msg", "Erro ao excluir usuário.");
            res.redirect(`/usuarios`);
        }
    }
};
