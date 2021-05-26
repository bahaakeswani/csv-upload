import UserModel from "../utils/model.js";

const LoginUser = (req, res) => {
  const { userEmail, userPassword } = req.body;
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
          });
        } else res.send({ code: "UNREGISTERED" });
      }
    }
  );
};

export default LoginUser;
