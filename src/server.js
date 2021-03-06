import express from "express";
//const express = require("express"); 코드의 최신버전 
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import { localsMiddleware } from "./middlewares";
import apiRouter from "./routers/apiRouter";


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

app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        resave: true,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl : process.env.DB_URL }),
    })
)

app.get("/add-one" , (req, res, next) => {
    req.session.potato += 1;
    return res.send(`${req.session.id}`);
});

/* 로그인하는 모든 유저의 세션 정보를 확인
app.use((req, res, next) => {
    req.sessionStore.all((error, sessions) => {
        console.log(sessions);
        next();
    });
});
*/
app.use((req, res, next) => {
    res.header("Cross-Origin-Embedder-Policy", "require-corp");
    res.header("Cross-Origin-Opener-Policy", "same-origin");
    next();
  });
  
app.use(localsMiddleware);
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("assets"));
app.use("/",rootRouter);
app.use("/videos",videoRouter);
app.use("/users",userRouter);
app.use("/api", apiRouter);

export default app;