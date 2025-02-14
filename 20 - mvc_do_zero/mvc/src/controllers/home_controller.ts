import { Request, Response } from "express";

export const HomeController = {
    index: async (req: Request, res: Response) => {
        res.render("home/index");
    },
    sobre: async (req: Request, res: Response) => {
        res.render("home/sobre");
    }
};
