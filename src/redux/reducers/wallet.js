import {
  ADD_EXPENSE,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  GET_CURRENCIES,
  START_EDIT_EXPENSE,
} from '../actions';

const defaultInputs = {
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

const initialState = {
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
    const newExpenses = expenses.concat({ ...action.payload, id: expenses.length });
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
  default:
    return state;
  }
};

export default walletReducer;
