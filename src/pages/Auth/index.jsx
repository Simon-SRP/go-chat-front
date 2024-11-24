import React, { useState, useEffect  } from "react";
import "./auth.css";
import Button from "../../components/Button/index.jsx";
import Input from "../../components/Input/index.jsx";
import axios from "axios";

const Auth = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Track login status
    const [websocket, setWebsocket] = useState(null); // WebSocket connection

    const handleLoginChange = (value) => setLogin(value);
    const handlePasswordChange = (value) => setPassword(value);

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://localhost:8080/login", {
                login,
                password,
            });

            if (response.status === 200) {
                console.log("Login successful:", response.data);
                setIsAuthenticated(true); // Set login status
                //Establish WebSocket connection here - see below
            } else {
                console.error("Login failed:", response.data);
                alert("Login failed: " + response.data.message);
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Login failed: " + (error.response?.data?.message || "An error occurred"));
        }
    };


    useEffect(() => {
        if (isAuthenticated) {
            const ws = new WebSocket("ws://localhost:8080/ws"); //WebSocket Endpoint (replace /ws with your actual endpoint)
            ws.onopen = () => {
                console.log("WebSocket connection opened");
                //Send initial message or data
            };
            ws.onmessage = (event) => {
                console.log("Received message:", event.data);
                //Process messages here
            };
            ws.onclose = () => {
                console.log("WebSocket connection closed");
            };
            ws.onerror = (error) => {
                console.error("WebSocket error:", error);
            };
            setWebsocket(ws);
        }

        return () => {
          if (websocket) {
            websocket.close();
          }
        };
    }, [isAuthenticated]);


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
            <Button onClick={handleLogin}>Войти</Button>
        </div>
    );
};

export default Auth;