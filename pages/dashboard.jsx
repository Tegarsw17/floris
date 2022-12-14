import Cookies from "js-cookie";
import { Button } from "react-bootstrap";
import { AiOutlineDashboard } from "react-icons/ai";

import { useRouter } from "next/router";
import { setLogout, verifyToken } from "../middleware/utils";
import { useEffect, useState } from "react";
import Link from "next/link";

const Dashboard = () => {
  const router = useRouter();
  const token = Cookies.get("token");
  const profile = token ? verifyToken(token) : "";
  const [name, setName] = useState("");

  useEffect(() => {
    if (!profile) {
      router.push("/login");
      Cookies.remove("token");
    } else {
      setName(profile.username);
    }
  });

  function handleOnClickLogout(e) {
    setLogout(e);
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar Content */}
      <div className="w-80 bg-[#49D299]">
        <div className="h-5/6 m-4 p2">
          <h2 className="text-[#f7f7f7]">
            <AiOutlineDashboard className="inline pb-1" />
            Floris
          </h2>
        </div>
      </div>
      {/* Main Content */}
      <div className="w-full bg-[#f7f7f7]">
        <nav className="flex bg-[#0cc779] justify-between items-center px-3">
          <p>aku</p>
          <a onClick={(e) => handleOnClickLogout(e)}>Logout</a>
        </nav>
      </div>

      {/* <h1>Hello, {name}</h1>
      <Button onClick={(e) => handleOnClickLogout(e)}>logout</Button> */}
    </div>
  );
};

export default Dashboard;
