
//가짜 유저 만들기
//const fakeUser = {
//    username: "Nicolas",
//    loggedIn: true,
//};


//1.라우터 쓰기 > 2.라우터 만들기 >3.라우터 첫페이지 만들기-컨트롤러(o)
export const trending = (req,res) => {
    //가짜 비디오의 배열 만들기
    const videos = [
        {
            title: "First Video",
            rating: 5,
            comments: 2,
            createdAt: "2 minutes ago",
            views: 59,
            id:1,
        },
        {
            title: "Second Video",
            rating: 5,
            comments: 2,
            createdAt: "2 minutes ago",
            views: 59,
            id:1,
        },
        {
            title: "Third Video",
            rating: 5,
            comments: 2,
            createdAt: "2 minutes ago",
            views: 59,
            id:1,
        },

    ]
    return res.render("home", {pageTitle : "home", videos});
};
export const see = (req,res) => res.render("watch", {pageTitle : "watch"});
export const edit = (req,res) => res.render("edit", {pageTitle : "edit"});
export const search = (req,res) => res.send("Search");
export const upload = (req,res) => res.send("Upload");
export const deleteVideo = (req,res) => {
    console.log(req.params);
    return res.send("Delete Video");
};