
//1.라우터 쓰기 > 2.라우터 만들기 >3.라우터 첫페이지 만들기-컨트롤러(o)
export const trending = (req,res) => res.render("home");
export const see = (req,res) => res.render("watch");
export const edit = (req,res) => res.render("edit");
export const search = (req,res) => res.send("Search");
export const upload = (req,res) => res.send("Upload");
export const deleteVideo = (req,res) => {
    console.log(req.params);
    return res.send("Delete Video");
}