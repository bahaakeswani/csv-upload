import UserModel from "../utils/model.js";

const GetDate = (req, res) => {
  const { userEmail } = req.body;
  UserModel.findOne(
    {
      userEmail: userEmail,
    },
    (err, docs) => {
      if (err) console.log(err);
      else {
        if (docs) {
          res.send({
            code: "OK",
            timeStamp: docs["date"],
          });
        } else res.send({ code: "ERR" });
      }
    }
  );
};

export default GetDate;
