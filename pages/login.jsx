import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import Loading from "../components/loading";
import { verifyToken } from "../middleware/utils";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const token = Cookies.get("token");
  const profile = token ? verifyToken(token) : "";

  const handleUsername = (inputUsername) => {
    setUsername(inputUsername);
  };
  const handlePassword = (inputPassword) => {
    setPassword(inputPassword);
  };

  useEffect(() => {
    if (profile) {
      router.push("/dashboard");
    }
  });

  const userLogin = (e) => {
    e.preventDefault();

    const inputData = {
      username: username,
      password: password,
    };

    axios({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/user/login`,
      data: inputData,
    })
      .then((result) => {
        setLoading(false);
        Cookies.set("token", result.data.data);
        router.push("/dashboard");
      })
      .catch((error) => {
        if (error.response.data.status == "error") {
          console.log(error.response.data.message);
        }
      });
  };

  // if (loading) return <Loading style={{ zIndex: 99 }} />;
  return (
    <div className="flex flex-row">
      <div className="flex flex-col justify-center items-center h-screen w-1/2 bg-[#49D299] rounded-r-[15px]">
        <div>
          <h1 className="text-[64px] text-[#393E46]">Garden</h1>
          <h1 className="text-[64px] text-[#393E46]">Management</h1>
          <h1 className="text-[64px] text-[#393E46]">System</h1>
          <h2 className="text-[32px] text-[#f7f7f7]">
            Manage your lovely plant
          </h2>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center h-screen w-1/2 bg-[#f7f7f7]">
        <div className="my-7">
          <h1>
            Welcome to <div className="inline text-[#49D299]">Floris</div>
          </h1>
        </div>
        <Form className="w-3/5">
          <Form.Group className="mb-3">
            <Form.Label className="text-xl">Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              required
              onChange={(event) => handleUsername(event.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="text-xl">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="*****"
              required
              onChange={(event) => handlePassword(event.target.value)}
            />
          </Form.Group>
          <Form.Group className="flex flex-row justify-between mb-2">
            <Form.Check type="checkbox" label="Remember me" />
            <Link href={"#"} className="text-[#009EFF]">
              Forgot Password
            </Link>
          </Form.Group>
          <Button
            className="w-full"
            variant="input"
            id="input"
            type="submit"
            onClick={userLogin}
          >
            {!loading ? <Loading style={{ zIndex: 99 }} /> : "Submit"}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
