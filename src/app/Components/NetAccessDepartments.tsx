'use client'
import { useState, useEffect } from "react";
import { Net2Client } from "../services/Net2HttpService";
import { DepartmentI } from "../types/types";
import Link from "next/link";

function Department({id, name}: {id:string, name:string}){
    return <li key={id}><Link href={`/netaccess/departments/${id}`}>{name}</Link></li>
}

export default function NetAccessDepartments(){

    const [departments, setDepartments] = useState<DepartmentI[]>([]);

    useEffect(() => {
        const getDepartments = () => {
            Net2Client.getToken()
            .then((data) => {
                Net2Client.getDepartments(data.access_token).then((result) => {
                    setDepartments(result);
                    
                })
            });
        };
        getDepartments();
    }, []);

    return (
        <div className="container">
            <h1>List of Departments</h1>
          <ul className="list-group list-group-flush">
          {departments.map((dpt) => <li key={dpt.id} className="list-group-item">{dpt.name}</li>)}
          </ul>
        </div>
      );
}
