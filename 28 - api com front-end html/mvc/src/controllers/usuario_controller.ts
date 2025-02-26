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

    alterar: async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        try {
            const usuario = await Usuario.buscarPorId(id)
            if(!usuario) {
                res.status(404).json({ 
                    mensagem: "Usuário não cadastrado em nossa base de dados.",
                });
                return
            }

            const { nome, endereco, email, senha } = req.body;
            const usuarioAtualizado = await new Usuario(nome, endereco, email, senha, id).atualizar();

            res.status(200).json(usuarioAtualizado);
        } catch (error:any) {
            res.status(400).json({ 
                mensagem: "Erro ao atualizar usuário, email já cadastrado, dados em branco ou id null.",
                stack: error
            });
        }
    },

    alterarNome: async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        try {
            const usuario = await Usuario.buscarPorId(id)
            if(!usuario) {
                res.status(404).json({ 
                    mensagem: "Usuário não cadastrado em nossa base de dados.",
                });
                return
            }

            const { nome } = req.body;
            const usuarioAtualizado = await new Usuario(nome, usuario?.endereco, usuario?.email, usuario?.senha, id).atualizar();

            res.status(200).json(usuarioAtualizado);
        } catch (error:any) {
            res.status(400).json({ 
                mensagem: "Erro ao atualizar usuário, email já cadastrado, dados em branco ou id null.",
                stack: error
            });
        }
    },

    delete: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {

            const usuario = await Usuario.buscarPorId(Number(id))
            if(!usuario) {
                res.status(404).json({ 
                    mensagem: "Usuário não cadastrado em nossa base de dados.",
                });
                return
            }
            await Usuario.deletar(Number(id));
            
            res.status(204).json({});
        } catch (error) {
            res.status(400).json({ 
                mensagem: "Erro ao excluir usuário.",
                stack: error
            });
        }
    }
};
