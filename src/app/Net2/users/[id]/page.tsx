'use client'
import React, { useEffect, useState, use } from "react";
import { DepartmentI, UserI } from "@/app/types/types";
import { BadgeI } from "@/app/types/types";
import Badge from "@/app/Components/NetAccessBadges";
import { Net2Client } from "@/app/services/Net2HttpService";

export default function Page({ params }: { params: Promise<{ id: string }> }) {

    const {id} = use(params);
    const [user, setUser] = useState<UserI>({id: '0', firstName: '', lastName:''});
    const [department, setDepartment] = useState<DepartmentI[]>([]);
    const [badges, setBadges] = useState<BadgeI[]>([]);

    const handleBadge = (index: number, id: string, tokenValue: string) => {
        const nextBadges = [...badges];
        nextBadges.map((badge, i) => {
            if(i === index) {
                if(badge.isLost === true) {
                    Net2Client.getToken().then((data) => {
                        Net2Client.setUserTokenFound(id, user.id, tokenValue, data.access_token).then((result) => {
                            badge.isLost = false;
                            setBadges(nextBadges);
                        });
                        
                    });
                } else {
                    Net2Client.getToken().then((data) => {
                        Net2Client.setUserTokenLost(id, user.id, tokenValue, data.access_token).then((result) => {
                            badge.isLost = true;
                            setBadges(nextBadges);
                        });
                    });
                    
                }
            }
        });
    }

    useEffect(() => {
            Net2Client.getToken()
                .then((data) => {
                    Net2Client.getUserById(id, data.access_token).then((result) => {setUser(result); })
                    Net2Client.getUserTokens(id, data.access_token).then((badgs) => {setBadges(badgs); })
                    Net2Client.getUserDepartments(id, data.access_token).then((dpts) => { setDepartment(dpts);  })
                    Net2Client.getUserDoorPermissionSet(id, data.access_token).then((perms) => {console.log(perms); })
                });
        }, []);

    return (
        <div>
        <h1>Net 2 - User Profile</h1>
        <h2>UserId {user.id} {user.firstName} {user.lastName}</h2>
        <ul>{department.map((dpt, index) => <li key={index}>Department : {dpt.name}</li>)}</ul>
        <h2>Nombre de badges : {badges.length > 0 ? badges.length: "Pas de badge pour l'utilisateur"}</h2>
        <ul>
            {badges.map((badge, index) => <li key={index} className="list-group-item"><Badge badge={badge} onClick={() => handleBadge(index, badge.id, badge.tokenValue)} /></li>)}
            
        </ul>
        </div>
    )
}