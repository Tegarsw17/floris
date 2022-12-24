import Cookies from "js-cookie";

import { useRouter } from "next/router";
import { verifyToken } from "../middleware/utils";
import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";

const Template = ({ title }) => {
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

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="w-full bg-[#f7f7f7]">
        <Navbar name={name} />
        <div className="m-4">
          <h2>{title}</h2>
        </div>
      </div>
    </div>
  );
};

export default Template;
