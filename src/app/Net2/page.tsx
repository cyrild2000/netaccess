import Link from 'next/link'

export default function Page(){
    return (
        <>
        <h2>Net 2 Module</h2>
        <ul>
            <li><Link href="net2/departments">List Departments</Link></li>
            <li><Link href="net2/users">List Users</Link></li>
            <li><Link href="net2/users/new">Add New User</Link></li>
        </ul>
        </>
    );
}
