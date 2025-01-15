export default function HeadNav(){
    return(
        <>
            <nav className="navbar bg-body-tertiary">
                <div className="container">
                <ul className="nav justify-content-center">
                    <li className="nav-item">
                        <a className="nav-link" href="/">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/net2">Net 2</a>
                    </li>
                </ul>
                </div>
            </nav>
        </>
    );
}