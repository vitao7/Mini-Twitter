/**
 * Exibe uma view específica e oculta todas as outras views na lista fornecida.
 * @param {HTMLElement} viewToShow - O elemento DOM da view a ser exibida.
 * @param {Array<HTMLElement>} allViews - Um array contendo todos os elementos DOM das views.
 */
export function showView(viewToShow, allViews) {
  //viewToShow = página que deve ser mostrada; allViews = todas as demais páginas //Dividos em sections no HTML
  allViews.forEach((view) => {
    if (view === viewToShow) {
      //Verifica se a página é a mesma que deve ser mostrada
      view.classList.add("active"); //Se sim, adiciona a classe 'active' para exibir
    } else {
      view.classList.remove("active"); //Se não, remove a classe 'active' para ocultar
    }
  });
}

/**
 * Renderiza uma lista de postagens em um contêiner HTML.
 * @param {Array<Object>} posts - Um array de objetos de postagem.
 * @param {HTMLElement} container - O elemento DOM onde as postagens serão renderizadas.
 * @param {string} currentUserId - O ID do usuário logado para verificar se o botão de deletar deve ser exibido.
 */
export function renderPosts(posts, container, currentUserId) {
  container.innerHTML = ""; // Limpa o conteúdo atual do contêiner para colocar mensagens novas

  if (posts.length === 0) {
    //Se a lista de mensagens estiver vazia
    container.innerHTML =
      "<p style='text-align: center; color: #777;'>Nenhuma postagem encontrada.</p>";
    return;
  }
  //Se a lista de mensagens não estiver vazia
  posts.forEach((post) => {
    const postElement = document.createElement("div"); //cria uma caixinha de mensagem, no HTML vira uma div
    postElement.classList.add("post"); //Estiliza essa caixinha com o comando do CSS //classList é uma habilidade especial que todos
    //esses pedaços de HTML criados já possuem, permitindo que a gente gerencie as "etiquetas" (classes CSS) deles.

    // Formata a data da postagem
    const postDate = new Date(post.createdAt); //Pega data e hora e guarda na variável postDate
    const formattedDate = postDate.toLocaleString("pt-BR", {
      // transforma o postDate num texto fácil de ler e em português
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    // Conteúdo HTML de uma postagem
    //innerHTML permite obter/alterar o HTML diretamente daqui
    postElement.innerHTML = ` 
      <div class="post-header">
        <span class="post-author">@${post.author.username}</span>
        <span class="post-date">${formattedDate}</span>
      </div>
      <p class="post-content">${post.content}</p>
      ${
        post.author._id === currentUserId
          ? `<button class="post-delete-btn" data-post-id="${post._id}">Deletar</button>`
          : ""
      }
    `;
    // O botão "Deletar" é adicionado apenas se o autor da postagem for o usuário logado.
    // data-post-id armazena o ID da postagem para facilitar a exclusão.

    container.appendChild(postElement); //Depois de criar a caixinha de post, é colocado na caixa maior (container)
  });
}

/**
 * Atualiza o contador de caracteres para um textarea.
 * @param {HTMLTextAreaElement} textarea - O elemento textarea.
 * @param {HTMLElement} charCountElement - O elemento onde o contador será exibido.
 */
export function updateCharCount(textarea, charCountElement) {
  const currentLength = textarea.value.length; //guarda a quantia atual de caracteres na variável currentLenght
  const maxLength = textarea.maxLength; // Obtém o maxlength do atributo do textarea
  charCountElement.textContent = `${currentLength} / ${maxLength}`; //Separa o numero de caracteres atuais / numero máximo de caracteres permitidos

  //Adiciona estilo para indicar que o limite foi atingido
  if (currentLength >= maxLength) {
    charCountElement.style.color = "#e0245e"; //Vermelho
  } else {
    charCountElement.style.color = "#555"; //Cor padrão
  }
}
