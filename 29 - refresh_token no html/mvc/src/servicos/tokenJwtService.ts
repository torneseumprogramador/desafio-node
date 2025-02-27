import jwt, { SignOptions, JwtPayload } from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY || 'chave_padrao';

export function escreverTokenJwt(usuarioData: any, expiresInSeconds: number): string {
    const timestampAtual = Math.floor(Date.now() / 1000); // Converte para segundos

    const payload: JwtPayload = {
        ...usuarioData,
        exp: timestampAtual + expiresInSeconds,
    };

    const options: SignOptions = {
        algorithm: 'HS256',
    };

    return jwt.sign(payload, SECRET_KEY, options);
}

export function validarTokenJwt(token: string): { valido: boolean; payload?: JwtPayload } {
    try {
        const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;

        if (decoded.exp && decoded.exp < Math.floor(Date.now() / 1000)) {
            return { valido: false };
        }

        return { valido: true, payload: decoded };
    } catch (error) {
        return { valido: false };
    }
}
