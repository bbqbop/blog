const { Router } = require("express");
const router = Router();

const postController = require("../controllers/post")
const commentController = require("../controllers/comment");

const { authJwt, authAdmin } = require("../lib/authentication")

router.get("/", postController.readAll)

router.post("/", authJwt, authAdmin, postController.create);
router.get("/:id", postController.read);
router.put("/:id", authJwt, authAdmin, postController.update)
router.delete("/:id", authJwt, authAdmin, postController.delete)


router.post("/:id/comments/", authJwt, commentController.create);
router.delete("/:postId/comments/:commentId", authJwt, commentController.delete)

module.exports = router;