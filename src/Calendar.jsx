import React, { useState, useEffect, useContext } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './App.css';
import './Reservations.css';
import Button from './TimeButton';
import axios from './axiosInstance';
import { AuthContext } from './AuthContext';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function CalendarGfg() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [availableTimes, setAvailableTimes] = useState([]);
    const [myReservations, setMyReservations] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalAction, setModalAction] = useState(null);
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

    function handleDateChange(date) {
        setSelectedDate(date);
    }

    async function getAvailableTimes() {
        try {
            const response = await axios.get(`/api/v1/bookings/${selectedDate.toISOString().split('T')[0]}/periods/`);
            let times = response.data;
            if (selectedDate.toDateString() === new Date().toDateString()) {
                times = filterPastTimes(times);
            }
            setAvailableTimes(times);
        } catch (error) {
            handleAuthError(error);
        }
    }

    function filterPastTimes(times) {
        const currentTime = new Date();
        const currentHour = currentTime.getHours();
        return times.filter(time => {
            const [startHour] = time.value.split('-').map(Number);
            return startHour > currentHour;
        });
    }

    async function handleTimeButtonClick(periodID) {
        try {
            const userInfo = getUserInfo(); // Получаем информацию о пользователе
            await axios.post(`/api/v1/bookings/${selectedDate.toISOString().split('T')[0]}/periods/${periodID}/`, userInfo);
            setModalMessage('Вы успешно забронировали время!');
            setModalIsOpen(true);
            getAvailableTimes();
            getMyReservations();
            sendTelegramNotification(userInfo, periodID); // Отправка уведомления в Telegram с данными о дате и времени
        } catch (error) {
            handleAuthError(error);
        }
    }

    function getUserInfo() {
        return {
        };
    }

    async function getMyReservations() {
        try {
            const response = await axios.get('/api/v1/bookings');
            setMyReservations(response.data);
        } catch (error) {
            console.error('Ошибка при запросе резерваций:', error);
        }
    }

    async function handleDeleteReservation(reservationID, reservationInfo) {
        try {
            await axios.delete(`/api/v1/bookings/${reservationID}/`);
            setModalMessage('Резервация успешно удалена!');
            setModalIsOpen(true);
            cancelReservationNotification(reservationInfo); // Отправляем уведомление об отмене записи
            getMyReservations();
        } catch (error) {
            console.error('Ошибка при удалении резервации:', error);
            setModalMessage('Не удалось удалить резервацию. Попробуйте снова или обратитесь к администратору.');
            setModalIsOpen(true);
        }
    }

    function handleAuthError(error) {
        if (error.response && error.response.status === 401) {
            setModalMessage('Вам нужно авторизоваться');
            setModalAction(() => () => {
                window.location.href = '/login';
            });
            setModalIsOpen(true);
            setIsAuthenticated(false); // Сбрасываем аутентификацию при истечении токена
        } else {
            setModalMessage('Произошла ошибка при выполнении запроса.');
            setModalIsOpen(true);
        }
    }

    useEffect(() => {
        if (isAuthenticated) {
            getAvailableTimes();
            getMyReservations();
        }
    }, [selectedDate, isAuthenticated]);

    function isTimeBooked(time) {
        return myReservations.some(reservation => reservation.date === time);
    }

    function closeModal() {
        setModalIsOpen(false);
        setModalAction(null);
    }

    async function sendTelegramNotification(userInfo, periodID) {
        try {
            const period = availableTimes.find(time => time.id === periodID);
            const message = `Новая запись!\nДата: ${selectedDate.toISOString().split('T')[0]}\nВремя: ${period.value}`;

            await axios.post(`https://api.telegram.org/bot7224423901:AAGDIA2fYiq2Q-XFgWjlJN7-JH7OlTL6AkY/sendMessage`, {
                chat_id: 651730954,
                text: message
            });
            console.log("Уведомление успешно отправлено в Telegram");
        } catch (error) {
            console.error("Ошибка при отправке уведомления в Telegram:", error);
        }
    }

    function cancelReservationNotification(reservationInfo) {
        try {
            const message = `Запись отменена!\nДата: ${reservationInfo.date}\nВремя: ${reservationInfo.reservationPeriod.value}`;

            axios.post(`https://api.telegram.org/bot7224423901:AAGDIA2fYiq2Q-XFgWjlJN7-JH7OlTL6AkY/sendMessage`, {
                chat_id: 651730954,
                text: message
            }).then(response => {
                console.log("Уведомление об отмене записи успешно отправлено в Telegram");
            }).catch(error => {
                console.error("Ошибка при отправке уведомления об отмене записи в Telegram:", error);
            });
        } catch (error) {
            console.error("Ошибка при отправке уведомления об отмене записи в Telegram:", error);
        }
    }

    return (
        <div>
            {isAuthenticated ? (
                <div>
                    <div className='Calendar'>
                        <h1>Выберите дату</h1>
                        <Calendar
                            onChange={handleDateChange}
                            value={selectedDate}
                            minDate={new Date()}
                            tileClassName={({ date }) => {
                                const dateString = date.toISOString().split('T')[0];
                                return isTimeBooked(dateString) ? 'booked' : null;
                            }}
                        />
                    </div>
                    <div className='PickTime'>
                        <h2 className='TextPick'>Выберите время</h2>
                        <div className='PickButton'>
                            {availableTimes.map((time) => (
                                <Button
                                    className='PickButton__button'
                                    key={time.id}
                                    value={time.value}
                                    handleClick={() => handleTimeButtonClick(time.id)}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="MyReservations">
                        <h2>Мои записи</h2>
                        <ul className='ReservationList'>
                            {myReservations.map((reservation) => (
                                <li key={reservation.id} className='ReservationItem'>
                                    <span>{reservation.date} - {reservation.reservationPeriod.value}</span>
                                    <button
                                        className='DeleteButton'
                                        onClick={() => handleDeleteReservation(reservation.id, reservation)}>Удалить</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        contentLabel="Сообщение"
                        className="Modal"
                        overlayClassName="Overlay">
                        <h2>{modalMessage}</h2>
                        <button onClick={closeModal}>Закрыть</button>
                        {modalAction && <button onClick={modalAction}>Перейти</button>}
                    </Modal>
                </div>
            ) : (
                <p>Доступ запрещен. Пожалуйста, войдите в систему.</p>
            )}
        </div>
    );
}

