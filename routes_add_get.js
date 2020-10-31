const budgetModel = require("./models/personal-budget-schema");
const express = require("express");


const router = express.Router();

router.post("/adddata", async (req, res) => {
  const addingData = new budgetModel({title: req.body.title,budget: req.body.budget,color: req.body.color});
  try{
    const budgetDataSaved = await addingData.save();
    res.send(budgetDataSaved);
    }
  catch(exception){
        console.log(exception);
    }
});

router.get("/getdata", async (req, res) => {
    try{
        const budgetData = await budgetModel.find();
        res.send(budgetData);
    }
    catch(exception){
        console.log(exception);
    }
});

module.exports = router;
