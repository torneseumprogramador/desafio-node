#!/bin/bash

# Solicita o nome da migration ao usuário
echo "Digite o nome da migration:"
read nome_migration

# Verifica se o nome foi fornecido
if [ -z "$nome_migration" ]; then
    echo "O nome da migration não pode estar vazio"
    exit 1
fi

# Cria a migration usando o comando ace
node ace make:migration $nome_migration

# Verifica se a migration foi criada com sucesso
if [ $? -eq 0 ]; then
    echo "Migration criada com sucesso!"
else
    echo "Erro ao criar a migration"
    exit 1
fi
