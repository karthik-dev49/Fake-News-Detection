const express = require("express");
const router = express.Router();

const userNews = require("../models/news");
router.post("/predictNews", (req, res) => {
  let { news, userName ,prediction,dataset,model,accuracy} = req.body;
  if (!news || !userName || !prediction || !dataset || !model || !accuracy) {
    return res.json({ status: "error", message: "pura data bhejo" });
  }
  news = news.trim();
  userName = userName.trim();
  prediction = prediction.trim();
  dataset = dataset.trim();
  model = model.trim();
  accuracy = accuracy.trim();


  if (news === "" || userName === "" || prediction === "" || dataset === "" || model === "" || accuracy === "") {
    res.json({ status: "error", message: "Empty input fields" });
  } else {
    //save the user
    const newUserNews = new userNews({ news, userName ,prediction,dataset,model,accuracy});
    newUserNews
      .save()
      .then((result) => {
        res.json({ status: "ok", message: "News added", news: news ,prediction: prediction,dataset: dataset,model: model,accuracy: accuracy});
      })
      .catch((err) => {
        res.json({
          status: "error",
          message: "An error occured while saving news data",
        });
      });
  }
});

router.post("/getNews", async (req, res) => {
  try {
    // Assuming you have a News model with a find method
    let { userName } = req.body;
    const userSpecificNews = await userNews
      .find({ userName: userName })
      .sort({ createdAt: -1 }) // Sort by createdAt in descending order
      .exec(); // Execute the query

    res.json({ status: "ok", news: userSpecificNews });
  } catch (error) {
    console.error("Error while fetching news:", error);
    res
      .status(500)
      .json({
        status: "error",
        message: "An error occurred while fetching news",
      });
  }
});

router.delete("/deleteNews", async (req, res) => {
  // console.log(req.body.userName, req.body.createdAt);
  try {
    const { userName, createdAt } = req.body;
    
    // console.log(userName, createdAt);
    // Validate createdAt as a valid date format
    const createdAtDate = new Date(createdAt);
    // if (isNaN(createdAtDate.getTime())) {
    //   return res
    //     .status(400)
    //     .json({
    //       status: "error",
    //       message: "Invalid date format for createdAt",
    //     });
    // }

    // Assuming you have a News model with a findOneAndDelete method
    const deletedNews = await userNews.findOneAndDelete({
      userName: userName,
      createdAt: createdAtDate,
    });

    if (!deletedNews) {
      return res.json({ status: "error", message: "News not found" });
    }

    res.json({ status: "ok", message: "News deleted successfully" });
  } catch (error) {
    res.json({
      status: "error",
      message: "An error occurred while deleting newshhnhngng",
      error: error.message, // Include the error message in the response
    });
  }
});

module.exports = router;
