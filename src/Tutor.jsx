import React from 'react';
import './TutorPage.css';
import Vlad from './Photo/Vlad.jpg';
import { useNavigate } from "react-router-dom";

const TutorPage = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/entry");
    };

    return (
        <div className='tutor-page'>
            {/* ... */}

            <div className='hero-section'>
                <h1>Муравьев Владислав Романович</h1>
                <img className='Ava' src={Vlad} alt={"first"}/>
                <h2>Back-end</h2>
                <p>Высшее образование в ВУЗе РТУ МИРЭА - Российский технологический университет <br/>
                    Стаж преподавания 1 год</p>
                <button className='button-primary' onClick={handleClick}>Записаться на урок</button>

            </div>

            <div className='subjects-section'>
                <h2>Предметы</h2>
                <ul>
                    <li>Информатика</li>
                    <li>Базы данных</li>
                    <li>JavaScript</li>
                </ul>
            </div>

            <div className='rates-section'>
                <h2>Стоимость занятий</h2>
                <div className='rates-section-subject'>
                    <p>Стоимость 1 занятия по информатике (10-11 класс) - 800р/час</p>
                    <p>Стоимость 1 занятия по Базам данных - 1000р/час</p>
                    <p>Стоимость 1 занятия по JavaScript - 1000р/час</p>
                </div>
            </div>

            <div className='testimonials-section'>
                <h2>Отзывы</h2>
                <div className='testimonials'>
                    <div className='testimonial'>
                        <p>Скоро появятся</p>
                    </div>
                    <div className='testimonial'>
                        <p>Скоро появятся</p>
                    </div>
                    <div className='testimonial'>
                        <p>Скоро появятся</p>
                    </div>
                </div>
            </div>

            <div className='contact-section'>
                <h2>Связаться со мной</h2>
                <div className='contact-content'>
                <p>MuravevVladRep@gmail.com</p>
                <p>+79103843536</p>
                </div>
            </div>

            <div className='footer'></div>
        </div>
    );
};

export default TutorPage;
