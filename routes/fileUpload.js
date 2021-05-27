import multer from "multer";
import UserModel from "../utils/model.js";
import path from "path";

const storage = multer.diskStorage({
  destination: "./public/",
  filename: function (req, file, cb) {
    cb(null, "CSV-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
}).single("myFile");

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
    var finalDate = `${time.toLocaleString("en-US", {
      hour: "numeric",
      hour12: true,
    })} on ${date} ${month} ${year}`;

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
  });
};

export default UploadFile;
