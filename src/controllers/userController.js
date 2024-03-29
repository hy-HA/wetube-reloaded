import Video from "../models/Video";
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
    const user = await User.findOne({ username, socialOnly:false });
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
    const tokenRequest = await (
        await fetch(finalUrl, {
        method: "POST",
        headers: {
            Accept: "application/json",
        },
    })).json();  //await 안에 await
    if ("access_token" in tokenRequest) {
        const {access_token} = tokenRequest; //access토큰을 JSON으로부터 꺼집어내기
        const apiUrl = "https://api.github.com";
        const userData = await (
            // fetch 요청
            await fetch(`${apiUrl}/user`, {
                headers: {  //헤더에 authorization보내기
                    Authorization: `token ${access_token}`,
                },
            })
        //fetch가 돌아오면 해당 fetch의 JSON을 받음. 
        ).json();
        //console.log(userData);
        const emailData = await ( 
            await fetch(`${apiUrl}/user/emails`, {
                headers: {
                    Authorization: `token ${access_token}`,
                },
            })
        ).json();
        const emailObj = emailData.find(
            (email) => email.primary === true && email.verified ===true
        );
        if (!emailObj) {
            return res.redirect("/login");
        }
        let user = await User.findOne({ email: emailObj.email });
        if (!user) {
            user = await User.create({
                avatarUrl: userData.avatar_url,
                name:userData.name? userData.name:"Unknown",
                username:userData.login,
                email:emailObj.email,
                password:"",
                socialOnly: true,
                location:userData.location,
                });
            }            
            req.session.loggedIn = true;
            req.session.user = user;
            return res.redirect("/");
    } else {
        return res.redirect("/login"); 
        // 나중에 notification을 보내면서 redirect하도록 수정예정
    }
};

export const search = (req,res) => res.send("Search");

export const logout = (req,res) => {
    req.session.destroy();
    return res.redirect("/");
};

export const getEdit = (req,res) => {
    return res.render("edit-profile", { pageTitle: "Edit Profile" });
};

export const postEdit = async (req,res) => {
    //const id = req.session.user.id;
    //const { name, email, username, location} = req.body;
    const {
        session: {
            user: { _id, avatarUrl },
        },
        body: {name, email, username, location},
        file,
    } = req;
    const updatedUser = await User.findByIdAndUpdate(_id, 
        {
        avatarUrl: file ? file.path : avatarUrl,
        name,
        email,
        username,
        location,
        },
        {new: true}
    );
    req.session.user = updatedUser;
    return res.render("edit-profile");
};

export const getChangePassword = (req,res) => {
    if (req.session.user.socialOnly === true) {
        return res.redirect("/");
    }
    return res.render("users/change-password", {pageTitle: "Change Password"});
};

export const postChangePassword = async (req,res) => {
    const {
        session: {
            user: { _id },
        },
        body: {oldPassword, newPassword, newPasswordConfirmation},
    } = req;
    const user = await User.findById(_id);
    const ok = await bcrypt.compare(oldPassword, user.password);
    if (!ok) {
        return res.status(400).render("users/change-password", {
            pageTitle: "Change Password",
            errorMessage: "The current password is incorrect",
        });
    }
    if (newPassword !== newPasswordConfirmation) {
        return res.status(400).render("users/change-password", {
            pageTitle: "Change Password",
            errorMessage: "The password does not match the confirmation",
        });
    }
    //console.log("Old password", user.password);
    user.password = newPassword;
    //console.log("New unhashed pw", user.password);
    await user.save();
    //console.log("new pw", user.password);
    return res.redirect("/users/logout");
};

export const see = async (req,res) => {
    const {id} = req.params;
    const user = await User.findById(id).populate({
        path: "videos",
        populate: {
          path: "owner",
          model: "User",
        },
      });
    //console.log(user);
    if(!user) {
        return res.status(404).render("404", {pageTitle:"User not found"});
    }
    //const videos = await Video.find({owner: user._id});
    //console.log(videos);
    return res.render("users/profile", { 
        pageTitle: `${user.name}`, 
        user,
        //videos,
    });
}