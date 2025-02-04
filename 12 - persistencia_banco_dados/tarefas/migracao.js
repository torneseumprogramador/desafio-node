const sqlite3 = require('sqlite3').verbose();

// Criar ou abrir o banco de dados SQLite3
const db = new sqlite3.Database('database/persistencia.db', (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite.');
    }
});


// Criar a tabela tarefas
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS tarefas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT NOT NULL,
            descricao TEXT,
            status TEXT NOT NULL CHECK (status IN ('Aberto', 'Fechado', 'Pendente'))
        )
    `, (err) => {
        if (err) {
            console.error('Erro ao criar tabela:', err.message);
        } else {
            console.log('Tabela "tarefas" criada com sucesso.');
        }
    });
});

// Fechar o banco de dados
db.close((err) => {
    if (err) {
        console.error('Erro ao fechar o banco de dados:', err.message);
    } else {
        console.log('Conexão com o banco de dados fechada.');
    }
});