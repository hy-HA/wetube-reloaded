//1.라우터 쓰기 > 2.라우터 만들기 >3.라우터 첫페이지 만들기-컨트롤러(o)
export const login = (req,res) => res.send("Login");
export const getJoin = (req,res) => res.render("join", {pageTitle: "Join"});
export const postJoin = (req,res) => {
    console.log(req.body);
    res.end();
}
export const edit = (req,res) => res.send("Edit User");
export const remove = (req,res) => res.send("Remove User");
export const search = (req,res) => res.send("Search");
export const logout = (req,res) => res.send("Log out");
export const see = (req,res) => res.send("See User");