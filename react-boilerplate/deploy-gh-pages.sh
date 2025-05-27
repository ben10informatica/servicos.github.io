#!/bin/bash
# Script para deploy no GitHub Pages usando a branch gh-pages

# Build do projeto
npm run build

# Navega para a pasta dist
cd dist

# Inicializa um novo repositório git temporário
git init
git add -A
git commit -m "Deploy para GitHub Pages"

# Força o push para a branch gh-pages do repositório remoto
git push -f git@github.com:SEU_USUARIO/SEU_REPOSITORIO.git master:gh-pages

# Volta para a raiz do projeto
cd ..

echo "Deploy concluído. Verifique seu repositório GitHub para confirmar."
