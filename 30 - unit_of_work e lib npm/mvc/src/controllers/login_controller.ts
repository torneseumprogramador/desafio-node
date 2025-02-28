import { Request, Response } from "express";
import { Usuario } from "../entidades/usuario";
import { sendEmail } from "../servicos/emailService";
import { escreverTokenJwt } from "../servicos/tokenJwtService";
import { UsuarioServico } from "../servicos/usuarioServico";

export const LoginController = {
    esqueciSenhaEnviar: async (req: Request, res: Response) => {
        try {
            const { email } = req.body;
            if(!email || email.trim() === ""){
                res.status(400).json({
                    mensagem: "Email não pode ser vazio.",
                });
                return;
            }

            const usuario = await UsuarioServico.buscarPorEmail(email);
            if(!usuario){
                res.status(404).json({
                    mensagem: "Email não cadastrado.",
                });
                return;
            }

            sendEmail("didox_59@yahoo.com.br", "Sua senha do sistema Node.js", `
                <p>
                    Olá ${usuario.nome} sua senha é: ${usuario.senha}
                </p>
            `)
            res.status(200).json({
                mensagem: "Email enviado com sucesso.",
            });
        } catch (error:any) {
            res.status(400).json({
                mensagem: "Erro ao criar usuário, email já cadastrado ou dados em branco.",
            });
        }
    },
    cadastrar: async (req: Request, res: Response) => {
        try {
            const { nome, email, senha, csenha } = req.body;
            if(!senha || !csenha || senha.trim() === "" || csenha.trim() === "" || senha !== csenha){
                res.status(400).json({
                    mensagem: "A senha não bate com a confirmação de senha.",
                });
                return;
            }

            const usuarioPayload = new Usuario(nome, "", email, senha);
            const usuario = await UsuarioServico.salvar(usuarioPayload);

            const dias_1 = 60 * 60 * 24 * 10;  // 10 dia em segundos

            const usuarioView = {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                endereco: usuario.endereco,
            }
            const token = escreverTokenJwt(usuarioView, dias_1);

            sendEmail("didox_59@yahoo.com.br", "Bem vindo ao sistema Node.js", "<h1>Oiiii</h1>")
            res.status(200).json({
                usuario: usuarioView,
                token: token
            });
        } catch (error:any) {
            res.status(400).json({
                mensagem: "Erro ao criar usuário, email já cadastrado ou dados em branco.",
            });
        }
    },
    
    logar: async (req: Request, res: Response) => {
        try {
            const { email, senha } = req.body;
            const usuario = await UsuarioServico.buscarPorEmailSenha(email, senha);
            if(!usuario){
                res.status(400).json({
                    mensagem: "Email ou senha inválidos.",
                });
                return;
            }

            // Serializa o usuário sem a senha
            const usuarioData = {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                endereco: usuario.endereco,
            };

            const dias_1 = 60 * 60 * 24 * 10;   // 10 dia em segundos
            const token = escreverTokenJwt(usuarioData, dias_1);

            res.status(200).json({
                usuario: usuarioData,
                token: token
            });
        } catch (error:any) {
            res.status(400).json({
                mensagem: "Erro ao logar, verifique o seu email / senha.",
            });
        }
    },

    refreshToken: async (req: Request, res: Response) => {
        try {
            const usuario: any = req.usuario

            const usuarioData = {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                endereco: usuario.endereco,
            };

            const dias_1 = 60 * 60 * 24 * 1;   // 1 dia em segundos
            const token = escreverTokenJwt(usuarioData, dias_1);

            res.status(200).json({
                usuario: usuario,
                token: token
            });
        } catch (error:any) {
            res.status(400).json({
                mensagem: "Erro ao fazer refresh do token.",
            });
        }
    },
    
    logado: (req: Request, res: Response) => {
        res.status(204).json({});
    }
};
