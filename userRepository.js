// repositories/userRepository.js

// URL base da API conforme especificado no projeto
const API_BASE_URL = "https://mini-twitter-api-vy9q.onrender.com/api"; //Guarda o servidor na variável API_BASE_URL

/**
 * Obtém o token JWT do localStorage.
 * @returns {string | null} Retorna o token JWT se existir, caso contrário, null.
 */
function getToken() {
  return localStorage.getItem("token"); //Função pega o token no localStorage (armazenamento do navegador)
}

/**
 * Retorna o perfil do usuário logado na API.
 * Requer autenticação (token JWT).
 * @returns {Promise<Object>} Um objeto contendo os dados do perfil do usuário.
 * @throws {Error} Se a requisição falhar, o token estiver ausente/inválido ou a API retornar um erro.
 */
export async function getProfile() {
  const token = getToken(); //Pega o token e guarda na variável token
  if (!token) {
    //Realiza a validação do token
    throw new Error("Não autorizado. Token não encontrado.");
  }

  try {
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      //fetch faz uma requisição ao servidor, no caso, com a parte de users (/users/profile)
      method: "GET", //método a ser usado: PEGAR
      headers: {
        "Content-Type": "application/json", //Json é o tipo de mensagem que o servidor entende
        Authorization: `Bearer ${token}`, // Inclui o token no cabeçalho de Autorização //O Bearer é só uma palavra que o servidor espera antes do crachá.
      },
    });

    const data = await response.json(); //Aguarda a resposta do servidor e guarda na variável data

    if (!response.ok) {
      //Se der algo errado, lança um erro com a mensagem da API ou uma mensagem padrão
      throw new Error(data.message || "Erro desconhecido ao carregar perfil.");
    }

    return data; //Se der certo, retorna os dados do perfil do usuário
  } catch (error) {
    console.error("Erro na requisição de perfil:", error);
    throw error; //Propaga o erro para ser tratado pelo appController
  }
}

/**
 * Atualiza o perfil do usuário logado na API.
 * Requer autenticação (token JWT).
 * @param {string} username - O novo nome de usuário.
 * @param {string} email - O novo email.
 * @returns {Promise<Object>} Um objeto contendo a mensagem de sucesso e os dados do usuário atualizados.
 * @throws {Error} Se a requisição falhar, o token estiver ausente/inválido ou a API retornar um erro.
 */
export async function updateProfile(username, email) {
  const token = getToken(); //Pega o token e guarda na variável token
  if (!token) {
    //Realiza a validação do token
    throw new Error("Não autorizado. Token não encontrado.");
  }

  try {
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      //fetch faz uma requisição ao servidor, no caso, com a parte de users (/users/profile)
      method: "PUT", //método a ser usado: COLOCAR infos novas no lugar
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, //Inclui o token no cabeçalho de Autorização //O Bearer é só uma palavra que o servidor espera antes do crachá.
      },
      body: JSON.stringify({ username, email }), //Envia os dados atualizados em formato que o servidor entenda (JSON)
    });

    const data = await response.json(); //Aguarda a resposta do servidor e guarda na variável data

    if (!response.ok) {
      //Se der errado, lança um erro com a mensagem da API ou uma mensagem padrão
      throw new Error(data.message || "Erro desconhecido ao atualizar perfil.");
    }

    return data.user; //Se der certo, retorna o objeto 'user' dentro da resposta
  } catch (error) {
    console.error("Erro na requisição de atualização de perfil:", error);
    throw error; // Propaga o erro para ser tratado pelo appController
  }
}
