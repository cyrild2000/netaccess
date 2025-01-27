'use client'
import React, { useEffect, useState, use } from "react";
import { UserI } from "@/app/types/types";
import { Net2Client } from "@/app/services/Net2HttpService";

export default function Page({ params }: { params: Promise<{ id: string }> }) {

    const {id} = use(params);
    const [user, setUser] = useState<UserI>({id: '0', firstName: '', lastName:''});

    useEffect(() => {
        
        Net2Client.getToken()
                            .then((data) => {
                                Net2Client.getUserById(id, data.access_token).then((result) => {
                                    setUser(result);
                                })
                                
                            });
                }, []);

    return (
        <h1>{user.firstName} {user.lastName}</h1>
    )
}