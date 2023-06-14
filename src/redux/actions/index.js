// Coloque aqui suas actions
export const LOGIN = 'LOGIN';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const ADD_EXPENSE = 'ADD_EXPENSE';

const fetchCurrencies = () => fetch('https://economia.awesomeapi.com.br/json/all')
  .then((r) => r.json());

export const login = (inputs) => ({
  type: LOGIN,
  payload: inputs,
});

export const getCurrencies = () => async (dispatch) => {
  const currencies = await fetchCurrencies();
  const currenciesNames = Object.keys(currencies);
  dispatch({
    type: GET_CURRENCIES,
    payload: currenciesNames,
  });
};

export const addExpense = (expense) => async (dispatch) => {
  const exchangeRates = await fetchCurrencies();
  dispatch({
    type: 'ADD_EXPENSE',
    payload: {
      ...expense,
      exchangeRates,
    },
  });
};
