import React, { useState } from "react";
import { setCookie } from "cookies-next";
import LoginSignup from "../components/login-signup/LoginSignup";
import axios from "axios";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import ImageLoader from "../components/loader/ImageLoader";
import { useDispatch } from "react-redux";
import { Box } from "@mui/material";

const LoginSignUp = () => {
  const [isCreated, setIsCreated] = useState(true);
  const [userData, setUserData] = useState({ username: "", name: "" });
  const [loginData, setLoginData] = useState();
  const router = useRouter();

  const mutationLogin = useMutation({
    mutationFn: async (data) => {
      return await axios.post(`http://localhost:4000/user/login`, data);
    },
    onSuccess: (res) => {
      setCookie("ut", res.data.token, {});
      setCookie("ut", res.data.token);
      router.push("/dashboard/profile");
      console.log("object");
    },
    onError: (eror) => {
      console.error(eror);
    },
  });
  const mutationSignup = useMutation({
    mutationFn: async (data) => {
      return await axios.post("http://localhost:4000/user/signup", data);
    },
    onSuccess: (res) => {
      setCookie("ut", res.data.token, {});
      router.push("/dashboard/profile");
    },
  });

  // if (mutationLogin.isLoading || mutationSignup.isLoading) {
  //   return <ImageLoader />;
  // }
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {isCreated ? (
        <LoginSignup
          title={"Login"}
          firstLabel={"UserName"}
          secondLabel={"password"}
          clickTitle={"Login"}
          isLogin={"Do you want to create an account?"}
          isLoginHandler={() => setIsCreated(false)}
          setUserData={setLoginData}
          userData={loginData}
          submitHandler={() => mutationLogin.mutate(loginData)}
        />
      ) : (
        <LoginSignup
          title={"Create an account"}
          firstLabel={"UserName"}
          secondLabel={"Name"}
          clickTitle={"SignUp"}
          isLogin={"Alreday have an account?"}
          isLoginHandler={() => setIsCreated(true)}
          setUserData={setUserData}
          userData={userData}
          submitHandler={() => mutationSignup.mutate(userData)}
        />
      )}
    </Box>
  );
};
export default LoginSignUp;
