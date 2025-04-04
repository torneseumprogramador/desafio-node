#!/bin/bash

# Executa os seeders
echo "Executando seeders..."
node ace db:seed

# Verifica se os seeders foram executados com sucesso
if [ $? -eq 0 ]; then
    echo "Seeders executados com sucesso!"
else
    echo "Erro ao executar os seeders"
    exit 1
fi
