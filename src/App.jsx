import React from 'react';
import './App.css';
import Calendar from './Calendar';
// import { click } from '@testing-library/user-event/dist/click';
import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";
import Tutor from "./Tutor";

import {BrowserRouter, Link, Route, Routes} from 'react-router-dom';


function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <header className="App-header_Links">
                    <Link to="/">О Репетиторе</Link>
                    <Link to="/entry">Запись на занятие</Link>
                    <Link to="/register">Регистрация</Link>
                    <Link to="/login">Вход</Link>


                </header>
                <Routes>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/entry" element={<Calendar/>}/>
                    <Route path="/" element={<Tutor/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}



export default App;
