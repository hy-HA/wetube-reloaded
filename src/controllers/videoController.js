import req from "express/lib/request";
import User from "../models/User";
import Video from "../models/Video";
import apiRouter from "../routers/apiRouter";

/*콜백 방식
Video.find({},(error, videos) => {
    if(error){
        return res.render("server-error")
    }
    return res.render("home", { pageTitle: "Home", videos });
});
*/

//1.라우터 쓰기 > 2.라우터 만들기 >3.라우터 첫페이지 만들기-컨트롤러(o)
//promise 방식
export const home = async(req,res) => {    
    const videos = await Video.find({})
        .sort({ createdAt:"desc"})
        .populate("owner");
    //console.log(videos);
    return res.render("home", {pageTitle : "Home", videos});
};

export const watch = async (req,res) => {
    const id = req.params.id;
    const video = await Video.findById(id).populate("owner");
    console.log(video);
    //const owner = await User.findById(video.owner)
    if (!video){
        return res.status(404).render("404", {pageTitle: "Video not found."});
    }
    return res.render("watch", {pageTitle : video.title, video });    
};

export const getEdit = async (req,res) => {
    const id = req.params.id;
    const {
        user: {_id},
    } = req.session;
    const video = await Video.findById(id);
    if (!video){
        return res.render("404", {pageTitle: "Video not found."});
    }
    console.log(typeof video.owner, typeof _id);
    if (String(video.owner) !== String(_id)) {
        return res.status(403).redirect("/");
    }
    res.render("edit", {pageTitle : `Edit ${video.title}`, video});
};

export const postEdit = async (req,res) => {
    const {id} = req.params;
    const {
        user: {_id},
    } = req.session;
    //request.body에서 타이틀,설명,해시태그 가져오기
    const {title,description,hashtags} = req.body;
    const video = await Video.exists({ _id: id });
    if (!video){
        return res.render("404", {pageTitle: "Video not found."});
    }
    if (String(video.owner) !== String(_id)) {
        return res.status(403).redirect("/");
    }
    //console.log(req.body);
    await Video.findByIdAndUpdate(id, {
        title, description, hashtags: Video.formatHashtags(hashtags),
    });
    return res.redirect(`/videos/${id}`);
};

export const getUpload = (req,res) => {
    return res.render("upload", {pageTitle : "Upload Video"});
};
export const postUpload = async (req,res) => {
    //console.log(req.body);
    const { 
        user: {_id},
    } = req.session;
    const {path: fileUrl} = req.file;  //브라우저에서 업로드한 파일(의 경로)을 받기_multer는 req.file을 제공.
    const {title,description,hashtags} = req.body;
    try {
        const newVideo = await Video.create({
            title: title,
            description: description,
            fileUrl,  //브라우저에서 업로드한 파일을 받아서 경로를 설정. 
            owner: _id, 
            hashtags:Video.formatHashtags(hashtags),
        });
        const user = await User.findById(_id);
        user.videos.push(newVideo._id);
        user.save();
        return res.redirect("/");
    } catch (error) {
        //console.log(error);
        return res.status(400).render("upload", {
            pageTitle : "Upload Video",
            errorMessage: error._message,
        });
    }
};

export const deleteVideo = async (req,res) => {
    const { id } = req.params;
    const {
        user: {_id},
    } = req.session;
    const video = await Video.findById(id);
    if (!video){
        return res.render("404", {pageTitle: "Video not found."});
    }
    if (String(video.owner) !== String(_id)) {
        return res.status(403).redirect("/");
    }
    await Video.findByIdAndDelete(id);
    return res.redirect("/");
};

export const search = async (req,res) => {
    //console.log(req.query);
    const { keyword } = req.query;
    let videos =[];
    if (keyword) {
        videos = await Video.find({
            title: {
                $regex: new RegExp(keyword, "i"),
            },
        }).populate("owner");
    }
    return res.render("search", {pageTitle: "Search", videos});
};

export const registerView = async (req,res) => {
    const {id} = req.params;
    const video = await Video.findById(id);
    if (!video) {
        return res.sendStatus(404);
    }
    video.meta.views = video.meta.views + 1;
    await video.save();
    return res.sendStatus(200);
};