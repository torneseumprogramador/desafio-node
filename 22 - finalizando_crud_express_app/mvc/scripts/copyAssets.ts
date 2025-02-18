import fs from "fs";
import path from "path";

/**
 * Copia arquivos e diretórios de forma recursiva
 * @param from Diretório de origem
 * @param to Diretório de destino
 */
const copyFolderSync = (from: string, to: string) => {
    if (!fs.existsSync(from)) {
        console.log(`⚠️ Diretório não encontrado: ${from}`);
        return;
    }

    if (!fs.existsSync(to)) {
        fs.mkdirSync(to, { recursive: true });
    }

    fs.readdirSync(from).forEach((element) => {
        const fromPath = path.join(from, element);
        const toPath = path.join(to, element);
        const stat = fs.lstatSync(fromPath);

        if (stat.isFile()) {
            fs.copyFileSync(fromPath, toPath);
        } else if (stat.isDirectory()) {
            copyFolderSync(fromPath, toPath);
        }
    });
};

// Definir os diretórios de origem e destino
const srcPublic = path.join(__dirname, "../src/public");
const distPublic = path.join(__dirname, "../dist/public");
const srcViews = path.join(__dirname, "../src/views");
const distViews = path.join(__dirname, "../dist/views");

// Copiar os arquivos
copyFolderSync(srcPublic, distPublic);
copyFolderSync(srcViews, distViews);

console.log("✅ Arquivos estáticos copiados com sucesso.");
