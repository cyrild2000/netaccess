import { useState } from "react";
import { BadgeI } from "../types/types";

export default function Badge({badge, onClick} : {badge:BadgeI, onClick : any}) {

    return(
        <p onClick={onClick} >{badge.id} {badge.tokenType} {badge.tokenValue} {badge.isLost === true ? "Inactif":"Actif"}</p>
    )
}