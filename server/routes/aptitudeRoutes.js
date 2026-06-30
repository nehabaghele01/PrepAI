const express = require("express");

const protect = require("../middleware/authMiddleware");
const checkOwnership = require("../middleware/ownerMiddleware");
const Aptitude = require("../models/Aptitude");


const {
    addTopic, getTopics, updateTopic,
    deleteTopic
} = require("../controllers/aptitudeController");


const router = express.Router();



router.post(
    "/",
    protect,
    addTopic
);

router.get(
    "/", 
    protect,
     getTopics
);

// Update
router.put(
    "/:id",
    protect,
    checkOwnership(Aptitude),
    updateTopic
);

// Delete
router.delete(
    "/:id",
    protect,
    checkOwnership(Aptitude),
    deleteTopic
);


module.exports = router;