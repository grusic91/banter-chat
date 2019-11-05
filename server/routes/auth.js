const express = require("express");
const router = express.Router();

const { registerUser } = require("../handlers/user.js");

router.post("/register", registerUser)

router.get("/register", function (req, res) {
    res.send({"success": true})
})

module.exports = router;
