#!/bin/bash

# Solicita os dados do usuário
read -p "Digite o email: " email

# Monta o JSON dinâmico
json_data=$(cat <<EOF
{
    "email": "$email"
}
EOF
)

# Executa o curl com os dados preenchidos
echo "=================================="
curl -X POST --location 'http://localhost:3000/login/esqueci-senha' \
--header 'Content-Type: application/json' \
--data-raw "$json_data"
echo "\n=================================="

