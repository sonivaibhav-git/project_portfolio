const express = require("express");
const  mongoose = require ("mongoose");
const  dotenv = require ("dotenv");
const  cors = require ("cors");
const cookieParser = require("cookie-parser");
const  connectionDB = require ("./config/dbconfig.js");
const routes = require("./routes/index.js")

dotenv.config();
const app = express();
const PORT = process.env.PORT;

//middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

// API routes
app.use("/api/v1", routes);


const startServer = async () => {
  try {
    await connectionDB();
    app.listen(PORT, () => {
      console.log(`App is running on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

startServer();
