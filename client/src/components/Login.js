import styles from "../styles/login.module.css";
import image from "../images/shop.png";
import { Input, Stack, useToast } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { loginStateSlice } from "../redux/isLoggedIn";
import { useDispatch } from "react-redux";

const Login = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const isLoggedIn = loginStateSlice.actions;
  const history = useHistory();
  const [formData, setFormData] = useState({
    userEmail: "",
    userPassword: "",
  });

  const handleFormChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleSubmit = () => {
    const URL = "http://localhost:8080/login";
    axios
      .post(URL, formData)
      .then((res) => {
        if (res.data["code"] === "OK") {
          sessionStorage.setItem("Name", res.data["userResponse"]["userName"]);
          sessionStorage.setItem(
            "Email",
            res.data["userResponse"]["userEmail"]
          );
          dispatch(isLoggedIn.status(true));
          history.push("/upload");
        } else {
          toast({
            title: "OOPS",
            description: "User Doesn't Exist",
            status: "warning",
            duration: 2100,
            isClosable: true,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className={styles.home}>
      <div className={styles.left}>
        <h1 className={styles.title}>User Login</h1>
        <p className={styles.by}>Welcome Back! Please Login to Your Account</p>
        <Stack width="100%" mt="5vh" spacing={3}>
          <Input
            onChange={handleFormChange}
            name="userEmail"
            width="75%"
            placeholder="Login ID"
            size="md"
          />
          <Input
            onChange={handleFormChange}
            name="userPassword"
            w="75%"
            type="password"
            placeholder="Password"
            size="md"
          />
        </Stack>
        <button onClick={handleSubmit} className={styles.button}>
          Login
        </button>
      </div>
      <div>
        <img className={styles.img} src={image} alt="" />
      </div>
    </div>
  );
};

export default Login;
