import styles from "../styles/nav.module.css";
import brand from "../images/pills.png";
import whatsapp from "../images/whatsapp.png";

const Nav = () => {
  return (
    <div className={styles.root}>
      <div className={styles.brand}>
        <img className={styles.img} src={brand} alt="" />
        <h1 className={styles.title}>Lorem</h1>
      </div>
      <div className={styles.middle}>
        <p className={styles.texts}>Home</p>
        <p className={styles.texts}>Donate</p>
        <button className={styles.button}>Login</button>
      </div>
      <div className={styles.right}>
        <p>Need Help? Chat With Us</p>
        <img className={styles.img2} src={whatsapp} alt="" />
      </div>
    </div>
  );
};

export default Nav;
