import { ADD_EXPENSE, GET_CURRENCIES } from '../actions';

const initialState = {
  currencies: [],
  expenses: [],
  total: 0,
};

const walletReducer = (state = initialState, action) => {
  switch (action.type) {
  case GET_CURRENCIES: {
    return {
      ...state,
      currencies: action.payload.filter((item) => item !== 'USDT'),
    };
  }

  case ADD_EXPENSE: {
    const { expenses, total } = state;
    const { exchangeRates } = action.payload;
    const { currency } = action.payload;
    const exchangeValue = Number(action.payload.value)
      * Number(exchangeRates[currency].ask);
    const id = expenses.length;
    return {
      ...state,
      expenses: expenses.concat({ ...action.payload, id, exchangeValue }),
      total: total + exchangeValue,
    };
  }
  default:
    return state;
  }
};

export default walletReducer;
