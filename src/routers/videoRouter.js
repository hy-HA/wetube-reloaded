import express from "express";
import { see, upload, edit, deleteVideo } from "../controllers/videoController";

//1.라우터 쓰기 > 2.라우터 만들기(o) >3.라우터 페이지 만들기
const videoRouter = express.Router();


//1.라우터 쓰기 > 2.라우터 만들기 >3.라우터 페이지 만들기-라우터(o)
videoRouter.get("/upload", upload);
videoRouter.get("/:id(\\d+)",see);
videoRouter.get("/:id(\\d+)/edit", edit);
videoRouter.get("/:id(\\d+)/delete", deleteVideo);

//1.라우터 쓰기 > 2.라우터 만들기(o) >3.라우터 페이지 만들기>4.export하기
export default videoRouter;