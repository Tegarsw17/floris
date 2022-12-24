import Cookies from "js-cookie";

import { useRouter } from "next/router";
import { verifyToken } from "../../../middleware/utils";
import { useEffect, useState } from "react";
import Sidebar from "../../../components/sidebar";
import Navbar from "../../../components/navbar";
import { Button, Form } from "react-bootstrap";
import Link from "next/link";
import axios from "axios";

const VarietiesForm = () => {
  const router = useRouter();
  const token = Cookies.get("token");
  const profile = token ? verifyToken(token) : "";
  const [name, setName] = useState("");
  const [variety, setVariety] = useState("");

  const handleVarietyName = (inputVarietyName) => {
    setVariety(inputVarietyName);
  };

  useEffect(() => {
    if (!profile) {
      router.push("/login");
      Cookies.remove("token");
    } else {
      setName(profile.username);
    }
  });

  const inputVariety = (e) => {
    e.preventDefault();

    axios({
      method: "post",
      url: "/api/plant/variety",
      data: { name: variety },
    })
      .then((result) => {
        // console.log(result);
        router.push("/admin/variety");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="w-full bg-[#f7f7f7]">
        <Navbar name={name} />
        <div className="m-8">
          <h2 className="">Variety Form</h2>
          <div className="w-auto h-auto">
            <Form className="my-4 lg:w-1/2 md:w-full rounded shadow-md shadow-[#ddd8d8]">
              <Form.Group className="mb-3 p-2">
                <Form.Label className="text-xl">Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name Variety"
                  required
                  onChange={(event) => handleVarietyName(event.target.value)}
                />
              </Form.Group>

              <Button
                className="ml-2 mb-2"
                variant="input"
                id="input"
                type="submit"
                onClick={inputVariety}
              >
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VarietiesForm;
