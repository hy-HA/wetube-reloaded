import express from "express";
//const express = require("express"); 코드의 최신버전 
import morgan from "morgan";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";


const app = express();
const logger = morgan("dev");
//const logger = (req, res, next) => {
//    console.log(`${req.method} ${req.url}`);
//    next();
//};

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use(logger);
//1.라우터 쓰기(o) > 2.라우터 만들기 >3.라우터 첫페이지 만들기
app.use(express.urlencoded({extended:true}));
app.use("/",rootRouter);
app.use("/videos",videoRouter);
app.use("/users",userRouter);

export default app;