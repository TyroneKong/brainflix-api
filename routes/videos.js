const express = require("express");
const fs = require("fs");
const router = express.Router();
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
    console.log(foundVideo);
    if (foundVideo) {
      res.send(foundVideo);
    } else {
      res.send("No video found!");
    }
  });
});

// posting comments
router.post("/videos/:id/comments", (req, res) => {
  fs.readFile("./data/videos.json", "utf-8", (err, data) => {
    const allData = JSON.parse(data);
    const foundVideoIndex = JSON.parse(data).findIndex(
      (video) => video.id === req.params.id
    );
    const commentsArray = allData[foundVideoIndex].comments;
    const newComment = {
      id: uuidv4(),
      name: `user:${Math.floor(Math.random() * 1000)}`,
      comment: req.body.comment,
      likes: 0,
      timestamp: +new Date(),
    };
    commentsArray.push(newComment);

    fs.writeFile(
      "./data/videos.json",

      JSON.stringify(allData),
      () => {
        res.json({
          message: "data written to file",
          data: commentsArray,
        });
      }
    );
  });
});

//post videos
router.post("/videos", (req, res) => {
  fs.readFile("./data/videos.json", "utf-8", (err, data) => {
    const videoObj = JSON.parse(data);
    const newVideo = {
      id: uuidv4(),
      title: req.body.title,
      channel: "Fashion",
      image: "http://localhost:8180/images/fashion.jpg",
      description: req.body.description,
      views: "1,501,023",
      likes: "310,985",
      duration: "2:01",

      timestamp: 1626032763000,
      comments: [
        {
          id: uuidv4(),
          name: "Jason Coleman",
          comment: "Loved the video",
          likes: 0,
          timestamp: 1628522461000,
        },
        {
          id: uuidv4(),
          name: "Kate Wilson",
          comment: "Cant wait for summer",
          likes: 0,
          timestamp: 1626359541000,
        },
        {
          id: uuidv4(),
          name: "Gerry Smith",
          comment: "I need to buy some spring wear",
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
