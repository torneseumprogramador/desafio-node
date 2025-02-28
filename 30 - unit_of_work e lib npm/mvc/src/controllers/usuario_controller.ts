import { Request, Response } from "express";
import { Usuario } from "../entidades/usuario";
import { UsuarioServico } from "../servicos/usuarioServico";

export const UsuarioController = {
    index: async (req: Request, res: Response) => {
        const pagina = parseInt(req.query.pagina as string) || 1;
        const nome = typeof req.query.nome === "string" ? req.query.nome : "";
        const dataInicio = typeof req.query.data_inicio === "string" ? req.query.data_inicio : "";
        const dataFim = typeof req.query.data_fim === "string" ? req.query.data_fim : "";

        const { data, currentPage, totalPages, totalItems } = await UsuarioServico.listarTodos(Number(pagina), 10, nome, dataInicio, dataFim);
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
            const usuarioPayload = new Usuario(nome, endereco, email, senha);
            const usuario = await UsuarioServico.salvar(usuarioPayload);
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
            const usuario = await UsuarioServico.buscarPorId(id)
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
            const usuario = await UsuarioServico.buscarPorId(id)
            if(!usuario) {
                res.status(404).json({ 
                    mensagem: "Usuário não cadastrado em nossa base de dados.",
                });
                return
            }

            Object.assign(usuario, { ...req.body });

            const usuarioAtualizado = await UsuarioServico.atualizar(usuario);

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
            const usuario = await UsuarioServico.buscarPorId(id)
            if(!usuario) {
                res.status(404).json({ 
                    mensagem: "Usuário não cadastrado em nossa base de dados.",
                });
                return
            }

            usuario.nome = req.body.nome;
            const usuarioAtualizado = UsuarioServico.atualizar(usuario);

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

            const usuario = await UsuarioServico.buscarPorId(Number(id))
            if(!usuario) {
                res.status(404).json({ 
                    mensagem: "Usuário não cadastrado em nossa base de dados.",
                });
                return
            }
            await UsuarioServico.deletar(Number(id));
            
            res.status(204).json({});
        } catch (error) {
            res.status(400).json({ 
                mensagem: "Erro ao excluir usuário.",
                stack: error
            });
        }
    }
};
