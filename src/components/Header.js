import React from 'react';
import PropTypes from 'prop-types';

function Header({ user, total }) {
  return (
    <header>
      <span data-testid="email-field">{user.email}</span>
      <div>
        Total:
        {' '}
        <span data-testid="total-field">{total.toFixed(2)}</span>
      </div>
      <span data-testid="header-currency-field">BRL</span>
    </header>
  );
}

export default Header;

Header.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
  }).isRequired,
  total: PropTypes.number.isRequired,
};
