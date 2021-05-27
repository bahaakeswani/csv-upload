import multer from "multer";
import UserModel from "../utils/model.js";
import path from "path";
import fs from "fs";
import parse from "csv-parse";

// Setting ==================================================
let smh;
const storage = multer.diskStorage({
  destination: "./public/",
  filename: function (req, file, cb) {
    smh = "CSV-" + Date.now() + path.extname(file.originalname);
    cb(null, smh);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
}).single("myFile");

// Main ====================================================
const UploadFile = (req, res) => {
  upload(req, res, () => {
    const upfile = req.file;
    const email = req.body.userEmail;
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const d = new Date();
    var date = d.getDate();
    var time = new Date();
    var year = d.getFullYear();
    var month = monthNames[d.getMonth()];
    var finalDate = `${time.toLocaleString("en-IN", {
      hour: "numeric",
      hour12: true,
    })} on ${date} ${month} ${year}`;
    //----------------------------------------------------------------
    var parser = parse(
      { columns: true, delimiter: ";" },
      function (err, records) {
        if (err) console.log(err);

        if (
          records[0]?.hasOwnProperty("Product ID") &&
          records[0]?.hasOwnProperty("Product Name") &&
          records[0]?.hasOwnProperty("Product Cost")
        ) {
          UserModel.findOneAndUpdate(
            { userEmail: email },
            { $set: { userCSV: upfile, date: finalDate } },
            { new: true, useFindAndModify: false },
            (err, doc) => {
              if (err) {
                res.send({ code: "ERR" });
              } else res.send({ code: "OK", timeStamp: finalDate });
            }
          );
        } else {
          res.send({ code: "CONFLICT" });
        }
      }
    );
    //------------------------------------
    fs.createReadStream("./public/" + smh).pipe(parser);
  });
};

export default UploadFile;
