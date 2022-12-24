import Cookies from "js-cookie";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { useRouter } from "next/router";
import { verifyToken } from "../../../middleware/utils";
import { useEffect, useState } from "react";
import Sidebar from "../../../components/sidebar";
import Navbar from "../../../components/navbar";
import { Button, Form } from "react-bootstrap";
import Link from "next/link";
import axios from "axios";
import FormData from "form-data";

const PlantsForm = () => {
  const router = useRouter();
  const token = Cookies.get("token");
  const profile = token ? verifyToken(token) : "";
  const [name, setName] = useState("");
  const [variantName, setVariantName] = useState("");
  const [varietyList, setVarietyList] = useState([]);
  const MySwal = withReactContent(Swal);

  const [image, setImage] = useState(null);

  const handleVariantName = (inputVariantName) => {
    setVariantName(inputVariantName);
  };

  const handleImage = (inputImage) => {
    setImage(inputImage);
  };

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

  const inputPlant = (e) => {
    MySwal.fire({
      title: <strong>Data berhasil dimasukkan</strong>,
      icon: "success",
    });
    e.preventDefault();
    const body = new FormData();
    body.append("file", image);
    body.append("variety", variantName);
    axios({
      method: "post",
      url: "/api/plant",
      data: body,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((result) => {
        // console.log(result);
        router.push("/admin/plant");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log(image);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="w-full bg-[#f7f7f7]">
        <Navbar name={name} />
        <div className="m-8">
          <h2 className="">Plant Form</h2>
          <div className="w-auto h-auto">
            <Form className="my-4 lg:w-1/2 md:w-full rounded shadow-md shadow-[#ddd8d8]">
              <Form.Group className="mb-3 p-2">
                <Form.Label className="text-xl">Variant</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(event) => handleVariantName(event.target.value)}
                >
                  <option value="">--Select--</option>
                  {varietyList.map((variety, i) => {
                    const { id, name } = variety;
                    return (
                      <option key={i} value={id}>
                        {name}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>
              <Form.Group controlId="formFile" className="mb-3 p-2">
                <Form.Label>Default file input example</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(event) => handleImage(event.target.files[0])}
                />
              </Form.Group>

              <Button
                className="ml-2 mb-2"
                variant="input"
                id="input"
                type="submit"
                onClick={inputPlant}
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

export default PlantsForm;
