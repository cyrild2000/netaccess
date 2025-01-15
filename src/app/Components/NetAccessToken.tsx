import { useState } from "react";
import { useEffect } from "react";
import { Net2Client } from "../services/Net2HttpService";

export default function NetAccessToken(){

    const [token, setToken] = useState('');

    useEffect(() => {
        const getToken = () => {
            Net2Client.getToken()
            .then((data) => {
                setToken(data.access_token);
            });
        };
        getToken();
    }, []);

    return(
        <h2>{token}</h2>
    )
}