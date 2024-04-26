const { Router } = require("express")

const router = Router();

router.get("/", (req, res) => {
  return res.json({ msg: "Hello World" });
});

module.exports = router;