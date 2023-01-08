const router = require("express").Router();
const controller = require("../controller/controller");
const MessageController = require("../controller/MessageController");


// const auth = require("../middleware/auth");
//multer working
const multer = require("multer");
const store = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "../mukhar/src/media/profiles");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});
const profiler = multer({ storage: store });

router.post("/register", profiler.single("profile"), controller.registerUser);
router.post("/login", profiler.single("profile"), controller.loginUser);
router.post("/new-person", profiler.single("profile"), controller.findContact);

//message routes
router.get("/recipients", profiler.single("profile"), MessageController.recipientsList);
router.get("/received-messages", profiler.single("profile"), MessageController.receivedMessages);
router.post("/sending-message", profiler.single("profile"), MessageController.sendMessage);


// router.delete("/delete", auth, controller.delete);

module.exports = router;
