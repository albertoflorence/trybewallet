import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';
import exchangeRates from './helpers/mockData';

const initialState = {
  user: {
    email: 'test@mail.com',
  },
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
    isEditing: false,
    initialInputs: {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Lazer',
    },
  },
};

describe('<Wallet />', () => {
  it('should render the header correctly', () => {
    const { user, wallet } = initialState;
    renderWithRouterAndRedux(<Wallet />, {
      initialState: { user, wallet: { ...wallet, expenses: [], total: 0 } },
    });
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

  it('should edit a expense', () => {
    renderWithRouterAndRedux(<Wallet />, { initialState });

    userEvent.click(screen.getAllByTestId('edit-btn')[0]);

    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const methodInput = screen.getByTestId('method-input');
    const currencyInput = screen.getByTestId('currency-input');

    userEvent.selectOptions(currencyInput, 'EUR');
    userEvent.type(valueInput, '0');
    userEvent.clear(descriptionInput);
    userEvent.type(descriptionInput, '50 dólares');
    userEvent.selectOptions(methodInput, 'Cartão de débito');

    const editButton = screen.getByRole('button', { name: 'Editar despesa' });
    userEvent.click(editButton);

    expect(screen.getByText('50.00')).toBeInTheDocument();
    expect(screen.getByText('50 dólares')).toBeInTheDocument();
    expect(screen.getByText('Cartão de débito', { selector: 'td' })).toBeInTheDocument();
    expect(screen.getByText('256.34')).toBeInTheDocument();
  });
});
