import express from "express";
import { home, search } from "../controllers/videoController";
import { join, login } from "../controllers/userController";

//1.라우터 쓰기 > 2.라우터 만들기(o) >3.라우터 첫페이지 만들기
const globalRouter = express.Router();

//1.라우터 쓰기 > 2.라우터 만들기 >3.라우터 첫페이지 만들기-라우터(o)
globalRouter.get("/", home);
globalRouter.get("/join", join);
globalRouter.get("/login", login);

//1.라우터 쓰기 > 2.라우터 만들기 >3.라우터 페이지 만들기>4.expoert하기
export default globalRouter;