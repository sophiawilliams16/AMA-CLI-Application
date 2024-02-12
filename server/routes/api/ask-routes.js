const router = require("express").Router();
const { ask } = require("../../controllers/ask");

router.route("/ask").post(ask);

module.exports = router;
