'use client'
import { useState, useEffect, ChangeEventHandler } from "react";
import { Net2Client } from "../services/Net2HttpService";
import { UserI } from "../types/types";
import DataPage from "./DataPage";
import UserSearchBar from "./UserSearchBar";
import DataTable from "./DataPage";

/*
* List all the users
*/

export default function NetAccessUsers() {

    
    const [users, setUsers] = useState<UserI[]>([]);

    useEffect(
        () => {
            Net2Client.getToken()
                    .then((data) => {
                        Net2Client.getUsers(data.access_token).then((result) => {
                            setUsers(result);
                        })
                        
                    });
        }, []);

    return(
        <div className="container">
            <h1>Net 2 - Users List</h1>
            <DataPage data={users} pageSize={10} />
        </div>
    )
    
}