import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
    const [nickname, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [patronymic, setPatronymic] = useState("");
    const [phone, setPhoneNumber] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("localhost:8090/api/v1/auth/registration", {
                nickname,
                email,
                password,
                lastName,
                firstName,
                patronymic,
                phone,
            });

            // Сохраняем токен авторизации
            const token = response.data.token;
            localStorage.setItem("token", token);

            // Перенаправляем пользователя на страницу приложения
            navigate("/");
        } catch (error) {
            // Отображаем сообщение об ошибке
            alert("Ошибка регистрации");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                className="text-field__input"
                type="text"
                placeholder="Имя пользователя"
                value={nickname}
                onChange={(e) => setUsername(e.target.value)}
            />
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
            <input
                className="text-field__input"
                type="text"
                placeholder="Фамилия"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />
            <input
                className="text-field__input"
                type="text"
                placeholder="Имя"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />
            <input
                className="text-field__input"
                type="text"
                placeholder="Отчество"
                value={patronymic}
                onChange={(e) => setPatronymic(e.target.value)}
            />
            <input
                className="text-field__input"
                type="text"
                placeholder="Номер телефона"
                value={phone}
                onChange={(e) => setPhoneNumber(e.target.value)}
            />

            <button className="button-login" type="submit">
                Зарегистрироваться
            </button>
        </form>
    );
};

export default RegisterPage;