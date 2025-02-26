#!/bin/bash

# Solicita os dados do usuário
read -p "Digite o token: " token

# Valida se o token foi inserido
if [[ -z "$token" ]]; then
  echo "Erro: Nenhum token inserido."
  exit 1
fi

# Executa o curl com os dados preenchidos
echo "=================================="
response=$(curl -s -o /dev/null -w "%{http_code}" -X HEAD --location "http://localhost:3000/logado" \
  --header 'Content-Type: application/json' \
  --header "Authorization: Bearer $token")

echo "Status Code: $response"

# Verifica o código de resposta HTTP
if [[ "$response" == "204" ]]; then
  echo "✅ Token válido. Acesso autorizado!"
elif [[ "$response" == "401" ]]; then
  echo "❌ Token inválido ou expirado!"
else
  echo "⚠️ Erro inesperado. Status HTTP: $response"
fi

echo "=================================="
