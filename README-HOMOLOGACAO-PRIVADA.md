# Método ECHO™ — Missão 001.D · Homologação PRIVADA

**Atenção: não publicar este projeto ou estas minutas sem validação expressa do CEO e revisão jurídica quando aplicável.**

## Abrir localmente

1. Descompacte o ZIP em uma pasta.
2. No diretório do projeto execute `python -m http.server 8765`.
3. Acesse `http://localhost:8765/` no Opera. Não abra apenas as minutas por `file://` se quiser testar navegação igual à de um servidor.
4. Confira o rodapé da landing: Termos de Uso, Privacidade, Informações importantes.
5. Para retornar, use “Voltar à página principal” nas três minutas.

## Escopo

- Única alteração em `index.html`: três destinos de links legais no rodapé.
- Criação de três pastas de rotas com `index.html` individual.
- Criação de `assets/css/legal-pages.css`, sem alterar `site-original.css`.
- Fonte legal: `docs/fontes/ECHOMAIS_documentos_legais_minutas.md` — 01/11/2026, minutas **não aprovadas**.
- Não houve publicação no GitHub Pages ou na Hostinger.

## Dependências

Os documentos funcionam sem JavaScript, utilizam imagens locais e CSS local. Os arquivos de fonte são requisitados do Google Fonts no CSS existente; em ambiente sem internet, fontes substitutas serão utilizadas.
