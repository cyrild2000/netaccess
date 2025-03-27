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
    const [csn, setCsn] = useState('');

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

    function convertCSNToNA(isicCsn: string) {
        var resultat = null;
        var strnum = null;
        if(isicCsn.length < 14) {
            strnum = "0" +  isicCsn;
            var pnum = strnum.substring(0, 8);
            resultat = parseInt(pnum, 16);
        } else {
            strnum = isicCsn;
            var pnum = strnum.substring(0, 8);
            resultat = parseInt(pnum, 16);
        }
        return resultat;
    }

    const handleNew = (csnNumber: string) => {
        Net2Client.getToken().then((data) => {
            Net2Client.setCard(user.id, convertCSNToNA(csnNumber), data.access_token).then((response) => {
                console.log(response);
                setBadges([...badges, {id: response.id, tokenType: response.tokenType, tokenValue:response.tokenValue, isLost:response.isLost}]);
            });
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
        <>
        <div className="row">
        <h1>Net 2 - User Profile</h1>
        </div>
        <div className="row">
        <h2>UserId {user.id} {user.firstName} {user.lastName}</h2>
        </div>
        <div className="row">
        <ul className="list-group">{department.map((dpt, index) => <li key={index} className="list-group-item">Department : {dpt.name}</li>)}</ul>
        <h2>Nombre de badges : {badges.length > 0 ? badges.length: "Pas de badge pour l'utilisateur"}</h2>
        <ul className="list-group">
            {badges.map((badge, index) => <li key={index} className="list-group-item"><Badge badge={badge} onClick={() => handleBadge(index, badge.id, badge.tokenValue)} /></li>)}
            
        </ul>
        </div>
        <div className="row">
            <h2>Add a new badge (From ISIC CSN)</h2>
        </div>
        <div className="row">
            <div className="col-auto">
                <input type="text" className="form-control" value={csn} onChange={e => setCsn(e.target.value)} />
            </div>
            <div className="col-auto">
                <button className="btn btn-success" onClick={() =>handleNew(csn)}>Add +</button>
            </div>
        </div>
        </>
    )
}