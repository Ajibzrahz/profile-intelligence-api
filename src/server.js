import app from "./app.js";
import connectDB from "./db/connect.js";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Profile Intelligence API is running",
  });
});


const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => console.log(`app is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
