import { Request, Response } from "express";

export const HomeController = {
    index: async (req: Request, res: Response) => {
        if (req.cookies.usuario) {
            return res.redirect("/usuarios");
        }

        res.render("home/index");
    },
    sobre: async (req: Request, res: Response) => {
        res.render("home/sobre");
    }
};
