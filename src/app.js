import express from "express";
import cors from "cors";
import router from "./route/user-route.js";

const app = express()

app.use(express.json())
app.use(cors({origin: "*"}))
app.use("/api", router)

export default app