import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  getCurrencies as actionGetCurrencies,
  editExpense as actionEditExpense,
  addExpense as actionAddExpense,
} from '../redux/actions';

const methods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

function WalletForm({
  getCurrencies,
  currencies,
  addExpense,
  editExpense,
  initialInputs,
  isEditing,
}) {
  const [inputs, setInputs] = useState(initialInputs);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setInputs({ ...inputs, [name]: value });
  };

  useEffect(() => {
    setInputs(initialInputs);
  }, [initialInputs]);

  useEffect(() => {
    getCurrencies();
  }, [getCurrencies]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const action = isEditing ? editExpense : addExpense;
    action(inputs);
  };

  return (
    <form onSubmit={ handleSubmit }>
      <label htmlFor="value">Valor</label>
      <input
        data-testid="value-input"
        type="number"
        id="value"
        name="value"
        value={ inputs.value }
        onChange={ handleChange }
      />
      <label htmlFor="description">Description</label>
      <input
        data-testid="description-input"
        type="text"
        id="description"
        name="description"
        value={ inputs.description }
        onChange={ handleChange }
      />
      <label htmlFor="description">Moeda</label>
      <select
        data-testid="currency-input"
        id="currency"
        name="currency"
        value={ inputs.currency }
        onChange={ handleChange }
      >
        {currencies.map((currency) => (
          <option key={ currency } value={ currency }>
            {currency}
          </option>
        ))}
      </select>
      <label htmlFor="description">Moeda</label>
      <select
        data-testid="method-input"
        id="method"
        name="method"
        value={ inputs.method }
        onChange={ handleChange }
      >
        {methods.map((method) => (
          <option key={ method } value={ method }>
            {method}
          </option>
        ))}
      </select>
      <label htmlFor="description">Moeda</label>
      <select
        data-testid="tag-input"
        id="tag"
        name="tag"
        value={ inputs.tag }
        onChange={ handleChange }
      >
        {tags.map((tag) => (
          <option key={ tag } value={ tag }>
            {tag}
          </option>
        ))}
      </select>
      <button type="submit">{isEditing ? 'Editar despesa' : 'Adicionar despesa'}</button>
    </form>
  );
}

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
  initialInputs: wallet.initialInputs,
  isEditing: wallet.isEditing,
});

const mapDispatchToProps = {
  getCurrencies: actionGetCurrencies,
  addExpense: actionAddExpense,
  editExpense: actionEditExpense,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  getCurrencies: PropTypes.func.isRequired,
  addExpense: PropTypes.func.isRequired,
  editExpense: PropTypes.func.isRequired,
  initialInputs: PropTypes.shape({
    value: PropTypes.string,
    description: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
  }).isRequired,
  isEditing: PropTypes.bool.isRequired,
};
