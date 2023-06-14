import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function Header({ user }) {
  return (
    <header>
      <span data-testid="email-field">{user.email}</span>
      <span data-testid="total-field">0</span>
      <span data-testid="header-currency-field">BRL</span>
    </header>
  );
}

const mapStateToProps = ({ user }) => ({
  user,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
  }).isRequired,
};
