import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();



    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("api/v1/auth/login", {
                login,
                password,
            });

            // Сохраняем токен авторизации
            const token = response.data;
            console.log(token);
            // Сохраняем токены в локальном хранилище
            localStorage.setItem('token', response.data.access);


            // Перенаправляем пользователя на страницу приложения
            navigate("/");
        } catch (error) {
            // Отображаем сообщение об ошибке
            alert("Ошибка при авторизации");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                className="text-field__input"
                type="email"
                placeholder="Адрес электронной почты"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
            />
            <input
                className="text-field__input"
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button className="button-login" type="submit">
                Войти
            </button>
            <p className="link-register">
                Нет аккаунта? <Link to="/register">Зарегестрироваться</Link>
            </p>
        </form>
    );
};

export default LoginPage;
