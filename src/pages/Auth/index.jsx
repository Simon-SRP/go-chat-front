import React, { useState } from "react";
import "./auth.css";
import Button from "../../components/Button/index.jsx";
import Input from "../../components/Input/index.jsx";

const Auth = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const handleLoginChange = (value) => setLogin(value);
    const handlePasswordChange = (value) => setPassword(value);

    const handleSubmit = () => {
        alert(`Login: ${login}, Password: ${password}`);
    };

    return (
        <div className="auth">
            <div className="auth_top">
                <h2>Войти в аккаунт</h2>
                <div className="spacer"></div>
                <p>Пожалуйста, войдите в свой аккаунт</p>
            </div>
            <div className="auth_body">
                <label htmlFor="login">Логин: </label>
                <Input
                    id="login"
                    type="text"
                    placeholder="Введите логин"
                    onChange={handleLoginChange} 
                />
                <label htmlFor="password">Пароль:</label>
                <Input
                    id="password"
                    type="password"
                    placeholder="Введите пароль"
                    onChange={handlePasswordChange} 
                />
            </div>
            <Button onClick={handleSubmit}>Войти</Button>
        </div>
    );
};

export default Auth;