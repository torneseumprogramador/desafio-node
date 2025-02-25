import { Request, Response } from "express";

export const HomeController = {
    index: async (req: Request, res: Response) => {
        res.status(200).json({mensagem: "Bem vindo a API do desafio de Node.js"});
    }
};
