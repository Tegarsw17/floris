import Cookies from "js-cookie";

import { useRouter } from "next/router";
import { verifyToken } from "../../../middleware/utils";
import { useEffect, useState } from "react";
import Sidebar from "../../../components/sidebar";
import Navbar from "../../../components/navbar";
import axios from "axios";
import { Table } from "react-bootstrap";

const VarietyView = () => {
  const router = useRouter();
  const token = Cookies.get("token");
  const profile = token ? verifyToken(token) : "";
  const [name, setName] = useState("");
  const [varietyList, setVarietyList] = useState([]);

  useEffect(() => {
    if (!profile) {
      router.push("/login");
      Cookies.remove("token");
    } else {
      setName(profile.username);
    }

    axios({
      method: "GET",
      url: "/api/plant/variety",
    }).then((result) => setVarietyList(result.data.data));
  }, []);

  //   console.log(varietyList);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="w-full bg-[#f7f7f7]">
        <Navbar name={name} />
        <div className="m-4">
          <h2>Variety</h2>
          <div className="w-1/2">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {varietyList.map((variety, i) => {
                  const { name } = variety;
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{name}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VarietyView;
