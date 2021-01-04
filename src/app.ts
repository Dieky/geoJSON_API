require('dotenv').config();
import express from "express";
import path from "path";
import { ApiError } from "./errors/apiError";
//Add if needed
//import { requestLogger, errorLogger } from "./middlewares/logger";

const app = express();

app.use(express.static(path.join(process.cwd(), "public")))
app.use(express.json())

// middleware
app.use(function (req, res, next) {
  console.log('Time:', Date.now())
  next()
})

const userAPIRouter = require('./routes/gameAPI');
const geoAPIRouter = require('./routes/geoAPI');

app.get("/api/dummy", (req, res) => {
  res.json({ msg: "Hello" })
})

app.use("/api/users", userAPIRouter);
app.use("/geoapi/", geoAPIRouter);


//404 handler
app.use(function (req, res, next) {
  if (req.originalUrl.startsWith("/api")) {
    res.status(404).json({ code: 404, msg: "this API does not contanin this endpoint" })
  }
  next()
})

app.use(function (err: any, req: any, res: any, next: Function) {
  if (err instanceof (ApiError)) {
    const e = <ApiError>err;
    return res.status(e.errorCode).send({ code: e.errorCode, message: e.message })
  }
  next(err)
})

const PORT = process.env.PORT || 3333;
const server = app.listen(PORT)


console.log(`Server started, listening on port: ${PORT}`)
module.exports.server = server;


