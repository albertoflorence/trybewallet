/* eslint-disable react-func/max-lines-per-function */
import { getLocalStorage, setLocalStorage } from '../../util/localStorage';
import {
  ADD_EXPENSE,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  GET_CURRENCIES,
  SORT_EXPENSE,
  START_EDIT_EXPENSE,
} from '../actions';

const defaultInputs = {
  value: '',
  description: '',
  currency: 'USD',
  method: '',
  tag: 'Alimentação',
};

const initialState = getLocalStorage('redux') || {
  currencies: [],
  expenses: [],
  total: 0,
  initialInputs: defaultInputs,
  isEditing: false,
};

const calculateTotal = (expenses) => expenses.reduce(
  (total, { value, exchangeRates, currency }) => total
  + Number(value) * Number(exchangeRates[currency].ask),
  0,
);

const handleExpenses = (expenses) => ({
  expenses,
  total: calculateTotal(expenses),
});

const sortExpenses = (a, b) => {
  if (Number(a)) return a - b;
  if (typeof a === 'string') return a.localeCompare(b);
  return false;
};

const walletReducer = (state = initialState, action) => {
  setLocalStorage('redux', state);
  switch (action.type) {
  case GET_CURRENCIES: {
    return {
      ...state,
      currencies: action.payload.filter((item) => item !== 'USDT'),
    };
  }

  case ADD_EXPENSE: {
    const { expenses } = state;
    const id = Math.max(...expenses.map((item) => item.id), 0) + 1;
    const newExpenses = expenses.concat({ ...action.payload, id });
    return {
      ...state,
      ...handleExpenses(newExpenses),
      initialInputs: { ...defaultInputs },
    };
  }
  case START_EDIT_EXPENSE: {
    return {
      ...state,
      initialInputs: { ...action.payload },
      isEditing: true,
    };
  }
  case EDIT_EXPENSE: {
    const { expenses } = state;
    const expense = action.payload;
    const findExpense = expenses.find((item) => item.id === expense.id);
    Object.assign(findExpense, expense);
    return {
      ...state,
      ...handleExpenses([...expenses]),
      isEditing: false,
      initialInputs: { ...defaultInputs },
    };
  }
  case DELETE_EXPENSE: {
    const { expenses } = state;
    const newExpenses = expenses.filter((item) => item.id !== action.payload);
    return {
      ...state,
      ...handleExpenses(newExpenses),
    };
  }
  case SORT_EXPENSE: {
    const { expenses } = state;
    const name = action.payload;

    return {
      ...state,
      expenses: [...expenses.sort((a, b) => sortExpenses(a[name], b[name]))],
    };
  }
  default:
    return state;
  }
};

export default walletReducer;
