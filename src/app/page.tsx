'use client'
import Image from "next/image";
import styles from "./page.module.css";
import NetAccessToken from "./Components/NetAccessToken";

export default function Home() {
  return (
    <>
    <h1>Net Access Application</h1>
    <NetAccessToken />
    </>
  );
}
