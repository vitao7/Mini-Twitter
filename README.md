Mini Twitter - Projeto de Desenvolvimento Web
Este é um projeto de desenvolvimento web que implementa uma versão simplificada do Twitter, utilizando apenas tecnologias web vanilla: HTML, CSS e JavaScript. O objetivo principal é criar uma aplicação front-end funcional que permita aos utilizadores interagir através de postagens curtas, de forma semelhante à popular rede social.

--Descrição do Projeto
O Mini Twitter oferece as funcionalidades essenciais para que os utilizadores possam registar-se, fazer login, criar e visualizar postagens num feed, e gerir o seu próprio perfil. A aplicação interage com uma API externa para persistir e recuperar os dados, garantindo uma experiência dinâmica.

--API do Projeto
A aplicação interage com a seguinte API RESTful:
https://mini-twitter-api-vy9q.onrender.com/

--Endpoints Principais (Sumário)
Autenticação:
POST /api/auth/register: Regista um novo utilizador.
POST /api/auth/login: Realiza o login do utilizador.

Postagens:
POST /api/posts: Cria uma nova postagem.
GET /api/posts: Lista todas as postagens.
GET /api/posts/my-posts: Lista as postagens do utilizador autenticado.
DELETE /api/posts/:id: Deleta uma postagem específica (apenas pelo autor).

Utilizadores:
GET /api/users/profile: Retorna o perfil do utilizador autenticado.
PUT /api/users/profile: Atualiza o perfil do utilizador.
Autenticação: Para aceder a endpoints protegidos, é necessário incluir o token JWT no cabeçalho da requisição: Authorization: Bearer <seu_token_jwt>.

--Funcionalidades Implementadas
Sistema de Utilizadores:
Criar Conta: Formulário para registo de novos utilizadores com nome de utilizador, email e senha.
Login: Formulário de login com email e senha, mantendo o utilizador autenticado após o recarregamento da página (usando localStorage).

Feed de Postagens:
Criar Postagem: Campo de texto com limite de 280 caracteres e botão para publicar.
Visualizar Postagens: Exibição de um feed com todas as postagens, incluindo nome de utilizador do autor, conteúdo e data/hora de publicação, ordenadas cronologicamente (mais recentes primeiro).

Perfil do Utilizador:
Visualizar Perfil: Exibe as informações básicas do utilizador (nome de utilizador, email).
Minhas Postagens: Lista todas as postagens criadas pelo utilizador.
Editar Perfil: Opção para atualizar o nome de utilizador e o email do perfil.

--Requisitos Técnicos
Front-end:
HTML5 semântico.
CSS3 (utilizando Flexbox para layout responsivo).
JavaScript vanilla (ES6+ para módulos e assincronia).
Design responsivo (mobile-first).
Armazenamento local (localStorage) para persistência do token de autenticação.

--Estrutura do Projeto
mini-twitter/
├── index.html
├── css/
│   ├── style.css      # Estilos principais da aplicação
│   └── reset.css      # Reset básico de CSS
├── js/
│   ├── appController.js   # Lógica principal da aplicação e controlo de UI
│   ├── repositories/
│   │   ├── authRepository.js  # Funções para autenticação (login, registo)
│   │   ├── userRepository.js  # Funções para gestão de perfil de utilizador
│   │   └── postRepository.js  # Funções para gestão de postagens
│   └── views/
│       └── view.js      # Funções utilitárias para manipulação do DOM e renderização
└── assets/
    └── images/        # (Opcional) Para quaisquer imagens ou outros ativos

--Como Executar o Projeto
Para executar este projeto localmente, siga os passos abaixo:
-Clone o Repositório: git clone <https://github.com/vitao7/Mini-Twitter>
cd mini-twitter
-Abra o index.html:
Basta abrir o ficheiro index.html diretamente no seu navegador. Não é necessário um servidor web para o funcionamento básico, pois todas as operações de API são baseadas em fetch para um servidor externo.
Alternativamente, para uma melhor experiência de desenvolvimento (especialmente com módulos ES6), pode usar uma extensão como "Live Server" no VS Code ou qualquer outro servidor web simples.
Configure a URL da API no seu authRepository.js, userRepository.js e postRepository.js, se necessário.

--Equipe:
Víctor Lucas de Menezes Freitas – RA: 193516
Maria Eduarda Andrade Dias – RA: 194560
Hiago Augusto Maioto – RA: 194281

--Licença
Uso acadêmico e não comercial.
