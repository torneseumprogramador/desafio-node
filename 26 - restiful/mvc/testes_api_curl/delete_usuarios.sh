#!/bin/bash

# Solicita os dados do usuário
read -p "Digite o id do usuário para atualização " id

# Executa o curl com os dados preenchidos
echo "=================================="
curl -X DELETE --location "http://localhost:3000/usuarios/$id" \
--header 'Content-Type: application/json'
echo "\n=================================="

