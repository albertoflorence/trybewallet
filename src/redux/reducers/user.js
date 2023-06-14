import { LOGIN } from '../actions';

const initialState = {};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
  case LOGIN: {
    const { email } = action.payload;
    return { email };
  }
  default:
    return state;
  }
};

export default userReducer;
