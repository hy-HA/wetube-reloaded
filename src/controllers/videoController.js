
//가짜 유저 만들기
//const fakeUser = {
//    username: "Nicolas",
//    loggedIn: true,
//};

 //가짜 비디오의 배열 만들기
 let videos = [
    {
        title: "First Video",
        rating: 5,
        comments: 2,
        createdAt: "2 minutes ago",
        views: 1,
        id:1,
    },
    {
        title: "Second Video",
        rating: 5,
        comments: 2,
        createdAt: "2 minutes ago",
        views: 59,
        id:2,
    },
    {
        title: "Third Video",
        rating: 5,
        comments: 2,
        createdAt: "2 minutes ago",
        views: 59,
        id:3,
    },

]

//1.라우터 쓰기 > 2.라우터 만들기 >3.라우터 첫페이지 만들기-컨트롤러(o)
export const trending = (req,res) => {
    return res.render("home", {pageTitle : "home", videos});
};

export const watch = (req,res) => {
    const id = req.params.id;
    const video = videos[id -1];
    console.log("show video", id);
    return res.render("watch", {pageTitle : `Watching : ${video.title}`, video:video });
};

export const getEdit = (req,res) => {
    const id = req.params.id;
    const video = videos[id -1];
    res.render("edit", {pageTitle : `Editing : ${video.title}`, video});
};
export const postEdit = (req,res) => {
    const {id} = req.params;
    const{title} = req.body;
    //console.log(req.body);
    videos[id-1].title = title;
    return res.redirect(`/videos/${id}`);
};
export const getUpload = (req,res) => {
    return res.render("upload", {pageTitle : "Upload Video"});
};
export const postUpload = (req,res) => {
    //console.log(req.body);
    //here we will add a video to the videos array.
    const {title} = req.body;
    const newVideo = {
        title,
        rating: 0,
        comments: 0,
        createdAt: "just now",
        views: 0,
        id: videos.length + 1,
    };
    videos.push(newVideo);
    return res.redirect("/");
};