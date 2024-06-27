const express = require("express");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const router = express.Router();
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "mirzaisagoodb$oy";
// ------------------------------------
// ROUTE 1: create a user using: POST "/api/auth/createuser"" . No login required
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success=false;
    //   if there are errore return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }

    //    check the user with this email exist already
    try {
      let user = await User.findOne({ email: req.body.email });
      //   console.log(user);
      if (user) {
        return res
          .status(400)
          .json({ success,error: "Sorry a user with this email already exist" });
      }
      // add salt to password usin bcrypt
      const salt = await bcrypt.genSalt(10);
      const secPassword = await bcrypt.hash(req.body.password, salt);

      //   create a new user
      user = await User.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
      });

      const data = {
        id: user.id,
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      //  res.send(user);
      success = true;
      res.json({
        success,authToken,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);
// ------------------------------------
// ROUTE 2: Authentication a user using: POST "/api/auth/login"" . No login required
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "passward not empty").exists(),
  ],
  async (req, res) => {
    let success=false
    //   if there are errore return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        success=false
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }

      const comaprePassword = await bcrypt.compare(password, user.password);

      if (!comaprePassword) {
        success=false
        return res
          .status(400)
          .json({success, error: "Please try to login with correct credentials" });
      }

      const data = {
        id: user.id,
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      //  res.send(user);
      success=true,
      res.json({
        success,authToken,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

// ROUTE 3: Get login user details using: POST "/api/auth/getuser"" . No login required

router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});
module.exports = router;
