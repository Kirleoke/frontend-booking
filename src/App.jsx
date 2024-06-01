import React, { useState } from 'react';
import './App.css';
import Calendar from './Calendar';
import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";
import Tutor from "./Tutor";
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { AuthProvider, AuthContext } from './AuthContext';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <div className="App">
                    <Header />
                    <div className="MainContent">
                        <Routes>
                            <Route path="/register" element={<RegisterPage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/entry" element={<Calendar />} />
                            <Route path="/" element={<Tutor />} />
                        </Routes>
                    </div>
                </div>
            </BrowserRouter>
        </AuthProvider>
    );
}

const Header = () => {
    const { isAuthenticated, logout } = React.useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className="App-header">
            <div className="BurgerMenu" onClick={toggleMenu}>
                &#9776;
            </div>
            <nav className={menuOpen ? 'NavMenu Open' : 'NavMenu'}>
                <Link to="/" onClick={() => setMenuOpen(false)}>О Репетиторе</Link>
                <Link to="/entry" onClick={() => setMenuOpen(false)}>Запись на занятие</Link>
                {!isAuthenticated ? <Link to="/register" onClick={() => setMenuOpen(false)}>Регистрация</Link> : null}
                {!isAuthenticated ? <Link to="/login" onClick={() => setMenuOpen(false)}>Вход</Link> : null}
                {isAuthenticated ? <Link to="/" className="LogoutButton" onClick={() => { logout(); setMenuOpen(false); }}>Выйти</Link> : null}
            </nav>
        </header>
    );
};

export default App;
