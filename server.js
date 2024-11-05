const express = require("express");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// dot env configuration
dotenv.config();
// rest object
const app = express();

// db connection
connectDB();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/api/v1/test", require("./routes/testRoutes"));
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/user", require("./routes/userRoute.js"));
app.use("/api/v1/resturant", require("./routes/resturantRoute.js"));

app.get("/", (req, res) => {
  console.log(`hi there`.bgCyan);
  res.status(200).send("<h1>Welcome to Food Server APP</h1>");
});

// PORT
const PORT = process.env.PORT || 8080;

// listen

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`.bgGreen);
});
