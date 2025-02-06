import { useState } from "react";
import { BadgeI } from "../types/types";

export default function Badge({badge, onClick} : {badge:BadgeI, onClick : any}) {

    return(
        <p>{badge.id} {badge.tokenType} {badge.tokenValue} {badge.isLost === true ? <BadgeActivateButton badge={badge} onClick={onClick} />:<BadgeDesactivateButton badge={badge} onClick={onClick} />}</p>
    )
}


function BadgeActivateButton({badge, onClick} : {badge:BadgeI, onClick : any}) {
    return(
        <button onClick={onClick} className="btn btn-outline-success">Activate badge {badge.id}</button>
    )
}

function BadgeDesactivateButton({badge, onClick} : {badge:BadgeI, onClick : any}) {
    return(
        <button onClick={onClick} className="btn btn-outline-danger">Desactivate badge {badge.id}</button>
    )
}