#!/bin/bash

echo "Digite o nome da tabela que deseja criar:"
read nome_tabela

node ace make:migration create_$nome_tabela --create=$nome_tabela
