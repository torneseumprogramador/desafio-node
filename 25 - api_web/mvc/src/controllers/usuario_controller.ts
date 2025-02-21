import { Request, Response } from "express";
import { Usuario } from "../models/usuario";

export const UsuarioController = {
    index: async (req: Request, res: Response) => {
        const pagina = parseInt(req.query.pagina as string) || 1;
        const nome = typeof req.query.nome === "string" ? req.query.nome : "";
        const dataInicio = typeof req.query.data_inicio === "string" ? req.query.data_inicio : "";
        const dataFim = typeof req.query.data_fim === "string" ? req.query.data_fim : "";

        const { data, currentPage, totalPages, totalItems } = await Usuario.listarTodos(Number(pagina), 10, nome, dataInicio, dataFim);
        res.status(200).json({ 
            usuarios: data,
            quantidate: totalItems,
            paginaCorrente: currentPage,
            totalDePaginas: totalPages
        });
    },

    criar: async (req: Request, res: Response) => {
        try {
            const { nome, endereco, email, senha } = req.body;
            const usuario = await new Usuario(nome, endereco, email, senha).salvar();
            res.status(201).json(usuario);
        } catch (error:any) {
            res.status(400).json({
                mensagem: "Erro ao criar usuário, email já cadastrado ou dados em branco.",
                stack: error
            });
        }
    },

    buscarUsuarioPorId: async (req: Request, res: Response) => {
        const id = Number(req.params.id);

        try {
            const usuario = await Usuario.buscarPorId(id)
            if(!usuario){
                res.status(404).json({ 
                    mensagem: "Usuario não existe em nossa base de dados",
                });
                return
            } 

            res.status(200).json(usuario);
        } catch (error:any) {
            res.status(400).json({ 
                mensagem: "Erro ao atualizar usuário, email já cadastrado, dados em branco ou id null.",
                stack: error
            });
        }
    },

    editar: async (req: Request, res: Response) => {
        const usuario = await Usuario.buscarPorId(Number(req.params.id))
        if(usuario) return res.render("usuarios/editar", { usuario,layout: "layouts/logado" });

        req.flash("error_msg", "Usuário não encontrado");
        res.redirect("/usuarios");
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
