'use client'

import { useState } from "react"

export default function Page() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [activateDate, setActivateDate] = useState('YYYY-MM-DD');
    const [expiryDate, setExpiryDate] = useState('YYYY-MM-DD');


    function handleFirstName(e){
        setFirstName(e.target.value);
    }

    function handleLastName(e){
        setLastName(e.target.value);
    }

    function handleActivateDate(e){
        setActivateDate(e.target.value);
    }

    function handleExpiryDate(e){
        setExpiryDate(e.target.value);
    }

    return(
        <>
        <div className="row">
            <label htmlFor="_firstName" className="form-label">Enter a Firstname</label>
            <input type="text" className="form-control" id="_firstname" value={firstName} onChange={handleFirstName} />
        </div>
        <div className="row">
            <label htmlFor="_lastName" className="form-label">Enter a Lastname</label>
            <input type="text" id="_lastName" className="form-control" value={lastName} onChange={handleLastName} />
        </div>
        <div className="row">
            <label htmlFor="_activateDate" className="form-label">Activate Date</label>
            <input type="text" id="_activateDate" className="form-control" value={activateDate} onChange={handleActivateDate} />
        </div>

        <div className="row">
            <label htmlFor="_expiryDate" className="form-label">Expiry Date</label>
            <input type="text" id="_expiryDate" className="form-control" value={expiryDate} onChange={handleExpiryDate} />
        </div>
        <div className="row">
            <button className="btn btn-outline-success">Enregistrer</button>
        </div>
        </>
    )
  }