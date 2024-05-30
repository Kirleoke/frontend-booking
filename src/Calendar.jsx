import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './App.css';
import Button from './TimeButton';
import axios from './axiosInstance'; // Используем наш экземпляр Axios с перехватчиком

export default function CalendarGfg() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [availableTimes, setAvailableTimes] = useState([]);

    useEffect(() => {
        // Получите доступные временные интервалы при монтировании компонента
        handleDateChange(selectedDate);
    }, []);

    function handleDateChange(date) {
        setSelectedDate(date);


        async function getAvailableTimes() {
            try {
                const offset = date.getTimezoneOffset()
                date = new Date(date.getTime() - (offset*60*1000))
                const response = await axios.get(`/api/v1/bookings/${date.toISOString().split('T')[0]}/periods/`);

                const availableTimes = response.data;
                setAvailableTimes(availableTimes);
            } catch (error) {
                console.error(error);
                alert('Не удалось получить доступные времена');
            }
        }

        getAvailableTimes();
    }

    function handleTimeButtonClick(time) {
        // Handle the click event for the time button
        // Here, you can perform any necessary actions, such as saving the appointment or showing a confirmation message

        if (window.confirm(`Вы выбрали время: ${time} на дату: ${selectedDate.toLocaleDateString()}`)) {
            alert("Вы подтвердили бронь")
        } else {
            alert("Вы не подтвердили бронь")
        }

    }

    return (

        <div>

            <div className='Calendar'>
                <h1>выбор даты</h1>
                <Calendar
                    onChange={handleDateChange}
                    value={selectedDate}
                    minDate={new Date()}
                />
            </div>

            <div className='PickTime'>
                <h2 className='TextPick'>Выбор времени</h2>
                <div className='PickButton'>
                    {availableTimes.map((time) => (
                        <Button
                            className='PickButton__button'
                            key={time.id}  // Используем идентификатор элемента в качестве ключа
                            value={time.value}
                            handleClick={() => handleTimeButtonClick(time.value)}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
