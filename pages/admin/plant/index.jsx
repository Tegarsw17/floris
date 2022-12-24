import Cookies from "js-cookie";

import { useRouter } from "next/router";
import { verifyToken } from "../../../middleware/utils";
import { useEffect, useState } from "react";
import Sidebar from "../../../components/sidebar";
import Navbar from "../../../components/navbar";
import axios from "axios";
import { Table } from "react-bootstrap";
import Image from "next/image";

const PlantView = () => {
  const router = useRouter();
  const token = Cookies.get("token");
  const profile = token ? verifyToken(token) : "";
  const [name, setName] = useState("");
  const [plantList, setPlantList] = useState([]);

  useEffect(() => {
    if (!profile) {
      router.push("/login");
      Cookies.remove("token");
    } else {
      setName(profile.username);
    }

    axios({
      method: "GET",
      url: "/api/plant",
    }).then((result) => setPlantList(result.data.data));
  }, []);

  console.log(plantList);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="w-full bg-[#f7f7f7]">
        <Navbar name={name} />
        <div className="m-4">
          <h2>Plant</h2>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>First Planting</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {plantList.map((plant, i) => {
                const { name, first_planting, image } = plant;
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{name.toUpperCase()}</td>
                    <td>{first_planting == null ? "-" : first_planting}</td>
                    <td>
                      <Image src={`/${image}`} width={150} height={150} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default PlantView;
