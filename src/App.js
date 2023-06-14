import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Login from './pages/Login';
import Header from './components/Header';

function App({ user }) {
  return (
    <>
      <Header />
      {!user.email && <Login />}
    </>
  );
}

const mapStateToProps = ({ user }) => ({
  user,
});

export default connect(mapStateToProps)(App);

App.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
  }).isRequired,
};
