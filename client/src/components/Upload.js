import styles from "../styles/upload.module.css";
import { Input } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import done from "../images/done.png";

const Upload = () => {
  const [myFile, setFile] = useState(null);
  const [isComplete, setComplete] = useState(false);
  const [timeStamp, setTimestamp] = useState("");
  const userName = sessionStorage.getItem("Name");
  const userEmail = sessionStorage.getItem("Email");

  useEffect(() => {
    const url = "http://localhost:8080/getdate";
    axios.post(url, { userEmail: userEmail }).then((res) => {
      setTimestamp(res.data["timeStamp"]);
    });
  });

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
      if (res.data["code"] === "OK") {
        !isComplete ? setComplete(true) : setComplete(false);
        setTimestamp(res.data["timeStamp"]);
      }
    });
  };
  return (
    <div className={styles.home}>
      <h1 className={styles.title}>Hi {userName}</h1>
      <p className={styles.by}>
        The last upload made by you was on {timeStamp}
      </p>

      <div className={styles.uploadBox}>
        {!isComplete ? (
          <h3 className={styles.uploadtitle}>Upload Your File Here</h3>
        ) : (
          <h3 className={styles.doneuploadtitle}>
            <img src={done} className={styles.done} alt="" />
            &nbsp;&nbsp;&nbsp;File Uploaded
          </h3>
        )}
        {!isComplete ? (
          <Input
            mt="2vh"
            w="35%"
            type="file"
            placeholder="Select File From Computer"
            name="myFile"
            onChange={handleFile}
          />
        ) : null}
        <button onClick={handleUpload} className={styles.button}>
          {!isComplete ? "Upload" : "Upload New File"}
        </button>
      </div>
    </div>
  );
};

export default Upload;
