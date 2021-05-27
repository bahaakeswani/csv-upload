import styles from "../styles/upload.module.css";
import { Input } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

const Upload = () => {
  const [myFile, setFile] = useState(null);
  var userName = sessionStorage.getItem("Name");
  var userEmail = sessionStorage.getItem("Email");
  var date;
  const handleFile = (event) => {
    setFile(event.target.files[0]);
  };
  const handleUpload = () => {
    const formData = new FormData();
    formData.append("myFile", myFile);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    formData.append("userEmail", userEmail);
    const URL = "http://localhost:8080/upload";
    axios.post(URL, formData, config).then((res) => {
      console.log(res.data);
    });
  };
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
          name="myFile"
          onChange={handleFile}
        />
        <button onClick={handleUpload} className={styles.button}>
          Upload
        </button>
      </div>
    </div>
  );
};

export default Upload;
