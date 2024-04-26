const { Router } = require("express");
const router = Router();

const passport = require("passport")

const postController = require("../controllers/post")
const commentController = require("../controllers/comment");

router.post("/", passport.authenticate('jwt'), postController.create);
router.get("/:id", postController.read);
router.put("/:id/update", passport.authenticate('jwt'), postController.update)


router.post("/:id/comments/", passport.authenticate('jwt', { session: false }), commentController.create)

module.exports = router;