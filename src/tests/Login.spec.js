import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const getEmail = () => screen.getByTestId('email-input');
const getPassword = () => screen.getByTestId('password-input');
const getLoginButton = () => screen.getByRole('button', { name: 'Entrar' });

describe('<Login />', () => {
  it('should disabled the button if incorrect inputs are provided', () => {
    renderWithRouterAndRedux(<Login />);
    userEvent.type(getEmail(), 'invalid_mail');
    userEvent.type(getPassword(), '12345');

    expect(getLoginButton()).toBeDisabled();
  });

  it('should be redirected to carteira after login', () => {
    const { history } = renderWithRouterAndRedux(<Login />);
    userEvent.type(getEmail(), 'test@mail.com');
    userEvent.type(getPassword(), '123456');
    userEvent.click(getLoginButton());

    expect(history.location.pathname).toBe('/carteira');
  });
});
