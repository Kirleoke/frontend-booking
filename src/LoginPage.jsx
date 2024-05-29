import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/register");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("/auth/login", {
                email,
                password,
            });

            // Сохраняем токен авторизации
            const token = response.data.token;
            localStorage.setItem("token", token);

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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            <button className="link-new-register" onClick={handleClick}>
                Нет учётной записи? Создать.
            </button>
        </form>
    );
};

export default LoginPage;
