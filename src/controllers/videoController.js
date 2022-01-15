import Video from "../models/Video"

//1.라우터 쓰기 > 2.라우터 만들기 >3.라우터 첫페이지 만들기-컨트롤러(o)
export const home = (req,res) => {
    Video.find({},);
    return res.render("home", {pageTitle : "home"});
};

export const watch = (req,res) => {
    const id = req.params.id;
    console.log("show video", id);
    return res.render("watch", {pageTitle : `Watching`});
};

export const getEdit = (req,res) => {
    const id = req.params.id;
    res.render("edit", {pageTitle : `Editing`});
};
export const postEdit = (req,res) => {
    const {id} = req.params;
    const{title} = req.body;
    //console.log(req.body);
    return res.redirect(`/videos/${id}`);
};
export const getUpload = (req,res) => {
    return res.render("upload", {pageTitle : "Upload Video"});
};
export const postUpload = (req,res) => {
    //console.log(req.body);
    //here we will add a video to the videos array.
    const {title} = req.body;
    videos.push(newVideo);
    return res.redirect("/");
};