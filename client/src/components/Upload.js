import styles from "../styles/upload.module.css";
import { Input, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import done from "../images/done.png";

const Upload = () => {
  const toast = useToast();
  const [myFile, setFile] = useState(null);
  const [isComplete, setComplete] = useState(false);
  const [timeStamp, setTimestamp] = useState("");
  const userName = sessionStorage.getItem("Name");
  const userEmail = sessionStorage.getItem("Email");

  useEffect(() => {
    // const url = "http://localhost:8080/getdate";
    const url = "https://csv-upload-kanae.herokuapp.com/getdate";
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
    // const URL = "http://localhost:8080/upload";
    const URL = "https://csv-upload-kanae.herokuapp.com/upload";
    axios.post(URL, formData, config).then((res) => {
      console.log(res.data["code"]);
      if (res.data["code"] === "OK") {
        isComplete ? setComplete(false) : setComplete(true);
        setTimestamp(res.data["timeStamp"]);
      } else if (res.data["code"] === "CONFLICT") {
        toast({
          title: "CSV Merge Conflict",
          description:
            "Make Sure your CSV file has the fields: Product ID, Product Name & Product Cost",
          status: "error",
          isClosable: true,
        });
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
            className={styles.inp}
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
