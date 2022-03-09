const express = require("express");
const fs = require("fs");
const router = express.Router();
const cors = require("cors");

//videos route
router.get("/videos", (req, res) => {
  fs.readFile("./data/videos.json", "utf-8", (err, data) => {
    const videoObj = JSON.parse(data);
    if (err) {
      res.send("error reading videos data");
    } else {
      res.send(videoObj);
    }
  });
});

//videos returned based off id
router.get("/videos/:id", (req, res) => {
  fs.readFile("./data/videos.json", "utf-8", (err, data) => {
    const foundVideo = JSON.parse(data).find(
      (video) => video.id === req.params.id
    );
    if (foundVideo) {
      res.send(foundVideo);
    } else {
      res.send("No video found!");
    }
  });
});

router.post("./videos/:id", (req, res) => {
  fs.readFile("./data/videos.json", "utf-8", (err, data) => {
    const videoObj = JSON.parse(data);
  });
});

module.exports = router;
