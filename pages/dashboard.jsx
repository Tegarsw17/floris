import Cookies from "js-cookie";
import { Button } from "react-bootstrap";
import { AiOutlineDashboard } from "react-icons/ai";

import { useRouter } from "next/router";
import { setLogout, verifyToken } from "../middleware/utils";
import { useEffect, useState } from "react";

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
      <div className="w-80 bg-[#49D299]">
        <div className="h-5/6 m-4">
          <h2>
            <AiOutlineDashboard className="inline" />
            Floris
          </h2>
        </div>
      </div>
      <div className="w-full bg-[#f7f7f7]">ini main content</div>

      {/* <h1>Hello, {name}</h1>
      <Button onClick={(e) => handleOnClickLogout(e)}>logout</Button> */}
    </div>
  );
};

export default Dashboard;
