import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';
import {
  addExpense as actionAddExpense,
  getCurrencies as actionGetCurrencies,
  editExpense as actionEditExpense,
  deleteExpense as actionDeleteExpense,
} from '../redux/actions';

function Wallet({
  user,
  total,
  currencies,
  getCurrencies,
  addExpense,
  expenses,
  editExpense,
  deleteExpense,
}) {
  return (
    <>
      <Header user={ user } total={ total } />
      <WalletForm
        addExpense={ addExpense }
        getCurrencies={ getCurrencies }
        currencies={ currencies }
      />
      <Table
        expenses={ expenses }
        editExpense={ editExpense }
        deleteExpense={ deleteExpense }
      />
    </>
  );
}

const mapStateToProps = ({ wallet, user }) => ({
  user,
  total: wallet.total,
  currencies: wallet.currencies,
  expenses: wallet.expenses,
});

const mapDispatchToProps = {
  getCurrencies: actionGetCurrencies,
  addExpense: actionAddExpense,
  editExpense: actionEditExpense,
  deleteExpense: actionDeleteExpense,
};

Wallet.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  getCurrencies: PropTypes.func.isRequired,
  addExpense: PropTypes.func.isRequired,
  user: PropTypes.shape({
    email: PropTypes.string,
  }).isRequired,
  total: PropTypes.number.isRequired,
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      description: PropTypes.string,
      method: PropTypes.string,
      value: PropTypes.string,
      currency: PropTypes.string,
      tag: PropTypes.string,
    }),
  ).isRequired,
  editExpense: PropTypes.func.isRequired,
  deleteExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
