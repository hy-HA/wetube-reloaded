import express from "express";
import { watch, upload, getEdit, postEdit, deleteVideo } from "../controllers/videoController";

//1.라우터 쓰기 > 2.라우터 만들기(o) >3.라우터 페이지 만들기
const videoRouter = express.Router();


//1.라우터 쓰기 > 2.라우터 만들기 >3.라우터 페이지 만들기-라우터(o)
videoRouter.get("/:id(\\d+)", watch);
//videoRouter.get("/:id(\\d+)/edit", getEdit);
//videoRouter.post("/:id(\\d+)/edit", postEdit);
videoRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);

//1.라우터 쓰기 > 2.라우터 만들기(o) >3.라우터 페이지 만들기>4.export하기
export default videoRouter;