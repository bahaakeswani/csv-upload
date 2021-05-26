import styles from "../styles/login.module.css";
import image from "../images/shop.png";
import { Input, Stack } from "@chakra-ui/react";
import { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({
    userEmail: "",
    userPassword: "",
  });

  const handleFormChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  return (
    <div className={styles.home}>
      <div className={styles.left}>
        <h1 className={styles.title}>User Login</h1>
        <p className={styles.by}>Welcome Back! Please Login to Your Account</p>
        <Stack spacing={3}>
          <Input placeholder="medium size" size="md" />
          <Input placeholder="medium size" size="md" />
        </Stack>
      </div>
      <div>
        <img className={styles.img} src={image} alt="" />
      </div>
    </div>
  );
};

export default Login;
