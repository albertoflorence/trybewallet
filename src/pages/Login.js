import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom/';

import { login as actionLogin } from '../redux/actions';

const PASSWORD_MIN_LENGTH = 6;

const objectValidate = {
  email: (input) => /.+@.+\.\w{2,}/.test(input),
  password: (input) => input.length >= PASSWORD_MIN_LENGTH,
};

const validate = (inputs) => Object
  .entries(objectValidate).every(([key, value]) => value(inputs[key]));

function Login({ login }) {
  const history = useHistory();
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    login(inputs);
    history.push('/carteira');
  };

  return (
    <form onSubmit={ handleSubmit }>
      <label htmlFor="email">Email</label>
      <input
        data-testid="email-input"
        type="text"
        id="email"
        name="email"
        value={ inputs.email }
        onChange={ handleChange }
      />
      <label htmlFor="password">Password</label>
      <input
        data-testid="password-input"
        type="password"
        id="password"
        name="password"
        value={ inputs.password }
        onChange={ handleChange }

      />
      <button type="submit" disabled={ !validate(inputs) }>Entrar</button>
    </form>
  );
}

const mapDispatchToProps = {
  login: actionLogin,
};

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  login: PropTypes.func.isRequired,
};
