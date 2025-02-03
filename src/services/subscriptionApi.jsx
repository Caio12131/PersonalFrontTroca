
import api from './axios';


class HttpError extends Error {
  /**
   * Constrói uma instância de HttpError.
   * @param {string} message - Mensagem de erro.
   * @param {number} status - Status HTTP do erro.
   */
  constructor(message, status) {
    super(message); // Chama o construtor da classe Error
    this.status = status; // Adiciona a propriedade status ao erro
  }
}

/**
 * Função genérica para tratar requisições HTTP.
 * Executa a função de requisição fornecida e lida com possíveis erros HTTP.
 * @param {Function} requestFunc - Função que executa a requisição HTTP.
 * @param {string} errorMessage - Mensagem de erro padrão a ser usada caso a requisição falhe.
 * @returns {Promise} O resultado da requisição HTTP se bem-sucedida.
 * @throws {Error} Em caso de falha na requisição, lança um erro com a mensagem e o status HTTP.
 */
async function handleRequest(requestFunc, errorMessage) {
  try {
    const result = await requestFunc();

    if (![200, 201].includes(result.status)) {
      throw new HttpError(`HTTP error! Status: ${result.status}`, result.status);
    }

    return result.data;
  } catch (error) {
    console.log(error);
    const outputErrorMessage = error.response?.data?.message || error.response?.statusText || errorMessage;
    const outputErrorStatus = error.response?.status || 500;

    throw new HttpError(outputErrorMessage, outputErrorStatus);
  }
}



/**
 * Envia as informações do pagamento para o backend para processamento.
 * Inclui o token de autenticação do Firebase no cabeçalho para segurança.
 * @param {Object} paymentDetails - Detalhes do pagamento.
 * @param {string} idToken - Token de autenticação do Firebase.
 * @returns {Promise} Resposta do servidor após processar o pagamento.
 */
async function processPayment(paymentDetails, idToken) {
  console.log('paymentDetails', paymentDetails);
  return handleRequest(() => api.post('/process_payment', paymentDetails, {
    headers: {
      Authorization: idToken
    }
  }), 'Error during payment processing');
}

/**
 * Envia o ID do pagamento para o backend para processar o status do pagamento.
 * O token de autenticação do Firebase é enviado no cabeçalho para segurança.
 * @param {string} userId - ID do usuário.
 * @param {string} paymentId - ID do pagamento.
 * @param {string} idToken - Token de autenticação do Firebase.
 * @returns {Promise} Resposta do servidor sobre o status do pagamento.
 */
async function processPaymentStatus(userId, paymentId, idToken) {
  return handleRequest(
    () => api.post('/process_payment/status', { userId, paymentId }, {
      headers: {
        Authorization: idToken
      }
    }),
    'Error processing payment status',
  );
}

/**
 * Envia o ID do pagamento para o backend para cancelar o pagamento.
 * Inclui o token de autenticação do Firebase no cabeçalho para segurança.
 * @param {string} paymentId - ID do pagamento a ser cancelado.
 * @param {string} idToken - Token de autenticação do Firebase.
 * @returns {Promise} Resposta do servidor após tentativa de cancelamento do pagamento.
 */
async function cancelPayment(paymentId, idToken) {
  const url = `/process_payment/cancel/${paymentId}`;
  return handleRequest(() => api.patch(url, null, {
    headers: {
      Authorization: idToken
    }
  }), 'Error during payment cancellation');
}

export {
  processPayment,
  processPaymentStatus,
  cancelPayment,
};
