import React from "react";
import { Link, useNavigate } from "react-router-dom";
import RegisterInput from "../components/RegisterInput";
import { register } from "../utils/network-data";
import LocaleContext from "../contexts/LocaleContext";
import LoadingIndicator from "../components/LoadingIndicator";

function RegisterPage() {
  const { locale } = React.useContext(LocaleContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);

  async function onRegisterHandler(user) {
    setIsLoading(true);
    const { error } = await register(user);

    if (!error) {
      setIsLoading(false);
      navigate("/");
    }
  }

  return (
    <section className="register-page">
      <h2>
        {locale === "id"
          ? "Isi data untuk mendaftar"
          : "Fill the form to register account"}
      </h2>
      {isLoading ? (
        <LoadingIndicator
          text={locale === "id" ? "Sedang mendaftar..." : "Registering..."}
        />
      ) : (
        <RegisterInput register={onRegisterHandler} />
      )}
      <p>
        {locale === "id" ? "Sudah punya akun ?" : "Already have an account?"}{" "}
        <Link to="/">{locale === "id" ? "Login disini" : "Login Here"}</Link>
      </p>
    </section>
  );
}

export default RegisterPage;
