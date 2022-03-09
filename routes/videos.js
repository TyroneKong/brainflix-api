const express = require("express");
const fs = require("fs");
const router = express.Router();

//videos route
router.get("/videos", (req, res) => {
  fs.readFile("./data/videos.json", "utf-8", (err, data) => {
    if (err) {
      res.send("error reading videos data");
    } else {
      res.send(data);
    }
  });
});

//videos returned based off id
router.get("/videos/:id", (req, res) => {
  fs.readFile("./data/videos.json", "utf-8", (err, data) => {
    if (err) {
      res.send("error reading videos data");
    } else {
      const videoObj = JSON.parse(data);
      res.send(videoObj.filter((video) => video.id === req.params.id));
    }
  });
});

router.post("./videos/:id", (req, res) => {
  fs.readFile("./data/videos.json", "utf-8", (err, data) => {
    const videoObj = JSON.parse(data);
  });
});

module.exports = router;
