import Video from "../models/Video"

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
    const videos = await Video.find({});
    console.log(videos);
    return res.render("home", {pageTitle : "Home", videos});
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
export const postUpload = async (req,res) => {
    //console.log(req.body);
    //here we will add a video to the videos array.
    const {title,descripton,hashtags} = req.body;
    await Video.create({
        title: title,
        descripton: descripton,
        createdAt: Date.now(),
        hashtags: hashtags.split(",").map((word)=> `#${word}`),
        meta: {
            views: 0,
            rating: 0,
        },
    });
    return res.redirect("/");
};