// URL base da API conforme especificado no projeto
const API_BASE_URL = "https://mini-twitter-api-vy9q.onrender.com/api"; //Guarda o servidor na variável API_BASE_URL

/**
 * Realiza o registro de um novo usuário na API.
 * @param {string} username - O nome de usuário para o novo registro.
 * @param {string} email - O email para o novo registro.
 * @param {string} password - A senha para o novo registro.
 * @returns {Promise<Object>} Um objeto contendo o token JWT e os dados do usuário.
 * @throws {Error} Se a requisição falhar ou retornar um erro da API.
 */
export async function register(username, email, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", //Json é o tipo de mensagem que o servidor entende
      },
      body: JSON.stringify({ username, email, password }), //Pega os parâmetros e transforma no formato organizado que o servidor entende (JSON).
    });

    const data = await response.json(); //Aguarda a resposta do servidor e guarda na variável data

    if (!response.ok) {
      // Lança um erro com a mensagem da API se a resposta não for bem-sucedida
      throw new Error(data.message || "Erro desconhecido ao registrar.");
    }

    return data; // Retorna o token e os dados do usuário
  } catch (error) {
    console.error("Erro na requisição de registro:", error);
    throw error; // Propaga o erro para ser tratado pelo appController
  }
}

/**
 * Realiza o login de um usuário existente na API.
 * @param {string} email - O email do usuário para login.
 * @param {string} password - A senha do usuário para login.
 * @returns {Promise<Object>} Um objeto contendo o token JWT e os dados do usuário.
 * @throws {Error} Se a requisição falhar ou retornar um erro da API.
 */
export async function login(email, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      //fetch faz uma requisição ao servidor, no caso, com a parte de auth (/auth/login)
      method: "POST", //método a ser usado: POSTAR, enviar minhas infos para entrar na aplicação
      headers: {
        "Content-Type": "application/json", //Json é o tipo de mensagem que o servidor entende
      },
      body: JSON.stringify({ email, password }), //Pega os parâmetros e transforma no formato organizado que o servidor entende (JSON).
    });

    const data = await response.json(); //Aguarda a resposta do servidor e guarda na variável data

    if (!response.ok) {
      //Se der errado, lança um erro com a mensagem da API se a resposta não for bem-sucedida
      throw new Error(data.message || "Erro desconhecido ao fazer login.");
    }

    return data; //Se der certo, retorna o token e os dados do usuário
  } catch (error) {
    console.error("Erro na requisição de login:", error);
    throw error; // Propaga o erro para ser tratado pelo appController
  }
}
