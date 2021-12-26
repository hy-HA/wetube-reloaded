import express from "express";
import {edit, remove, logout, see} from "../controllers/userController";


//1.라우터 쓰기 > 2.라우터 만들기(o) >3.라우터 페이지 만들기
const userRouter = express.Router();
//1.라우터 쓰기 > 2.라우터 만들기 >3.라우터 페이지 만들기-라우터(o)
userRouter.get("/logout",logout);
userRouter.get("/edit",edit);
userRouter.get("/remove", remove);
userRouter.get(":id",see);

//1.라우터 쓰기 > 2.라우터 만들기(o) >3.라우터 페이지 만들기>4.expoert하기
export default userRouter;


