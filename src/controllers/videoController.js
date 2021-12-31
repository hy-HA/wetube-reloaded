
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
    return res.render("watch",{pageTitle : `Watching : ${video.title}`, video:video });
};

export const getEdit = (req,res) => {
    const id = req.params.id;
    const video = videos[id -1];
    res.render("edit", {pageTitle : `Editing : ${video.title}`, video});
};
export const postEdit = (req,res) => {}
