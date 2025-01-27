import { useState } from "react"

export default function Test() {

    const [stat, setStat] = useState(0);

    const handleClick = () => {
        setStat(prev => prev + 1);
    }

    return(
        <>
        <h3>{stat}</h3>
        <button onClick={handleClick}>Action</button>
        </>
    )
}