// Coloque aqui suas actions
export const LOGIN = 'LOGIN';
export const GET_CURRENCIES = 'GET_CURRENCIES';

export const login = (inputs) => ({
  type: LOGIN,
  payload: inputs,
});

export const getCurrencies = () => async (dispatch) => {
  const result = await fetch('https://economia.awesomeapi.com.br/json/all')
    .then((r) => r.json());

  const currencies = Object.keys(result);
  dispatch({
    type: GET_CURRENCIES,
    payload: currencies,
  });
};
