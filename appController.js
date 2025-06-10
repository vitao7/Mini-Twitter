// Importa funções dos módulos de repositório e view
import * as authRepo from "./repositories/authRepository.js";
import * as userRepo from "./repositories/userRepository.js";
import * as postRepo from "./repositories/postRepository.js";
import { showView, renderPosts, updateCharCount } from "./views/view.js";

// === Elementos do DOM === //DOM é como se fosse uma grande árvore que representa tudo que aparece no site: botões, caixas de texto, imagens, menus, etc.
// Obtém referências para as seções (views) da aplicação
const loginView = document.getElementById("login-view"); //Tela de login armazenada em loginView
const registerView = document.getElementById("register-view"); //Tela de cadastro .. em registerView
const feedView = document.getElementById("feed-view"); //Tela com os posts .. em feedView
const profileView = document.getElementById("profile-view"); //Tela do perfil do usuário .. em profileView

// Array com todas as views para facilitar a alternância
const allViews = [loginView, registerView, feedView, profileView]; //Guarda todas as telas na lista allViews

// Obtém referências para os botões de navegação
const btnLoginNav = document.getElementById("btn-login-nav"); //Guarda o botão que leva para a tela de login na variável btnLoginNav
const btnRegisterNav = document.getElementById("btn-register-nav"); //Guarda o botão que leva para a tela de cadastro na variável btnRegisterNav
const btnFeedNav = document.getElementById("btn-feed-nav"); //Guarda o botão que leva para o feed na variável btnFeedNav
const btnProfileNav = document.getElementById("btn-profile-nav"); //Guarda o botão que leva para a tela de perfil na variável btnProfileNav
const btnLogoutNav = document.getElementById("btn-logout-nav"); //Guarda o botão que sai da conta na variável btnLogoutNav

// Obtém referências para os formulários
const loginForm = document.getElementById("login-form"); //Guarda o que foi digitado em login e guarda em loginForm
const registerForm = document.getElementById("register-form"); //Guarda o que foi digitado em cadastro e guarda em registerForm
const postForm = document.getElementById("post-form"); //Guarda o que foi digitado em postar e guarda em postForm
const editProfileForm = document.getElementById("edit-profile-form"); //Guarda o que foi digitado na edição do perfil e guarda em editProfileForm

// Obtém referências para os elementos de mensagem de erro
const loginError = document.getElementById("login-error"); //Guarda a msg de erro no login em loginError
const registerError = document.getElementById("register-error"); //Guarda a msg de erro no cadastro em loginError

// Obtém referências para os elementos de exibição do perfil
const profileUsernameSpan = document.getElementById("profile-username"); //Guarda o nome do usuário
const profileEmailSpan = document.getElementById("profile-email"); //Guarda o email do usuário

// Obtém referências para as listas de postagens
const postsList = document.getElementById("posts-list"); // Guarda o feed geral na variável postsList
const myPostsList = document.getElementById("my-posts-list"); // Guarda as postagens do usuário no perfil na variável myPostsList

// Obtém referências para os botões de edição de perfil
const btnEditProfile = document.getElementById("btn-edit-profile"); //Guarda o botão de editar perfil na variável
const btnCancelEdit = document.getElementById("btn-cancel-edit"); //Guarda o botão de cancelar edição do perfil na variável

// Obtém referências para o textarea de nova postagem e contador
const postContent = document.getElementById("post-content"); //Guarda o conteúdo do post na variável postContent
const charCount = document.getElementById("char-count"); //Guarda o contador de caracteres na variável charCount

// Variável para armazenar as informações do usuário logado
let currentUser = null; //let = variável que pode alterar depois, diferente de const. CurrentUser = usuário atual; recebe null pois não tem ninguém logado.

// === Funções de Controle da UI e Dados ===

/**
 * Atualiza a visibilidade dos botões de navegação
 * com base no status de autenticação do usuário.
 */
function updateNav() {
  const loggedIn = !!localStorage.getItem("token"); // Verifica se há um token JWT no localStorage. O !! transforma o valor em verdadeiro (true) ou falso (false):

  btnLoginNav.hidden = loggedIn; // Oculta Login se logado
  btnRegisterNav.hidden = loggedIn; // Oculta Criar Conta se logado
  btnFeedNav.hidden = !loggedIn; // Mostra Feed se logado
  btnProfileNav.hidden = !loggedIn; // Mostra Perfil se logado
  btnLogoutNav.hidden = !loggedIn; // Mostra Sair se logado
}

/**
 * Carrega e exibe as informações do perfil do usuário logado.
 */
async function loadProfile() {
  //async quer dizer que algumas partes vão esperar coisas da internet, como respostas da API.
  try {
    currentUser = await userRepo.getProfile(); // Obtém o perfil do usuário da API. Await espera a resposta da API chegar.
    profileUsernameSpan.textContent = currentUser.username; //Pega o nome do usuário e mostra
    profileEmailSpan.textContent = currentUser.email; //Pega o email do usuário e mostra
  } catch (err) {
    // Em caso de erro (ex: token inválido/expirado), remove o token e exibe mensagem
    localStorage.removeItem("token"); //Se der erro, apaga o token
    updateNav(); //Atualiza a tela
    showView(loginView, allViews); // Redireciona para a tela de login
    console.error("Erro ao carregar perfil:", err);
    // alert("Erro ao carregar perfil. Por favor, faça login novamente.");
  }
}

/**
 * Carrega e renderiza todas as postagens no feed principal.
 */
async function loadFeed() {
  try {
    const posts = await postRepo.getPosts(); //Obtém todas as postagens da API. O await faz o código esperar até os dados chegarem
    // Ordena as postagens da mais recente para a mais antiga
    const sortedPosts = posts.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    ); //Ordena os posts, coloca o mais novo primeiro e o mais velho depois.
    renderPosts(sortedPosts, postsList, currentUser.id); //Renderiza as postagens já organizados no elemento #posts-list. Chama a função na view
  } catch (err) {
    console.error("Erro ao carregar feed:", err);
    // alert("Erro ao carregar feed de postagens.");
  }
}

/**
 * Carrega e renderiza apenas as postagens do usuário logado na tela de perfil.
 */
async function loadMyPosts() {
  try {
    // Busca todas as postagens e filtra localmente pelas do usuário logado
    const posts = await postRepo.getPosts(); // Obtém todas as postagens da API. O await faz o código esperar até os dados chegarem
    const myPosts = posts.filter((p) => p.author._id === currentUser._id); //Filtra apenas pelas postagens do id (usuário) logado
    // Ordena as postagens do usuário da mais recente para a mais antiga
    const sortedMyPosts = myPosts.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    ); // //Ordena os posts, coloca o mais novo primeiro e o mais velho depois.
    renderPosts(sortedMyPosts, myPostsList, currentUser._id); // Renderiza as postagens ká orhanizadosno elemento #my-posts-list. Chama a função na view
  } catch (err) {
    console.error("Erro ao carregar suas postagens:", err);
    // alert("Erro ao carregar suas postagens.");
  }
}

/**
 * Delega o evento de clique para o botão de deletar postagem.
 * @param {Event} event - O objeto do evento de clique.
 */
async function handleDeletePost(event) {
  //async vai esperar o servidor responder.Event é o clique do mouse.
  if (event.target.classList.contains("post-delete-btn")) {
    //Vai identificar se o botão de delete foi clicado
    const postId = event.target.dataset.postId; //Cada botão de deletar tem escondido dentro dele o ID do post, com isso sabe se qual será excluído
    if (confirm("Tem certeza que deseja deletar esta postagem?")) {
      //Se aceitar deletar
      try {
        await postRepo.deletePost(postId); //Apaga o post com o ID identificado
        await loadFeed(); // Recarrega o feed e as minhas postagens após a exclusão
        if (profileView.classList.contains("active")) {
          // Se estiver na tela de perfil, recarrega também as postagens do próprio usuário
          await loadMyPosts(); //Recarrega a tela dos posts do usuário
        }
      } catch (err) {
        console.error("Erro ao deletar postagem:", err); // alert(err.message || "Erro ao deletar postagem.");
      }
    }
  }
}

// Adiciona o event listener de clique para deletar posts no feed e no perfil
postsList.addEventListener("click", handleDeletePost); //Confirma se o botão clicado é de deletar, se sim, deletará tal post
myPostsList.addEventListener("click", handleDeletePost); //Confirma se o botão clicado é de deletar, se sim, deletará tal post

// === Event Listeners de Navegação ===
// Alterna para a tela de Login
btnLoginNav.addEventListener("click", () => showView(loginView, allViews)); //Quando clicar no botão Login, mostra a tela de login e esconde todas as outras

// Alterna para a tela de Registro
btnRegisterNav.addEventListener("click", () =>
  showView(registerView, allViews)
); //Ao clicar em "Criar conta", mostra a tela de registro.

// Alterna para a tela de Feed e carrega as postagens
btnFeedNav.addEventListener("click", async () => {
  await loadFeed(); // carrega os posts da API
  showView(feedView, allViews); // mostra a tela de feed
}); //Ao clicar em Feed, carrega os posts da API e mostra a tela de feed

// Alterna para a tela de Perfil, carrega perfil e postagens do usuário
btnProfileNav.addEventListener("click", async () => {
  await loadProfile(); //carrega os dados do usuário
  await loadMyPosts(); //carrega os posts do usuário
  showView(profileView, allViews); //mostra a tela de perfil
}); //Ao clicar em Perfil, carregas os dados, posts e a tela de perfil

// Realiza o logout do usuário
btnLogoutNav.addEventListener("click", () => {
  localStorage.removeItem("token"); // Remove o token do localStorage
  currentUser = null; // Limpa o usuário atual
  updateNav(); // Atualiza a navegação
  showView(loginView, allViews); // Redireciona para a tela de login
}); //Ao clicar em Sair, remove o token, atualiza e vai para a tela de login

// === Event Listeners de Links entre Telas (nos formulários) ===

//“Ainda não tem conta? Criar uma”
document.getElementById("link-to-register").addEventListener("click", () => {
  showView(registerView, allViews);
  loginError.textContent = ""; // Limpa qualquer erro de login
  loginForm.reset(); // Limpa o formulário de login
}); //Altera da tela de login para a tela de cadastro

//“Já tem conta? Fazer login”
document.getElementById("link-to-login").addEventListener("click", () => {
  showView(loginView, allViews);
  registerError.textContent = ""; // Limpa qualquer erro de registro
  registerForm.reset(); // Limpa o formulário de registro
}); //Altera para a tela de login, visando que usuário já possui conta

// === Event Listeners de Formulários ===

// Login do usuário
loginForm.addEventListener("submit", async (e) => {
  //Quando clicar no botão de login
  e.preventDefault(); //Evita que a página recarregue automaticamente
  loginError.textContent = ""; // Limpa mensagens de erro anteriores

  const email = loginForm["login-email"].value.trim(); // Acessa pelo ID do input //TRIM remove os espaços em branco do início e do final de uma string.
  const password = loginForm["login-password"].value.trim(); // Acessa pelo ID do input //TRIM remove os espaços em branco do início e do final de uma string.

  if (!email || !password) {
    //Verifica se os campos estão preenchidos
    loginError.textContent = "Por favor, preencha todos os campos.";
    return;
  }

  try {
    const data = await authRepo.login(email, password); //Guarda email e senha na variável data
    localStorage.setItem("token", data.token); // Armazena o token JWT
    await loadProfile(); // Carrega as informações do usuário logado e valida a partir da função loadProfile
    updateNav(); // Atualiza a navegação
    await loadFeed(); // Carrega o feed de postagens
    showView(feedView, allViews); // Exibe a tela de feed
    loginForm.reset(); // Limpa o formulário
  } catch (err) {
    console.error("Erro no login:", err);
    loginError.textContent =
      err.message || "Erro ao fazer login. Verifique suas credenciais.";
  }
});

// Registro de novo usuário
registerForm.addEventListener("submit", async (e) => {
  //Quando clicar no botão de cadastrar
  e.preventDefault(); //Evita que a página recarregue automaticamente
  registerError.textContent = ""; //Limpa mensagens de erro anteriores

  const username = registerForm["register-username"].value.trim();
  const email = registerForm["register-email"].value.trim();
  const password = registerForm["register-password"].value.trim();

  if (!username || !email || !password) {
    //Verifica se os campos estão preenchidos
    registerError.textContent = "Por favor, preencha todos os campos.";
    return;
  }
  if (password.length < 6) {
    registerError.textContent = "A senha deve ter no mínimo 6 caracteres.";
    return;
  }

  try {
    const data = await authRepo.register(username, email, password); //Guarda o nome do usuario email, senha na variável data
    localStorage.setItem("token", data.token); // Armazena o token JWT
    await loadProfile(); // Carrega as informações e valida a partir da função loadProfile
    updateNav(); // Atualiza a navegação
    await loadFeed(); // Carrega o feed de postagens
    showView(feedView, allViews); // Exibe a tela de feed
    registerForm.reset(); // Limpa o formulário
  } catch (err) {
    console.error("Erro no registro:", err);
    registerError.textContent =
      err.message || "Erro ao criar conta. Tente novamente.";
  }
});

// Criação de nova postagem
postForm.addEventListener("submit", async (e) => {
  //Quando clicar no botão de postar
  e.preventDefault(); //Evita que a página recarregue automaticamente
  const content = postContent.value.trim(); //Pega o que o usuario escreveu e guarda na variável content

  if (!content) {
    //Verifica se todos os campos foram preenchidos
    alert("A postagem não pode ser vazia."); // Usar alert apenas para este projeto, melhor seria mensagem na UI
    return;
  }
  if (content.length > 280) {
    alert("A postagem excedeu o limite de 280 caracteres.");
    return;
  }

  try {
    await postRepo.createPost(content); //Envia a postagem para a API e aguarda até responder (await)
    postForm.reset(); // Limpa o textarea
    charCount.textContent = "0 / 280"; // Reseta o contador
    await loadFeed(); // Recarrega o feed para exibir a nova postagem
  } catch (err) {
    console.error("Erro ao publicar postagem:", err);
    // alert("Erro ao publicar postagem.");
  }
});

// Contador de caracteres para o textarea de postagem
postContent.addEventListener("input", () => {
  //Cada vez que digitar no campo de postagem, atualiza o contador 0 / 280
  updateCharCount(postContent, charCount);
});

// === Edição de Perfil ===

// Exibe o formulário de edição do perfil
btnEditProfile.addEventListener("click", () => {
  //Quando clicar no botão de editar perfil
  editProfileForm.classList.remove("hidden"); // Mostra o formulário escondido
  btnEditProfile.hidden = true; // Oculta o botão "Editar Perfil"
  // Preenche os campos do formulário de edição com os dados atuais do usuário
  if (currentUser) {
    editProfileForm["edit-username"].value = currentUser.username;
    editProfileForm["edit-email"].value = currentUser.email;
  }
});

// Cancela a edição do perfil
btnCancelEdit.addEventListener("click", () => {
  //Quando clicar no botão de cancelar edição de perfil
  editProfileForm.classList.add("hidden"); // Oculta o formulário
  btnEditProfile.hidden = false; // Mostra o botão "Editar Perfil"
  editProfileForm.reset(); // Limpa o formulário de edição
});

// Salva as alterações do perfil
editProfileForm.addEventListener("submit", async (e) => {
  //Quando clicar no botão de salvar edição de perfil
  e.preventDefault(); //Evita que a página recarregue automaticamente
  const username = editProfileForm["edit-username"].value.trim(); //variável recebe username alterado
  const email = editProfileForm["edit-email"].value.trim(); //variável recebe email alterado

  if (!username || !email) {
    //Verifica se todos os campos foram preenchidos
    alert("Por favor, preencha todos os campos para atualizar o perfil.");
    return;
  }

  try {
    const updatedUser = await userRepo.updateProfile(username, email); //Envia os novos dados para a API e espera a resposta
    currentUser = updatedUser; // Atualiza o objeto currentUser
    profileUsernameSpan.textContent = updatedUser.username; // Atualiza o usuário na memória e na tela
    profileEmailSpan.textContent = updatedUser.email; // Atualiza o usuário na memória e na tela
    alert("Perfil atualizado com sucesso!"); // Usar alert apenas para este projeto
    editProfileForm.classList.add("hidden"); // Oculta o formulário
    btnEditProfile.hidden = false; // Mostra o botão "Editar Perfil"
  } catch (err) {
    console.error("Erro ao atualizar perfil:", err);
    alert(err.message || "Erro ao atualizar perfil. Tente novamente."); // Usar alert apenas para este projeto
  }
});

// === Inicialização da Aplicação ===
/**
 * Função de inicialização que verifica o estado de login
 * e carrega a view apropriada.
 */
function init() {
  updateNav(); // Atualiza a visibilidade dos botões de navegação
  if (localStorage.getItem("token")) {
    // Se há um token, tenta carregar o perfil e o feed
    loadProfile()
      .then(() => loadFeed())
      .then(() => showView(feedView, allViews)) // Exibe o feed se tudo ok
      .catch((err) => {
        // Se houver erro ao carregar o perfil/feed (ex: token inválido)
        console.error("Erro na inicialização com token existente:", err);
        localStorage.removeItem("token"); // Remove o token inválido
        currentUser = null;
        updateNav(); // Atualiza a navegação
        showView(loginView, allViews); // Redireciona para o login
      });
  } else {
    // Se não há token, exibe a tela de login
    showView(loginView, allViews);
  }
}

// Inicia a aplicação quando o script é carregado
// Usamos defer no script HTML, então o DOM estará pronto.
init();
