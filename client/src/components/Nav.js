import styles from "../styles/nav.module.css";
import brand from "../images/pills.png";
import { Avatar } from "@chakra-ui/react";
import whatsapp from "../images/whatsapp.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";

const Nav = () => {
  const [isclick, setClick] = useState(false);
  const userLog = useSelector((state) => state.loginState.value);
  console.log(userLog);
  return (
    <div className={styles.root}>
      <div className={styles.brand}>
        <img className={styles.img} src={brand} alt="" />
        <h1 className={styles.title}>Lorem</h1>
      </div>
      <div className={styles.middle}>
        <Link style={{ textDecoration: "none", color: "black" }} to={"/"}>
          <p className={styles.texts}>Home</p>
        </Link>
        <p className={styles.texts}>Donate</p>
        {!isclick ? (
          <Link
            onClick={() => {
              setClick(true);
            }}
            to={"/login"}
          >
            <button className={styles.button}>Login</button>
          </Link>
        ) : userLog ? (
          <Avatar src="https://bit.ly/code-beast" />
        ) : null}
      </div>
      <div className={styles.right}>
        <p>Need Help? Chat With Us</p>
        <img className={styles.img2} src={whatsapp} alt="" />
      </div>
    </div>
  );
};

export default Nav;
