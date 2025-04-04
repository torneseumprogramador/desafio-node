#!/bin/bash

# Executa as migrations pendentes
echo "Executando migrations..."
node ace migration:run

# Verifica se as migrations foram executadas com sucesso
if [ $? -eq 0 ]; then
    echo "Migrations executadas com sucesso!"
else
    echo "Erro ao executar as migrations"
    exit 1
fi
