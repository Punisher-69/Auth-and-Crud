import React, { useEffect, useState } from "react";
import { Form, Input, Button } from "@heroui/react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { checkFields } from "../Utilities/utils";
import { Checkbox } from "@heroui/react";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const Base_Url = import.meta.env.VITE_BASE_URL;
  const Details_Url = import.meta.env.VITE_DETAILS_URl;
  const [isLoad, setIsLoad] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  const [selected, setSelected] = useState(true);

  const location = useLocation();

  const navigate = useNavigate();

  const handleLogIn = (e) => {
    e.preventDefault();

    setIsLoad(true);
    const payLoad = {
      email: email,
      password: password,
    };

    if (checkFields(payLoad.email, payLoad.password)) {
      axios
        .post(Base_Url, payLoad)
        .then((res) => {
          if (res.status === 201) {
            localStorage.setItem(
              "access_token",
              JSON.stringify(res.data.access_token)
            );
            const token = res.data.access_token;

            const header = {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            };

            axios
              .get(Details_Url, header)
              .then((res) => {
                if (selected) {
                  localStorage.setItem("email", JSON.stringify(res.data.email));
                  localStorage.setItem(
                    "password",
                    JSON.stringify(res.data.password)
                  );
                } else {
                  localStorage.removeItem("email");
                  localStorage.removeItem("password");
                }
              })
              .catch((err) => {
                console.error(err);
              });
            navigate("/products");
          }
        })
        .catch((err) => {
          console.error(err), setIsLoad(false), setIsWrong(true);
        });
    } else {
      setIsEmpty(true);
      setIsLoad(false);
    }
  };

  const checklocation = () => {
    if (location.pathname === "/") {
      localStorage.removeItem("access_token");
      setEmail(JSON.parse(localStorage.getItem("email")));
      setPassword(JSON.parse(localStorage.getItem("password")));
    }
  };
  useEffect(() => {
    checklocation();
  }, [location]);

  return (
    <div className="flex justify-center items-center">
      <div className="bg-sky-400 inline-flex  justify-center p-[50px] border rounded-md mt-[25vh]">
        <Form
          autoComplete="on"
          onSubmit={handleLogIn}
          className="w-full max-w-xs flex flex-col gap-4"
        >
          <div className=" w-full space-y-4">
            <h1 className="text-lg font-bold font-serif text-blue-800">
              Shopping Cards
            </h1>
            <Input
              label="Email"
              placeholder="Enter (john@mail.com)"
              type="email"
              className="w-[320px] mb-0"
              onChange={(e) => {
                setEmail(e.target.value), setIsWrong(false);
              }}
              value={email}
            />
            {isEmpty && email === "" ? (
              <p className="text-red-600  inline text-sm">
                Email can't be empty
              </p>
            ) : (
              ""
            )}
            <Input
              label="Password"
              placeholder="Enter (changeme)"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value), setIsWrong(false);
              }}
              value={password}
            />
            {isEmpty && password === "" ? (
              <>
                {" "}
                <p className="text-red-600  inline text-sm">
                  Password can't be empty
                </p>
                <br />
              </>
            ) : (
              ""
            )}
            {isWrong ? (
              <>
                {" "}
                <p className="text-red-600 inline text-sm">
                  Email or Password is incorrect
                </p>
                <br />
              </>
            ) : (
              ""
            )}
            <Checkbox onValueChange={() => setSelected(false)} defaultSelected>
              Remember me
            </Checkbox>{" "}
            <br />
            <Button
              isLoading={isLoad}
              spinnerPlacement="end"
              spinner={
                <svg
                  className="animate-spin h-4 w-4 text-current"
                  fill="none"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    fill="currentColor"
                  />
                </svg>
              }
              color="primary"
              variant="shadow"
              type="submit"
            >
              Log In
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default LoginPage;
