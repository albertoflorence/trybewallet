import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';
import {
  deleteExpense as actionDeleteExpense,
  startEditExpense as actionStartEditExpense,
  sortExpense as actionSortExpense,

} from '../redux/actions';

function Wallet({
  user,
  total,
  expenses,
  deleteExpense,
  startEditExpense,
  sortExpense,
}) {
  return (
    <section className="wallet">
      <Header user={ user } total={ total } />
      <WalletForm />
      <Table
        expenses={ expenses }
        deleteExpense={ deleteExpense }
        startEditExpense={ startEditExpense }
        onSort={ sortExpense }
      />
    </section>
  );
}

const mapStateToProps = ({ wallet, user }) => ({
  user,
  total: wallet.total,
  expenses: wallet.expenses,
});

const mapDispatchToProps = {
  deleteExpense: actionDeleteExpense,
  startEditExpense: actionStartEditExpense,
  sortExpense: actionSortExpense,
};

Wallet.propTypes = {
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
  deleteExpense: PropTypes.func.isRequired,
  startEditExpense: PropTypes.func.isRequired,
  sortExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
