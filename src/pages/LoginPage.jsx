import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LoginInput from '../components/LoginInput';
import { login } from '../utils/network-data';
import LocaleContext from '../contexts/LocaleContext';

function LoginPage({ loginSucess }) {
  const { locale } = React.useContext(LocaleContext);
  async function onLogin({ email, password }) {
    const { error, data } = await login({ email, password });

    if (!error) {
      loginSucess(data);
    }
  }

  return (
    <section className="login-page">
      <h2>
        {locale === 'id'
          ? 'Login untuk menggunakan aplikasi'
          : 'Login to use application'}
      </h2>
      <LoginInput login={onLogin} />
      <p>
        {locale === 'id' ? 'Belum punya akun?' : 'Do not have an account?'}{' '}
        <Link to="/register">
          {locale === 'id' ? 'Daftar di sini.' : 'Create here.'}
        </Link>
      </p>
    </section>
  );
}

export default LoginPage;
