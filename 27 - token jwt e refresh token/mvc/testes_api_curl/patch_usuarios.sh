#!/bin/bash

# Solicita os dados do usuário
read -p "Digite o token: " token
read -p "Digite o id do usuário para atualização " id
read -p "Digite o nome do usuário: " nome

# Monta o JSON dinâmico
json_data=$(cat <<EOF
{
    "nome": "$nome"
}
EOF
)

# Executa o curl com os dados preenchidos
echo "=================================="
curl -X PATCH --location "http://localhost:3000/usuarios/$id" \
--header 'Content-Type: application/json' \
--header "Authorization: Bearer $token" \
--data-raw "$json_data"
echo "\n=================================="

