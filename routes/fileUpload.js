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
    UserModel.findOneAndUpdate(
      { userEmail: req.body.userEmail },
      { $set: { userCSV: upfile, date: Date() } },
      { new: true, useFindAndModify: false },
      (err, doc) => {
        if (err) {
          res.send({ code: "ERR" });
        } else res.send({ code: "OK", timeStamp: Date() });
      }
    );
  });
};

export default UploadFile;
