import NetAccessSideNav from "../nav/net2sidenav";


export default function Layout({children}:{children:React.ReactNode}){
    return(
        <div className="container">
            <div className="row">
                <div className="col-4">
                    <NetAccessSideNav />
                </div>
                <div className="col-8">{children}</div>

            </div>

        </div>
    )
}
