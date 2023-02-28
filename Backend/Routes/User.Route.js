const express = require("express");
const usersRoute = express.Router();
const { UsersModule } = require("../Models/User.Model");


usersRoute.get("/getdata", async (req, res) => {
  const category=req.query.category
  const name=req.query.name
  try {
    if(category || name){
      const { page = 1, limit = 4 } = req.query;
      const Data = await UsersModule.find({$or:[{"category":category},{"name":name}]}).limit(limit * 1)
      .skip((page - 1) * limit)
      res.send(Data);
    }
    else{
      const Data = await UsersModule.find().limit(limit * 1)
      .skip((page - 1) * limit);
    res.send(Data);
    }
    
  } catch (err) {
    res.status(401).json({
      message: "Something went wrong",
    });
  }
});


usersRoute.post("/postdata", async (req, res) => {
  const data = req.body;
  try {
    const userdata = new UsersModule(data);
    await userdata.save();
    res.status(201).json({ massage: "Post Successful", userdata });
  } catch (err) {
    res.status(401).json({
      err,
      message: "Something went wrong",
    });
  }
});
usersRoute.delete("/delete/:id",async (req,res)=>{
  const id=req.params.id
  try{
      await UsersModule.findByIdAndDelete({"_id":id})
      res.send("Delete Successful")
  }
  catch(err){
    res.status(401).json({
      err,
      message: "Something went wrong",
    });
  }
})

usersRoute.patch("/update/:id",async (req,res)=>{
  const id=req.params.id
  const payload=req.body
    try{
       await UsersModule.findByIdAndUpdate({"_id":id},payload)
       res.send("Update successful")
    }
    catch(err){
      res.status(401).json({
        err,
        message: "Something went wrong",
      });
    }
})

module.exports = {
  usersRoute,
};
