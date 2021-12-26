
//1.라우터 쓰기 > 2.라우터 만들기 >3.라우터 첫페이지 만들기-컨트롤러(o)
export const trending = (req,res) => res.send("Home Page Videos");
export const see = (req,res) => {
    console.log(req.params);
    return res.send(`Watch Video #${req.params.id}`);
}
export const edit = (req,res) => {
    console.log(req.params);
    return res.send("Edit");
}
export const search = (req,res) => res.send("Search");
export const upload = (req,res) => res.send("Upload");
export const deleteVideo = (req,res) => {
    console.log(req.params);
    return res.send("Delete Video");
}