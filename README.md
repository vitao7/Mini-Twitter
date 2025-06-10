# Mini Twitter - Projeto de Desenvolvimento Web
## 🚀 Descrição do Projeto
Este projeto implementa uma versão simplificada do Twitter, desenvolvida exclusivamente com HTML, CSS e JavaScript vanilla. O principal objetivo é criar uma aplicação front-end funcional que permita aos utilizadores interagir através de postagens curtas, replicando a essência da popular rede social.

O Mini Twitter oferece as funcionalidades essenciais para:

Registo e Login: Criar uma conta e aceder à aplicação.

Interação com Postagens: Criar novas postagens e visualizar um feed de todas as postagens existentes.

Gestão de Perfil: Visualizar e editar as informações do seu próprio perfil.

A aplicação interage com uma API externa para persistir e recuperar os dados, garantindo uma experiência dinâmica e em tempo real.

## 🔗 API do Projeto
A aplicação estabelece comunicação com a seguinte API RESTful:
https://mini-twitter-api-vy9q.onrender.com/

Endpoints Principais (Resumo)
Autenticação
POST /api/auth/register: Regista um novo utilizador.

POST /api/auth/login: Realiza o login do utilizador.

Postagens
POST /api/posts: Cria uma nova postagem.

GET /api/posts: Lista todas as postagens.

GET /api/posts/my-posts: Lista as postagens do utilizador autenticado.

DELETE /api/posts/:id: Deleta uma postagem específica (apenas pelo autor).

Utilizadores
GET /api/users/profile: Retorna o perfil do utilizador autenticado.

PUT /api/users/profile: Atualiza o perfil do utilizador.

Atenção: Para aceder a endpoints protegidos, é necessário incluir o token JWT no cabeçalho da requisição: Authorization: Bearer <seu_token_jwt>.

## ✨ Funcionalidades Implementadas
1. Sistema de Utilizadores
Criar Conta:

Formulário intuitivo para registo de novos utilizadores.

Campos: Nome de utilizador, email e senha.

Login:

Formulário de login com email e senha.

Manutenção do utilizador logado após o recarregamento da página (utilizando localStorage).

2. Feed de Postagens
Criar Postagem:

Campo de texto para novas publicações com limite de 280 caracteres.

Botão dedicado para publicar a postagem.

Visualizar Postagens:

Exibição de um feed completo com todas as postagens.

Cada postagem exibe o nome de utilizador do autor, o conteúdo e a data/hora da publicação.

As postagens são ordenadas cronologicamente, com as mais recentes a aparecerem primeiro.

3. Perfil do Utilizador
Visualizar Perfil:

Exibe informações básicas do utilizador (nome de utilizador, email).

Minhas Postagens:

Lista dedicada a todas as postagens criadas pelo utilizador logado.

Editar Perfil:

Opção para atualizar o nome de utilizador e o email do perfil.

## 🛠️ Requisitos Técnicos
Front-end:

-HTML5 Semântico: Estrutura clara e acessível do documento.

-CSS3: Estilização moderna e responsiva, com uso de Flexbox para layouts adaptáveis.

-JavaScript Vanilla (ES6+): Lógica interativa, modularizada e assíncrona.

-Design Responsivo (Mobile-First): Experiência de utilizador otimizada para todos os tamanhos de ecrã.

-Armazenamento Local (localStorage): Persistência do token de autenticação e dados do utilizador.

## 📂 Estrutura do Projeto
mini-twitter/
│
├── index.html
├── style.css
├── appController.js # Controla a navegação, formulários e eventos principais
├── authRepository.js # Lida com login e cadastro (requisições para API)
├── userRepository.js # Lida com perfil do usuário
├── postRepository.js # Lida com postagens (get, create)
├── view.js # Lida com exibição de views e posts
└── README.md

## 🚀 Como Executar o Projeto
Para colocar o Mini Twitter a funcionar no seu ambiente local, siga estes passos:

-Clone o Repositório:
Abra o seu terminal ou prompt de comando e execute: git clone https://github.com/vitao7/Mini-Twitter

cd Mini-Twitter

-Abra o index.html:

Simplesmente abra o ficheiro index.html diretamente no seu navegador web preferido (Chrome, Firefox, Edge, etc.). Não é necessário um servidor web complexo, pois todas as operações de API são baseadas em fetch para um servidor externo.

Dica: Para uma experiência de desenvolvimento mais fluida (especialmente com módulos ES6), pode usar uma extensão como "Live Server" no VS Code ou qualquer outro servidor web local simples.

-Configuração da API (Opcional):

A URL da API já está configurada nos ficheiros authRepository.js, userRepository.js e postRepository.js. Geralmente, não é necessário alterá-la.

## 👥 Equipe do Projeto
-Víctor Lucas de Menezes Freitas – RA: 193516

-Maria Eduarda Andrade Dias – RA: 194560

-Hiago Augusto Maioto – RA: 194281

## 📜 Licença
Este projeto é disponibilizado para uso académico e não comercial.
