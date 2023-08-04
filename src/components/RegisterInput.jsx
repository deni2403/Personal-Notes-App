import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';
import LocaleContext from '../contexts/LocaleContext';

function RegisterInput({ register }) {
  const { locale } = React.useContext(LocaleContext);
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const onSubmitHandler = (event) => {
    event.preventDefault();

    register({ name, email, password });
  };

  return (
    <form onSubmit={onSubmitHandler} className="input-register">
      <label htmlFor="name">{locale === 'id' ? 'Nama' : 'Name'}</label>
      <input
        type="text"
        placeholder={locale === 'id' ? 'Nama' : 'Name'}
        value={name}
        onChange={onNameChange}
      />
      <label htmlFor="email">Email</label>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={onEmailChange}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={onPasswordChange}
      />
      <button>Register</button>
    </form>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
