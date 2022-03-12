import express from "express";
import {getEdit, postEdit, remove, logout, see, startGithubLogin, finishGithubLogin} from "../controllers/userController";


//1.라우터 쓰기 > 2.라우터 만들기(o) >3.라우터 페이지 만들기
const userRouter = express.Router();
//1.라우터 쓰기 > 2.라우터 만들기 >3.라우터 페이지 만들기-라우터(o)
userRouter.get("/logout",logout);
userRouter.route("/edit").get(getEdit).post(postEdit);
userRouter.get("/github/start", startGithubLogin);
userRouter.get("/github/finish", finishGithubLogin);
userRouter.get(":id",see);

//1.라우터 쓰기 > 2.라우터 만들기(o) >3.라우터 페이지 만들기>4.expoert하기
export default userRouter;


