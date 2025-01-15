'use client'
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";


export default function Home() {
  return (
    <>
    <h1>Net Access Application</h1>
    <ul>
      <li><Link href={"/Net2/departments"}>Departments</Link></li>
      <li><Link href={"/Net2/users"}>Users</Link></li>
    </ul>
    </>
  );
}
