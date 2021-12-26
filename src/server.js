import express from "express";
//const express = require("express"); 코드의 최신버전 
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const PORT = 4000;
const app = express();
const logger = morgan("dev");
//const logger = (req, res, next) => {
//    console.log(`${req.method} ${req.url}`);
//    next();
//};
app.use(logger);


//1.라우터 쓰기(o) > 2.라우터 만들기 >3.라우터 첫페이지 만들기
app.use("/",globalRouter);
app.use("/videos",videoRouter);
app.use("/users",userRouter);

const handleListening = () => 
    console.log(`Server listening on port http://localhost:${PORT} ☞☞`);

app.listen(PORT, handleListening);
//위 두줄을 합칠 수도 있음. 
//app.listen(4000, () => console.log("Server listening on port 4000 ☞☞"));
