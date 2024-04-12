import { useEffect } from "react";
import { generateToken } from "../api/requests";

export const Callback = () => {
    useEffect(() => {
        const getToken = async () => {
            const url = window.location.href;
            const { token } = await generateToken(url);

            localStorage.setItem('token', token);

            window.location.href = 'http://localhost:5173/home';
        };

        getToken();
    }, []);
    
    return (
        <>
        </>
    );
};

