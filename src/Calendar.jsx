import React, {useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './App.css';
import Button from './TimeButton';

export default function CalendarGfg() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [availableTimes, setAvailableTimes] = useState([]);

    function handleDateChange(date) {
        setSelectedDate(date);

        // Получаем доступные временные интервалы для выбранной даты
        const now = new Date();
        const availableTimes = []; // Замените на фактические доступные времена
        const filteredTimes = availableTimes.filter(time => {
            const [startHour, startMinute] = time.split('-').map(Number);
            const startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), startHour, startMinute);
            return startTime >= now;
        });
        setAvailableTimes(filteredTimes);
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
                        <Button className='PickButton__button' key={time} value={time}
                                handleClick={() => handleTimeButtonClick(time)}/>
                    ))}
                </div>
            </div>
        </div>
    )
}
