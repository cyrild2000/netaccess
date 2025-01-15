'use client'
import Image from "next/image";
import styles from "./page.module.css";
import NetAccessToken from "./Components/NetAccessToken";
import NetAccessUsers from "./Components/NetAccessUsers";

export default function Home() {
  return (
    <>
    <h1>Net Access Application</h1>
    <NetAccessUsers />
    </>
  );
}
