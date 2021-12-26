import express from "express";
import { see, edit, trending } from "../controllers/videoController";

//1.라우터 쓰기 > 2.라우터 만들기(o) >3.라우터 페이지 만들기
const videoRouter = express.Router();


//1.라우터 쓰기 > 2.라우터 만들기 >3.라우터 페이지 만들기-라우터(o)
videoRouter.get("/upload", upload);
videoRouter.get("/:id",see);
videoRouter.get("/:id/edit", edit);
videoRouter.get("/:id/delete", deleteVideo);

//1.라우터 쓰기 > 2.라우터 만들기(o) >3.라우터 페이지 만들기>4.expoert하기
export default videoRouter;