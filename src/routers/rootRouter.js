import express from "express";
import { home, search } from "../controllers/videoController";
import { getJoin,postJoin, getlogin, postlogin } from "../controllers/userController";
import { publicOnlyMiddleware } from "../middlewares";

//1.라우터 쓰기 > 2.라우터 만들기(o) >3.라우터 첫페이지 만들기
const rootRouter = express.Router();

//1.라우터 쓰기 > 2.라우터 만들기 >3.라우터 첫페이지 만들기-라우터(o)
rootRouter.get("/", home);
rootRouter.route("/join").all(publicOnlyMiddleware).get(getJoin).post(postJoin);
rootRouter.route("/login").all(publicOnlyMiddleware).get(getlogin).post(postlogin);
rootRouter.get("/search", search);

//1.라우터 쓰기 > 2.라우터 만들기 >3.라우터 페이지 만들기>4.expoert하기
export default rootRouter;