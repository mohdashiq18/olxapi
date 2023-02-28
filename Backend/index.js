require("dotenv").config();
const PORT = process.env.port;
const express = require("express");
const app = express();
const cors = require("cors");
const { connection } = require("./Configs/db");
const { usersRoute } =require("./Routes/User.Route")

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use("/",usersRoute)
app.get("/", (req, res) => {
  res.send("Welcome Home Page");
});

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Connected to the DB");
  } catch (error) {
    console.log(error);
  }
  console.log(`Server is running at PORT : ${PORT}`);
});