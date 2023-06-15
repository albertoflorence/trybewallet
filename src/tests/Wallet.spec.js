import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';
import exchangeRates from './helpers/mockData';

const initialState = {
  wallet: {
    expenses: [
      {
        id: 0,
        value: '5',
        description: '5 dólares',
        method: 'Dinheiro',
        currency: 'USD',
        tag: 'Alimentação',
        exchangeRates,
      },
      {
        id: 1,
        value: '10',
        description: '10 euros',
        method: 'Cartão de crédito',
        currency: 'EUR',
        tag: 'Lazer',
        exchangeRates,
      },
    ],
    total: 75.03,
    currencies: Object.keys(exchangeRates),
  },
};
describe('<Wallet />', () => {
  it('should render the header correctly', () => {
    renderWithRouterAndRedux(<Wallet />, { initialState: { user: {
      email: 'test@mail.com',
    } } });
    expect(screen.getByTestId('email-field')).toHaveTextContent('test@mail.com');
    expect(screen.getByTestId('total-field')).toHaveTextContent('0.00');
    expect(screen.getByTestId('header-currency-field')).toHaveTextContent('BRL');
  });
  it('should add a expense', async () => {
    renderWithRouterAndRedux(<Wallet />);
    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const methodInput = screen.getByTestId('method-input');
    const currencyInput = screen.getByTestId('currency-input');
    const tagInput = screen.getByTestId('tag-input');
    const addButton = screen.getByRole('button', { name: 'Adicionar despesa' });

    await waitFor(() => userEvent.selectOptions(currencyInput, 'USD'));

    userEvent.type(valueInput, '10');
    userEvent.type(descriptionInput, 'test');

    userEvent.selectOptions(methodInput, 'Dinheiro');
    userEvent.selectOptions(tagInput, 'Lazer');
    userEvent.click(addButton);

    expect(valueInput).toHaveValue(null);
  });
  it('should render the table correctly', () => {
    renderWithRouterAndRedux(<Wallet />, { initialState });
    expect(screen.getByText('5.00')).toBeInTheDocument();
    expect(screen.getByText('5 dólares')).toBeInTheDocument();
    expect(screen.getByText('Dinheiro', { selector: 'td' })).toBeInTheDocument();
    expect(screen.getByText('USD', { selector: 'td' })).toBeInTheDocument();
    expect(screen.getByText('Alimentação', { selector: 'td' })).toBeInTheDocument();
    expect(screen.getByText('23.77', { selector: 'td' })).toBeInTheDocument();
    expect(screen.getByText('4.75')).toBeInTheDocument();
    expect(screen.getByText('Dólar Americano/Real Brasileiro')).toBeInTheDocument();
    expect(screen.getAllByTestId('edit-btn')).toHaveLength(2);
    expect(screen.getAllByTestId('delete-btn')).toHaveLength(2);
  });

  it('should delete a expense', () => {
    renderWithRouterAndRedux(<Wallet />, { initialState });
    const deleteButton = screen.getAllByTestId('delete-btn')[0];
    userEvent.click(deleteButton);
    expect(screen.queryByText('5.00')).not.toBeInTheDocument();
    expect(screen.queryByText('10.00')).toBeInTheDocument();
  });
});
