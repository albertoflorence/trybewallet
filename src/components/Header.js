import React from 'react';
import PropTypes from 'prop-types';
import Logo from './Logo';
import Moeda from './icons/Moedas';
import Profile from './icons/Profile';

function Header({ user, total }) {
  return (
    <header className="header">
      <div className="header-content">
        <Logo />
        <div className="header-expenses">
          <Moeda />
          Total de despesas:
          <span data-testid="total-field">{total.toFixed(2)}</span>
          <span data-testid="header-currency-field">BRL</span>
        </div>
        <div className="header-profile">
          <Profile />
          <span data-testid="email-field">{user.email}</span>
        </div>
      </div>
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
