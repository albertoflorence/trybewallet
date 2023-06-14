import { ADD_EXPENSE, DELETE_EXPENSE, EDIT_EXPENSE, GET_CURRENCIES } from '../actions';

const initialState = {
  currencies: [],
  expenses: [],
  total: 0,
};

const calculateTotal = (expenses) => expenses.reduce(
  (total, { value, exchangeRates, currency }) => total
    + Number(value) * Number(exchangeRates[currency].ask),
  0,
);

const walletReducer = (state = initialState, action) => {
  switch (action.type) {
  case GET_CURRENCIES: {
    return {
      ...state,
      currencies: action.payload.filter((item) => item !== 'USDT'),
    };
  }

  case ADD_EXPENSE: {
    const { expenses } = state;
    const id = expenses.length;
    const newExpenses = expenses.concat({ ...action.payload, id });

    return {
      ...state,
      expenses: newExpenses,
      total: calculateTotal(newExpenses),
    };
  }
  case EDIT_EXPENSE: {
    const { expenses } = state;
    const { id, expense } = action.payload;
    const findExpense = expenses.find((item) => item.id === id);
    Object.assign(findExpense, expense);
    return {
      ...state,
      expenses,
      total: calculateTotal(expenses),
    };
  }
  case DELETE_EXPENSE: {
    const { expenses } = state;
    const newExpenses = expenses.filter((item) => item.id !== action.payload);
    return {
      ...state,
      expenses: newExpenses,
      total: calculateTotal(newExpenses),
    };
  }
  default:
    return state;
  }
};

export default walletReducer;
