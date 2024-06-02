import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";
import { AuthContext } from "./AuthContext";

const RegisterPage = () => {
    const [nickname, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [lastName, setLastName] = useState("");
    const [name, setFirstName] = useState("");
    const [patronymic, setPatronymic] = useState("");
    const [phone, setPhoneNumber] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const navigate = useNavigate();
    const { login: setAuthenticated } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Проверка на пустые поля
        if (!nickname || !email || !password || !lastName || !name || !phone) {
            setModalMessage("Пожалуйста, заполните все поля.");
            setModalIsOpen(true);
            return;
        }

        try {
            const response = await axios.post("api/v1/auth/registration", {
                nickname,
                email,
                password,
                lastName,
                name,
                patronymic,
                phone,
            });

            // Сохраняем токен авторизации
            const token = response.data.token;
            localStorage.setItem("token", token);

            // Устанавливаем состояние аутентификации
            setAuthenticated();

            // Перенаправляем пользователя на страницу приложения
            navigate("/");
        } catch (error) {
            if (error.response) {
                // Ошибки, возвращаемые с сервера
                if (error.response.status === 403) {
                    // Проверка на конкретные дубликаты
                    if (error.response.data.message.includes("nickname")) {
                        setModalMessage("Такое имя пользователя уже существует.");
                    } else if (error.response.data.message.includes("email")) {
                        setModalMessage("Такой адрес электронной почты уже зарегистрирован.");
                    } else {
                        setModalMessage("Данные уже существуют. Попробуйте другие.");
                    }
                } else if (error.response.data.errors) {
                    // Предполагаем, что сервер возвращает объект с полем errors
                    const errorMessages = error.response.data.errors.map(err => err.msg).join(", ");
                    setModalMessage(`Ошибки: ${errorMessages}`);
                } else {
                    setModalMessage("Ошибка регистрации. Пожалуйста, попробуйте позже.");
                }
            } else {
                // Ошибки, не связанные с ответом сервера (например, проблемы с сетью)
                setModalMessage("Сетевая ошибка. Пожалуйста, проверьте ваше подключение к интернету.");
            }
            setModalIsOpen(true);
        }
    };

    return (
        <div>
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
                    value={name}
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
            <p>
                Уже есть аккаунт? <Link to="/login">Войти</Link>
            </p>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                className="Modal"
                overlayClassName="Overlay"
                contentLabel="Ошибка регистрации"
            >
                <h2>Ошибка</h2>
                <div>{modalMessage}</div>
                <button onClick={() => setModalIsOpen(false)}>Закрыть</button>
            </Modal>
        </div>
    );
};

export default RegisterPage;
