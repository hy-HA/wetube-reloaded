//1.라우터 쓰기 > 2.라우터 만들기 >3.라우터 첫페이지 만들기-컨트롤러(o)
import User from "../models/User";
import fetch from "node-fetch";
import bcrypt from "bcrypt";

export const getJoin = (req,res) => res.render("join", {pageTitle: "Join"});
export const postJoin = async (req,res) => {
    const { name, username, email, password, password2, location } = req.body;
    const pageTitle = "Join";
    if(password !== password2) {
        return res.status(400).render("join", {
            pageTitle,
            errorMessage : "Password confirmation does not match",
        });
    }
    const exists = await User.exists({ $or: [{ username }, { email }] });
    if (exists) {
        return res.status(400).render("join", {
            pageTitle,
            errorMessage : "This username/email is already taken",
        });
    }

    try {
        await User.create({
            name,
            username,
            email,
            password,
            location,
        });
        return res.redirect("/login");
    } catch (error) {
        return res.status(400).render("join", {
            pageTitle : "Upload Video",
            errorMessage: error._message,
        });
    }
};
export const getlogin = (req,res) => 
    res.render("login", { pageTitle : "Login" });

export const postlogin = async (req,res) => {
    const {username, password} = req.body;
    const pageTitle = "Login";
    const user = await User.findOne({ username });
    if (!user) {
        return res
            .status(400)
            .render("login", {
                pageTitle,
                errorMessage: "An account with this username does not exists."
            });
    }
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
        return res
            .status(400)
            .render("login", {
                pageTitle,
                errorMessage: "Wrong password.",
            });
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
};

export const startGithubLogin = (req, res) => {
    const baseUrl = "https://github.com/login/oauth/authorize";
    const config = {
        client_id: process.env.GH_CLIENT,
        allow_signup: false,
        scope: "read:user user:email",
    };
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    return res.redirect(finalUrl);
}

export const finishGithubLogin = async (req, res) => {
    const baseUrl = "https://github.com/login/oauth/access_token";
    const config = {
        client_id: process.env.GH_CLIENT,
        client_secret: process.env.GH_SECRET,
        code: req.query.code,
    };
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    const tokenReQuest = await (await fetch(finalUrl, {
        method: "POST",
        headers: {
            Accept: "application/json",
        },
    })).json();  //await 안에 await
    if ("access_token" in tokenReQuest) {
        const {access_token} = tokenReQuest; //access토큰을 JSON으로부터 꺼집어내기
        const userRequest = await (
            // fetch 요청
            await fetch("https://api.github.com/user", {
                headers: {  //헤더에 authorization보내기
                Authorization: `token ${access_token}`
                },
            })
        //fetch가 돌아오면 해당 fetch의 JSON을 받음. 
        ).json();
        console.log(userRequest);
    } else {
        return res.redirect("/login"); 
        // 나중에 notification을 보내면서 redirect하도록 수정예정
    }
};

export const edit = (req,res) => res.send("Edit User");
export const remove = (req,res) => res.send("Remove User");
export const search = (req,res) => res.send("Search");
export const logout = (req,res) => res.send("Log out");
export const see = (req,res) => res.send("See User");