import styles from "../styles/login.module.css";
import { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
    userUsername: "",
  });

  const handleFormChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  return <div>log</div>;
};

export default Login;
