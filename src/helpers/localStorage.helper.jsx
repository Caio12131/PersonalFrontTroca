/* File: src/helpers/localStorage.helper.jsx */

/* função que retorna o usuário armazenado no localStorage */
export const getUserInfo = () => {
  const userInfo = localStorage.getItem('nutritionAppUser');
  return userInfo ? JSON.parse(userInfo) : null;
};

/* função que armazena o usuário no localStorage */
export const saveUserInfo = (user) => {
  if (user) {
    const userInfo = {
      idToken: user.accessToken,
      email: user.email,
      userId: user.uid
    };
    localStorage.setItem('nutritionAppUser', JSON.stringify(userInfo));
  }
};

/* função que remove o usuário do localStorage */
export const removeUserInfo = () => {
  localStorage.removeItem('nutritionAppUser');
};

export const addPaymentEFI = (payment) => {
  localStorage.setItem('Payment', JSON.stringify(payment));
};

export const getPaymentEFI = () => {
  const Payment = localStorage.getItem('Payment');
  const PaymentId = Payment === undefined ? null : Payment
  return PaymentId ? JSON.parse(PaymentId) : null;
};

export const removePaymentEFI = () => {
  localStorage.removeItem('Payment');
};

export const addQrCode = (qr) => {
  localStorage.setItem('QrCode', JSON.stringify(qr));
};

export const getQrCode = () => {
  const PaymentId = localStorage.getItem('QrCode');
  return PaymentId ? JSON.parse(PaymentId) : null;
};
export const removeQrCode = () => {
  localStorage.removeItem('QrCode');
};


export const addPaymentIdEFI = (PaymentId) => {
  localStorage.setItem('nutritionAppPaymentIdEFI', JSON.stringify(PaymentId));
};

/* função que retorna o PaymentId armazenado no localStorage */
export const getPaymentIdEFI = () => {
  const PaymentId = localStorage.getItem('nutritionAppPaymentIdEFI');
  return PaymentId ? JSON.parse(PaymentId) : null;
};

export const removePaymentIdEFI = () => {
  localStorage.removeItem('nutritionAppPaymentIdEFI');
};

export const addStatusIdEFI = (PaymentId) => {
  localStorage.setItem('nutritionAppStatusIdEFI', JSON.stringify(PaymentId));
};

/* função que retorna o PaymentId armazenado no localStorage */
export const getStatusIdEFI = () => {
  const PaymentId = localStorage.getItem('nutritionAppStatusIdEFI');
  return PaymentId ? JSON.parse(PaymentId) : null;
};

export const removeStatusIdEFI = () => {
  localStorage.removeItem('nutritionAppStatusIdEFI');
};

export const setPaymentStartTimeEFI = () => {
  const startTime = Date.now();
  localStorage.setItem('nutritionAppPaymentStartTimeEFI', JSON.stringify(startTime));
};

/* Retorna o timestamp de início do pagamento armazenado no localStorage */
export const getPaymentStartTimeEFI = () => {
  const startTime = localStorage.getItem('nutritionAppPaymentStartTimeEFI');
  return startTime ? JSON.parse(startTime) : null;
};

/* Remove o timestamp de início do pagamento do localStorage */
export const removePaymentStartTimeEFI = () => {
  localStorage.removeItem('nutritionAppPaymentStartTimeEFI');
};

/* função que armazena o PaymentId no localStorage */
export const addPaymentId = (PaymentId) => {
  localStorage.setItem('nutritionAppPaymentId', JSON.stringify(PaymentId));
};

/* função que retorna o PaymentId armazenado no localStorage */
export const getPaymentId = () => {
  const PaymentId = localStorage.getItem('nutritionAppPaymentId');
  return PaymentId ? JSON.parse(PaymentId) : null;
};

/* função que remove o PaymentId do localStorage */
export const removePaymentId = () => {
  localStorage.removeItem('nutritionAppPaymentId');
};
export const setPaymentStartTime = () => {
  const startTime = Date.now();
  localStorage.setItem('nutritionAppPaymentStartTime', JSON.stringify(startTime));
};

/* Retorna o timestamp de início do pagamento armazenado no localStorage */
export const getPaymentStartTime = () => {
  const startTime = localStorage.getItem('nutritionAppPaymentStartTime');
  return startTime ? JSON.parse(startTime) : null;
};

/* Remove o timestamp de início do pagamento do localStorage */
export const removePaymentStartTime = () => {
  localStorage.removeItem('nutritionAppPaymentStartTime');
};
