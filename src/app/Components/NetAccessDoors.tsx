'use client'
import { useState, useEffect } from "react";
import { Net2Client } from "@/app/services/Net2HttpService";
import { DoorI } from "@/app/types/types";
import Link from "next/link";

export default function NetAccessDoors(){

    const [doors, setDoors] = useState<DoorI[]>([]);

    useEffect(() => {
        const getDoors = () => {
            Net2Client.getToken()
            .then((data) => {
                console.log(data);
                Net2Client.getDoors(data.access_token).then((result) => {
                    setDoors(result);
                    console.log(doors);
                    
                })
            });
        };
        getDoors();
    }, []);

    return (
        <div className="container">
            <h1>List of Doors</h1>
          <ul className="list-group list-group-flush">
          {doors.map((door) => <li key={door.id} className="list-group-item">{door.name}</li>)}
          </ul>
        </div>
      );
}
