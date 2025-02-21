import { spawn } from "child_process";

/**
 * Executa um comando no terminal e exibe a saída no console.
 * @param command O comando a ser executado
 */
const runCommand = (command: string) => {
    const process = spawn(command, { shell: true, stdio: "inherit" });

    process.on("close", (code) => {
        console.log(`Process exited with code ${code}`);
    });

    return process;
};

// Comando para compilar o TypeScript e rodar os assets antes do servidor
const copy = "ts-node scripts/copyAssets.ts";
const tscWatch = "npx tsc-watch --onSuccess \"node dist/app.js\"";

// Executar o comando
runCommand(copy);
runCommand(tscWatch);
