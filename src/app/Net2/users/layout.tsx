import Link from "next/link";

export default function Layout({children}:{children:React.ReactNode}){
    return(
        <div className="container">
            <div className="row">
                <Link href="/net2/users/new">Add User</Link>
            </div>
            <div className="row">{children}</div>

        </div>
    )
}