const express = require("express");
const cors = require("cors");
const connection = require("./config/db");
const userRouter = require("./routes/users.routes");
const appointmentRouter = require("./routes/appointments.route");
require("dotenv").config();
const app = express();
app.use(express.json(), cors());

app.use("/user", userRouter);
app.use("/appointments", appointmentRouter);

app.listen(process.env.PORT, async () => {
  console.log(`Server started at port ${process.env.PORT}`);
  try {
    await connection;
    console.log("Connected to DB");
  } catch (error) {
    console.log(error);
  }
});
