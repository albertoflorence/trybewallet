import { GET_CURRENCIES } from '../actions';

const initialState = {
  currencies: [],
};

const walletReducer = (state = initialState, action) => {
  switch (action.type) {
  case GET_CURRENCIES: {
    console.log(action);
    return {
      ...state,
      currencies: action.payload.filter((item) => item !== 'USDT'),
    };
  }
  default:
    return state;
  }
};

export default walletReducer;
