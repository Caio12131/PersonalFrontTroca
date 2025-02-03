import { initMercadoPago } from '@mercadopago/sdk-react';

const MERCADOPAGO_PUBLIC_KEY = process.env.REACT_APP_MERCADOPAGO_PUBLIC_KEY;

const initializeMercadoPago = () => {
  initMercadoPago(MERCADOPAGO_PUBLIC_KEY, {
    locale: 'pt-BR',
  });
};

export default initializeMercadoPago;
