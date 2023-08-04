import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import ArchivedPages from './pages/ArchivedPage';
import AddPage from './pages/AddPage';
import DetailPage from './pages/DetailPage';
import NotFound from './components/NotFound';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import { getUserLogged, putAccessToken } from './utils/network-data';
import ThemeContext from './contexts/ThemeContext';
import LocaleContext from './contexts/LocaleContext';
import { FiSun, FiMoon, FiLogOut } from 'react-icons/fi';
import { MdLanguage } from 'react-icons/md';

function App() {
  const [theme, setTheme] = React.useState(
    localStorage.getItem('theme') || 'dark',
  );
  const [locale, setLocale] = React.useState(
    localStorage.getItem('locale') || 'id',
  );

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      return prevTheme === 'dark' ? 'light' : 'dark';
    });
  };

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleLocale = () => {
    setLocale((prevLocale) => {
      return prevLocale === 'id' ? 'en' : 'id';
    });
  };

  const localeContextValue = React.useMemo(() => {
    localStorage.setItem('locale', locale);
    return {
      locale,
      toggleLocale,
    };
  }, [locale]);

  const [authedUser, setAuthedUser] = React.useState(null);
  const [initializing, setInitializing] = React.useState(true);

  async function onLoginSuccess({ accessToken }) {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    setAuthedUser(data);
  }

  React.useEffect(() => {
    getUserLogged().then(({ data }) => {
      setAuthedUser(data);
      setInitializing(false);
    });
  }, []);

  async function onLogout() {
    setAuthedUser(null);
    putAccessToken('');
  }

  if (initializing) {
    return null;
  }

  if (authedUser === null) {
    return (
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <LocaleContext.Provider value={localeContextValue}>
          <div className="app-container">
            <header>
              <h1>
                <Link to="/">
                  {locale === 'id' ? 'Aplikasi Catatan' : 'Note Application'}
                </Link>
              </h1>
              <button className="toggle-locale" onClick={toggleLocale}>
                <MdLanguage />
              </button>
              <button className="toggle-theme" onClick={toggleTheme}>
                {theme === 'dark' ? <FiSun /> : <FiMoon />}
              </button>
            </header>
            <main>
              <Routes>
                <Route
                  path="/*"
                  element={<LoginPage loginSucess={onLoginSuccess} />}
                ></Route>
                <Route path="/register" element={<RegisterPage />}></Route>
              </Routes>
            </main>
          </div>
        </LocaleContext.Provider>
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <LocaleContext.Provider value={localeContextValue}>
        <div className="app-container">
          <header>
            <h1>
              <Link to="/">
                {locale === 'id' ? 'Aplikasi Catatan' : 'Note Application'}
              </Link>
            </h1>
            <Navigation />
            <button className="toggle-locale" onClick={toggleLocale}>
              <MdLanguage />
            </button>
            <button className="toggle-theme" onClick={toggleTheme}>
              {theme === 'dark' ? <FiSun /> : <FiMoon />}
            </button>
            <button className="button-logout" onClick={onLogout}>
              {authedUser.name}
              <FiLogOut />
            </button>
          </header>
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/archives" element={<ArchivedPages />} />
              <Route path="/notes/new" element={<AddPage />} />
              <Route path="/notes/:id" element={<DetailPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </LocaleContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
