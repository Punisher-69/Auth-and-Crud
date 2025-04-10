import React, { useState, useSyncExternalStore } from "react";
import { Form, Input, Button } from "@heroui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const Base_Url = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const handleLogIn = () => {
    const payLoad = {
      email: email,
      password: password,
    };
    console.log(payLoad);
    axios
      .post(Base_Url, payLoad)
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          console.log("login Succcessful");
          localStorage.setItem(
            "access_token",
            JSON.stringify(res.data.access_token)
          );
          const token = JSON.parse(localStorage.getItem("access_token"));
          console.log(token);
          navigate("/products");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex justify-center items-center">
      <div className="bg-sky-400 inline-flex  justify-center p-[50px] border rounded-md mt-[25vh]">
        <Form className="w-full max-w-xs flex flex-col gap-4">
          <div className=" w-full space-y-4">
            <h1 className="text-lg font-bold font-serif text-blue-800">
              Shopping Cards
            </h1>
            <Input
              label="Email"
              placeholder="Enter (john@mail.com)"
              type="email"
              className="w-[320px]"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <Input
              label="Password"
              placeholder="Enter (changeme)"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <Button color="primary" variant="shadow" onPress={handleLogIn}>
              Log In
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default LoginPage;
