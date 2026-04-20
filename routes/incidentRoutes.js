const express = require("express");
const router = express.Router();

const controller = require("../controllers/incidentController");

router.get("/", contoller.getAll);
router.post("/", contoller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);

module.exports = router;