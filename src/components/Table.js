import React from 'react';
import PropTypes from 'prop-types';
import Editar from './icons/Editar';
import Excluir from './icons/Excluir';

const titles = [
  { title: 'Descrição', name: 'description' },
  { title: 'Tag', name: 'tag' },
  { title: 'Método de pagamento', name: 'method' },
  { title: 'Valor', name: 'value' },
  { title: 'Moeda', name: 'currency' },
  { title: 'Câmbio utilizado', name: 'description' },
  { title: 'Valor convertido', name: 'exchangeValue' },
  { title: 'Moeda de conversão', name: '' },
  { title: 'Editar/Excluir', name: '' },
];
function Table({ expenses, deleteExpense, startEditExpense, onSort }) {
  return (
    <section className="wallet-table">
      <table>
        <thead>
          <tr>
            {titles.map(({ title, name }) => (
              <th key={ title }>
                <div
                  onClick={ () => onSort(name) }
                  role="button"
                  tabIndex="0"
                  onKeyDown={ () => undefined }
                >
                  {title}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => {
            const
              { id, description, method, value, currency, tag, exchangeRates } = expense;
            const { name } = exchangeRates[currency];
            const exchangeValue = Number(value) * Number(exchangeRates[currency].ask);
            return (
              <tr key={ id }>
                <td>{description}</td>
                <td>{tag}</td>
                <td>{method}</td>
                <td>{Number(value).toFixed(2)}</td>
                <td>{currency}</td>
                <td>{name}</td>
                <td>{Number(exchangeValue).toFixed(2)}</td>
                <td>Real</td>
                <td>
                  <button
                    data-testid="edit-btn"
                    onClick={ () => startEditExpense(expense) }
                    aria-label="Editar"
                  >
                    <Editar />
                  </button>
                  <button
                    data-testid="delete-btn"
                    aria-label="Excluir"
                    onClick={ () => deleteExpense(id) }
                  >
                    <Excluir />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}

export default Table;

Table.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      description: PropTypes.string,
      method: PropTypes.string,
      value: PropTypes.string,
      currency: PropTypes.string,
      tag: PropTypes.string,
      exchangeRates: PropTypes.objectOf(
        PropTypes.shape({
          name: PropTypes.string,
        }),
      ),
    }),
  ).isRequired,
  deleteExpense: PropTypes.func.isRequired,
  startEditExpense: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
};
