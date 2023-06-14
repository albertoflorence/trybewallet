import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';

const initialState = {
  user: {
    email: 'test@mail.com',
  },
};

describe('<Wallet />', () => {
  it('should render the reader correctly', () => {
    renderWithRouterAndRedux(<Wallet />, { initialState });
    expect(screen.getByTestId('email-field')).toHaveTextContent('test@mail.com');
    expect(screen.getByTestId('total-field')).toHaveTextContent('0.00');
    expect(screen.getByTestId('header-currency-field')).toHaveTextContent('BRL');
  });
});
