const express = require("express");
const fs = require("fs");
const router = express.Router();
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
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

router.post("/videos", (req, res) => {
  fs.readFile("./data/videos.json", "utf-8", (err, data) => {
    const videoObj = JSON.parse(data);
    const newVideo = {
      id: uuidv4(),
      title: req.body.title,
      channel: "movies trailers",
      image: "http://localhost:8180/images/batman.jpeg",
      description: req.body.description,
      views: "1,501,023",
      likes: "310,985",
      duration: "2:01",

      timestamp: 1626032763000,
      comments: [
        {
          id: uuidv4(),
          name: "Jason Coleman",
          comment: "absolutely amazing",
          likes: 0,
          timestamp: 1628522461000,
        },
        {
          id: uuidv4(),
          name: "Gary Wong",
          comment: "not better than Bale",
          likes: 0,
          timestamp: 1626359541000,
        },
        {
          id: "66b7d3c7-4023-47f1-a02c-520c9ca187a6",
          name: "Theodore Duncan",
          comment: "pleasantly surpried",
          likes: 0,
          timestamp: 1626011132000,
        },
      ],
    };
    videoObj.push(newVideo);
    fs.writeFile("./data/videos.json", JSON.stringify(videoObj), () => {
      res.json({ message: "data written to file", data: videoObj });
    });
  });
});

module.exports = router;
