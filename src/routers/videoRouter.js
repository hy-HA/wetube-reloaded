import express from "express";
import { watch, getEdit, postEdit, getUpload, postUpload,deleteVideo} from "../controllers/videoController";
import { protectorMiddleware, videoUpload } from "../middlewares";

//1.라우터 쓰기 > 2.라우터 만들기(o) >3.라우터 페이지 만들기
const videoRouter = express.Router();


//1.라우터 쓰기 > 2.라우터 만들기 >3.라우터 페이지 만들기-라우터(o)
videoRouter.get("/:id([0-9a-f]{24})", watch);
//videoRouter.route("/:id(\\d+)").get(watch); > 보통 2개 이상의 method를 사용할 때 route를 씀.
//videoRouter.get("/:id(\\d+)/edit", getEdit);
//videoRouter.post("/:id(\\d+)/edit", postEdit);
videoRouter.route("/:id([0-9a-f]{24})/edit").all(protectorMiddleware).get(getEdit).post(postEdit);
videoRouter.route("/:id([0-9a-f]{24})/delete").all(protectorMiddleware).get(deleteVideo);
videoRouter
    .route("/upload")
    .all(protectorMiddleware)
    .get(getUpload)
    .post(videoUpload.fields([
        {name: "video", maxCount: 1}, 
        {name: "thumb", maxCount: 1},
    ]), postUpload);

//1.라우터 쓰기 > 2.라우터 만들기(o) >3.라우터 페이지 만들기>4.export하기
export default videoRouter;