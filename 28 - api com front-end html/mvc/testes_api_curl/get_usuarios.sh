read -p "Digite o token de autenticação " token
read -p "Digite o nome do usuário (ou pressione Enter para deixar vazio): " nome
read -p "Digite a data de início (YYYY-MM-DD) (ou pressione Enter para deixar vazio): " dataInicio
read -p "Digite a data de fim (YYYY-MM-DD) (ou pressione Enter para deixar vazio): " dataFim

# Montando os parâmetros da query string
params=""

[ -n "$nome" ] && params+="nome=$nome&"
[ -n "$dataInicio" ] && params+="dataInicio=$dataInicio&"
[ -n "$dataFim" ] && params+="dataFim=$dataFim&"

# Removendo o último '&' se houver parâmetros
params=${params%&}

# Montando a URL final
url="http://localhost:3000/usuarios"
[ -n "$params" ] && url+="?$params"

# Executando o curl
echo "=================================="
curl -X GET --location "$url" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer $token"
echo "\n=================================="
