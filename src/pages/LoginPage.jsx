import React from "react";
import { Link } from "react-router-dom";
import LoginInput from "../components/LoginInput";
import { login } from "../utils/network-data";
import LocaleContext from "../contexts/LocaleContext";
import LoadingIndicator from "../components/LoadingIndicator";



function LoginPage({ loginSucess }) {
  const { locale } = React.useContext(LocaleContext);
  const [isLoading, setIsLoading] = React.useState(false);

  async function onLogin({ email, password }) {
    setIsLoading(true);
    const { error, data } = await login({ email, password });

    if (!error) {
      loginSucess(data);
      setIsLoading(false);
    }else {
      setIsLoading(false);
    }
  }

  return (
    <section className="login-page">
      <h2>
        {locale === "id"
          ? "Login untuk menggunakan aplikasi"
          : "Login to use application"}
      </h2>
      {isLoading ? (
        <LoadingIndicator
          text={locale === "id" ? "Sedang login..." : "Logging in..."}
        />
      ) : (
        <LoginInput login={onLogin} />
      )}
      <p>
        {locale === "id" ? "Belum punya akun?" : "Do not have an account?"}{" "}
        <Link to="/register">
          {locale === "id" ? "Daftar di sini." : "Create here."}
        </Link>
      </p>
    </section>
  );
}

export default LoginPage;
