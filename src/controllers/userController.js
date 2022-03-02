//1.라우터 쓰기 > 2.라우터 만들기 >3.라우터 첫페이지 만들기-컨트롤러(o)
import User from "../models/User";

export const getJoin = (req,res) => res.render("join", {pageTitle: "Join"});
export const postJoin = async (req,res) => {
    const { name, username, email, password, password2, location } = req.body;
    const pageTitle = "Join";
    if(password !== password2) {
        return res.render("join", {
            pageTitle,
            errorMessage : "Password confirmation does not match",
        });
    }
    const exists = await User.exists({ $or: [{ username }, { email }] });
    if (usernameExists) {
        return res.render("join", {
            pageTitle,
            errorMessage : "This username/email is already taken",
        });
    }
    const emailExists = await User.exists({email});
    await User.create({
        name,
        username,
        email,
        password,
        location,
    });
    return res.redirect("/login");
};
export const edit = (req,res) => res.send("Edit User");
export const remove = (req,res) => res.send("Remove User");
export const search = (req,res) => res.send("Search");
export const login = (req,res) => res.send("Login");
export const logout = (req,res) => res.send("Log out");
export const see = (req,res) => res.send("See User");