// Coloque aqui suas actions
export const LOGIN = 'LOGIN';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const START_EDIT_EXPENSE = 'START_EDIT_EXPENSE';
export const SORT_EXPENSE = 'SORT_EXPENSE';

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

export const editExpense = (expense) => ({
  type: EDIT_EXPENSE,
  payload: expense,
});

export const deleteExpense = (id) => ({
  type: DELETE_EXPENSE,
  payload: id,
});

export const startEditExpense = (expense) => ({
  type: START_EDIT_EXPENSE,
  payload: expense,
});

export const sortExpense = (fieldName) => ({
  type: SORT_EXPENSE,
  payload: fieldName,
});
