'use client'
import { useState, useEffect } from "react";
import { Net2Client } from "../services/Net2HttpService";
import { UserI } from "../types/types";

export default function NetAccessUsers() {

    const [users, setUsers] = useState<UserI[]>([]);

    useEffect(() => {
        const getUsers = () => {
            Net2Client.getToken()
            .then((data) => {
                console.log(data.access_token);
                Net2Client.getUsers(data.access_token).then((result) => {
                    setUsers(result);
                    
                })
            });
        };
        getUsers();
    }, []);

    return(
        <ul>
        {users.map((user) => <li key={user.id}>{user.firstName}</li>)}
        </ul>
    )
    
}