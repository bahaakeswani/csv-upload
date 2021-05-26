import styles from "../styles/upload.module.css";
import { Input } from "@chakra-ui/react";

const Upload = () => {
  var userName = sessionStorage.getItem("Name");
  var date;
  return (
    <div className={styles.home}>
      <h1 className={styles.title}>Hi {userName}</h1>
      <p className={styles.by}>The last upload made by you was on {date}</p>

      <div className={styles.uploadBox}>
        <h3 className={styles.uploadtitle}>Upload Your File Here</h3>
        <Input
          mt="2vh"
          w="35%"
          type="file"
          placeholder="Select File From Computer"
        />
        <button className={styles.button}>Upload</button>
      </div>
    </div>
  );
};

export default Upload;
