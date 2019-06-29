let User = require("../User");

let UserController = {
  isExists: async email => {
    return await User.countDocuments({ email });
  },
  register: async (req, res) => {
    try {
      let exist = await UserController.isExists(req.body.email);
      if (!exist) {
        let user = await User.create({
          fullname: req.body.fullname,
          email: req.body.email,
          password: req.body.password
        });
        res.status(201).send({
          message: "Account created successfully.",
          data: {
            id: user._id,
            fullname: user.fullname,
            email: user.email
          }
        });
      } else {
        res.status(409).send({
          message: "Account with same email already exist.",
          data: null
        });
      }
    } catch (error) {
      res.status(500).send({
        message: "Something went wrong. Please try again.",
        data: null
      });
    }
  },
  login: async (req, res) => {
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        if (user.passwordMatch(req.body.password)) {
          res.status(200).send({
            message: "Logged in successfully",
            data: {
              id: user._id,
              fullname: user.fullname,
              email: user.email
            }
          });
        } else {
          res.status(401).send({
            message: "These credentials do not match our record.",
            data: null
          });
        }
      } else {
        res.status(401).send({
          message: "These credentials do not match our record.",
          data: null
        });
      }
    } catch (error) {
      res.status(500).send({
        message: "Something went wrong. Please try again.",
        data: null
      });
    }
  }
};

module.exports = UserController;
