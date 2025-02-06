const fs = require('fs');

class JsonDriver {
    constructor(caminho_arquivo = "database/tarefas.json") {
        this.filePath = caminho_arquivo;
    }

    async executar(sql, obj) {
        sql = sql.trim().toUpperCase();
        
        if (sql.startsWith("INSERT INTO")) {
            return await this.cadastrar(obj);
        } 
        
        if (sql.startsWith("UPDATE")) {
            return await this.alterar(obj);
        } 
        
        if (sql.startsWith("DELETE FROM")) {
            const match = sql.match(/WHERE ID\s*=\s*(\d+)/);
            if (match) {
                const id = match[1];
                return await this.excluir(id);
            }
        } 
        
        if (sql.startsWith("SELECT")) {
            const match = sql.match(/WHERE ID\s*=\s*(\d+)/);
            if (match) {
                const id = match[1];
                const dados = await this.listar();
                return dados.find(dado => dado.id == id);
            }
            return await this.listar();
        }
        
        throw new Error("Comando SQL não reconhecido.");
    }

    async cadastrar(dado) {
        const dados = await this.listar();
        dado.id = dados.length ? Math.max(...dados.map(t => t.id)) + 1 : 1;
        dados.push(dado);
        await fs.writeFileSync(this.filePath, JSON.stringify(dados, null, 2), 'utf8');
        return dado;
    }

    async alterar(dado) {
        const dados = await this.listar();
        const dadoEncontrado = dados.find((t) => t.id == dado.id);
        if (dadoEncontrado) {
            for (let key in dado) {
                dadoEncontrado[key] = dado[key];
            }
            await fs.writeFileSync(this.filePath, JSON.stringify(dados, null, 2), 'utf8');
            return dadoEncontrado;
        }
        throw new Error("Registro não encontrado.");
    }

    async listar() {
        if (!fs.existsSync(this.filePath)) return [];
        const dadosJson = await fs.readFileSync(this.filePath, 'utf8');
        return dadosJson ? JSON.parse(dadosJson) : [];
    }

    async excluir(id) {
        let dados = await this.listar();
        const index = dados.findIndex((t) => t.id == id);
        if (index !== -1) {
            dados.splice(index, 1);
            await fs.writeFileSync(this.filePath, JSON.stringify(dados, null, 2), 'utf8');
            return true;
        }
        throw new Error("Registro não encontrado.");
    }
}

module.exports = JsonDriver;
