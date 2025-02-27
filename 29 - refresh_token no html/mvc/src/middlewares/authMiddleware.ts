import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { validarTokenJwt } from '../servicos/tokenJwtService';

const SECRET_KEY = process.env.SECRET_KEY || 'chave_padrao';

declare module 'express-serve-static-core' {
    interface Request {
        usuario?: JwtPayload;
    }
}

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
    const token = req.header('Authorization')?.split(' ')[1]; // Espera "Bearer token"

    if (!token) {
        res.status(401).json({ mensagem: 'Token não fornecido' });
        return;
    }

    try {
        const decoded = validarTokenJwt(token);

        if (!decoded.valido) {
            res.status(401).json({ mensagem: 'Token expirado ou inválido' });
            return;
        }

        req.usuario = decoded.payload; // Adiciona os dados do usuário ao request
        next();
    } catch (error) {
        res.status(401).json({ mensagem: 'Token inválido' });
        return;
    }
}
