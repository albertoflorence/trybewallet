import React from 'react';
import PropTypes from 'prop-types';

function Table({ expenses }) {
  const editItem = () => {};
  const deleteItem = () => {};
  console.log(expenses);
  return (
    <table>
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map(
          ({
            id,
            description,
            method,
            value,
            currency,
            tag,
            exchangeRates,
            exchangeValue,
          }) => {
            const { name, ask } = exchangeRates[currency];
            return (
              <tr key={ id }>
                <td>{description}</td>
                <td>{tag}</td>
                <td>{method}</td>
                <td>{Number(value).toFixed(2)}</td>
                <td>{currency}</td>
                <td>{name}</td>
                <td>{Number(ask).toFixed(2)}</td>
                <td>{Number(exchangeValue).toFixed(2)}</td>
                <td>
                  <button onClick={ () => editItem(id) }>Editar</button>
                  <button onClick={ () => deleteItem(id) }>Excluir</button>
                </td>
              </tr>
            );
          },
        )}
      </tbody>
    </table>
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
      exchangeValue: PropTypes.string,
      exchangeRates: PropTypes.objectOf(
        PropTypes.shape({
          name: PropTypes.string,
        }),
      ),
    }),
  ).isRequired,
};
