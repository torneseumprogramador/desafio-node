#!/bin/bash

# Reseta o banco de dados
echo "Resetando banco de dados..."
node ace migration:reset

# Executa as migrations novamente
echo "Executando migrations..."
node ace migration:run

# Verifica se as migrations foram executadas com sucesso
if [ $? -eq 0 ]; then
    echo "Banco de dados resetado e migrations executadas com sucesso!"
else
    echo "Erro ao resetar banco de dados ou executar migrations"
    exit 1
fi
