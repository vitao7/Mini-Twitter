// URL base da API conforme especificado no projeto
const API_BASE_URL = "https://mini-twitter-api-vy9q.onrender.com/api"; //Guarda o servidor na variável API_BASE_URL

/**
 * Obtém o token JWT do localStorage.
 * @returns {string | null} Retorna o token JWT se existir, e caso contrário, null.
 */
function getToken() {
  return localStorage.getItem("token"); //Função pega o token no localStorage (armazenamento do navegador)
}

/**
 * Cria uma nova postagem na API.
 * Requer autenticação (token JWT).
 * @param {string} content - O conteúdo da postagem.
 * @returns {Promise<Object>} Um objeto contendo os dados da postagem criada.
 * @throws {Error} Se a requisição falhar, o token estiver ausente/inválido ou a API retornar um erro.
 */
export async function createPost(content) {
  const token = getToken(); //Pega o token e guarda na variável token
  if (!token) {
    //Realiza a validação do token
    throw new Error("Não autorizado. Token não encontrado.");
  }

  try {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      //fetch faz uma requisição ao servidor, no caso, com a parte de posts (/posts)
      method: "POST", //método a ser usado: POSTAR
      headers: {
        "Content-Type": "application/json", //Json é o tipo de mensagem que o servidor entende
        Authorization: `Bearer ${token}`, // Inclui o token no cabeçalho //O Bearer é só uma palavra que o servidor espera antes do crachá.
      },
      body: JSON.stringify({ content }), //Pega o conteúdo e  transforma no formato organizado que o servidor entende (JSON).
    });

    const data = await response.json(); //Aguarda a resposta do servidor e guarda na variável data

    if (!response.ok) {
      //Se der algo errado; resposta não foi boa, transmite erro
      throw new Error(data.message || "Erro desconhecido ao criar postagem.");
    }

    return data; // Se der certo, retorna os dados da postagem criada
  } catch (error) {
    console.error("Erro na requisição de criação de postagem:", error);
    throw error;
  }
}

/**
 * Lista todas as postagens da API.
 * Requer autenticação (token JWT).
 * @returns {Promise<Array<Object>>} Um array de objetos de postagens.
 * @throws {Error} Se a requisição falhar, o token estiver ausente/inválido ou a API retornar um erro.
 */
export async function getPosts() {
  const token = getToken(); //Pega o token e guarda na variável token
  if (!token) {
    //Realiza a validação do token
    throw new Error("Não autorizado. Token não encontrado.");
  }

  try {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      //fetch faz uma requisição ao servidor, no caso, com a parte de posts (/posts)
      method: "GET", //método a ser usado: PEGAR
      headers: {
        "Content-Type": "application/json", //Json é o tipo de mensagem que o servidor entende
        Authorization: `Bearer ${token}`, // Inclui o token no cabeçalho //O Bearer é só uma palavra que o servidor espera antes do crachá.
      },
    });

    const data = await response.json(); //Aguarda a resposta do servidor e guarda na variável data

    if (!response.ok) {
      //Se deu algo errado; resposta não foi boa, transmite erro
      throw new Error(data.message || "Erro desconhecido ao listar postagens.");
    }

    return data; //Se der certo, retorna o array de postagens
  } catch (error) {
    console.error("Erro na requisição de listagem de postagens:", error);
    throw error;
  }
}

/**
 * Lista as postagens do usuário logado na API.
 * Requer autenticação (token JWT).
 * @returns {Promise<Array<Object>>} Um array de objetos de postagens do usuário logado.
 * @throws {Error} Se a requisição falhar, o token estiver ausente/inválido ou a API retornar um erro.
 */
export async function getMyPosts() {
  const token = getToken(); //Pega o token e guarda na variável token
  if (!token) {
    //Realiza a validação do token
    throw new Error("Não autorizado. Token não encontrado.");
  }

  try {
    const response = await fetch(`${API_BASE_URL}/posts/my-posts`, {
      //fetch faz uma requisição ao servidor, no caso, com a parte de posts (/posts/my-posts)
      method: "GET", //método a ser usado: PEGAR
      headers: {
        "Content-Type": "application/json", //Json é o tipo de mensagem que o servidor entende
        Authorization: `Bearer ${token}`, // Inclui o token no cabeçalho //O Bearer é só uma palavra que o servidor espera antes do crachá.
      },
    });

    const data = await response.json(); //Aguarda a resposta do servidor e guarda na variável data

    if (!response.ok) {
      //Se deu algo errado; resposta não foi boa, transmite erro
      throw new Error(
        data.message || "Erro desconhecido ao listar suas postagens."
      );
    }

    return data; //Se der certo, retorna o array de postagens do usuário logado
  } catch (error) {
    console.error("Erro na requisição de minhas postagens:", error);
    throw error;
  }
}

/**
 * Deleta uma postagem específica da API.
 * Requer autenticação (token JWT).
 * @param {string} postId - O ID da postagem a ser deletada.
 * @returns {Promise<Object>} Um objeto com uma mensagem de sucesso.
 * @throws {Error} Se a requisição falhar, o token estiver ausente/inválido, o usuário não tiver permissão
 * ou a postagem não for encontrada.
 */
export async function deletePost(postId) {
  const token = getToken(); //Pega o token e guarda na variável token
  if (!token) {
    //Realiza a validação do token
    throw new Error("Não autorizado. Token não encontrado.");
  }

  try {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
      //fetch faz uma requisição ao servidor, no caso, com a parte de posts (/posts/Id do post em questão)
      method: "DELETE", //método a ser usado: DELETAR
      headers: {
        Authorization: `Bearer ${token}`, // Inclui o token no cabeçalho //O Bearer é só uma palavra que o servidor espera antes do crachá.
      },
    });

    const data = await response.json(); //Aguarda a resposta do servidor e guarda na variável data

    if (!response.ok) {
      //Se deu algo errado; resposta não foi boa, transmite erro
      throw new Error(data.message || "Erro desconhecido ao deletar postagem.");
    }

    return data; // Se der certo, retorna a mensagem de sucesso
  } catch (error) {
    console.error(
      `Erro na requisição de exclusão da postagem ${postId}:`,
      error
    );
    throw error;
  }
}
