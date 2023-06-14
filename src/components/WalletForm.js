import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getCurrencies as actionGetCurrencies } from '../redux/actions';

const methods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const categories = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

function WalletForm({ getCurrencies, currencies }) {
  const [inputs, setInputs] = useState({
    value: 0,
    description: '',
    currency: '',
    method: '',
    category: '',
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setInputs({ ...inputs, [name]: value });
  };

  useEffect(() => {
    getCurrencies();
  }, [getCurrencies]);

  return (
    <form>
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
          <option key={ currency } value={ currency }>{currency}</option>
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
          <option key={ method } value={ method }>{method}</option>
        ))}
      </select>

      <label htmlFor="description">Moeda</label>
      <select
        data-testid="tag-input"
        id="category"
        name="category"
        value={ inputs.category }
        onChange={ handleChange }
      >
        {categories.map((category) => (
          <option key={ category } value={ category }>{category}</option>
        ))}
      </select>
    </form>
  );
}

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
});

const mapDispatchToProps = {
  getCurrencies: actionGetCurrencies,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);

WalletForm.propTypes = {
  getCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};
