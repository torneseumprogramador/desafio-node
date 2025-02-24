read -p "Digite o ID do usuário: " user_id

echo "=================================="
curl -X GET --location "http://localhost:3000/usuarios/$user_id" \
--header "Content-Type: application/json"
echo "\n=================================="
