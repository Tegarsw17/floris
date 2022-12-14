import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <h1 className="text-6xl uppercase">
        Welcome to <div className="inline text-[#49D299]">floris</div>
      </h1>
      <div className=" flex flex-col text-center py-2">
        <Link className="uppercase text-[#009EFF]" href="/login">
          log in
        </Link>
        <Link className="uppercase text-[#009EFF]" href="/">
          login as guest
        </Link>
      </div>
    </div>
  );
}
