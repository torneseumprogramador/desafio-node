#!/bin/bash

# Solicita os dados do usuário
read -p "Digite o token: " token

# Executa o curl com os dados preenchidos
echo "=================================="
curl -X GET --location "http://localhost:3000/login/refresh-token" \
--header 'Content-Type: application/json' \
--header "Authorization: Bearer $token"
echo "\n=================================="

