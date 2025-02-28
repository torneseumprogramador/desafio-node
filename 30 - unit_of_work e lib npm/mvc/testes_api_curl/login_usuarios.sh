#!/bin/bash

# Solicita os dados do usuário
read -p "Digite o email: " email
read -p "Digite a senha: " senha

# Monta o JSON dinâmico
json_data=$(cat <<EOF
{
    "email": "$email",
    "senha": "$senha"
}
EOF
)

# Executa o curl com os dados preenchidos
echo "=================================="
curl -X POST --location 'http://localhost:3000/login' \
--header 'Content-Type: application/json' \
--data-raw "$json_data"
echo "\n=================================="

