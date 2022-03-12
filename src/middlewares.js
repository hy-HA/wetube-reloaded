export const localsMiddleware = (req, res, next) => {
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.sitename="Wetube";
    res.locals.loggedInUser = req.session.user || {};
    //console.log(res.locals);
    console.log(req.session.user);
    next();
}

//유저가 로그인되어있지 않은 경우, 로그인페이지로 redirect
//유저는 req에서 찾을 수 있음
//loggedIn은 유저가 로그인할 때 session에 저장되는 정보. 
//session에 저장되는 정보이기 때문에 어느 컨트롤러,미들웨어에서 사용 가능. 
export const protectorMiddleware = (req, res, next) => {
    if(req.session.loggedIn) {
        next();
    } else {
        return res.redirect("/login");
    }

}

//로그인 안되어있는 유저만 접근할 수 있는 미들웨어.
//로그인 된 사람은 로그인페이지를 보면 안됨. 
export const publicOnlyMiddleware = (req, res, next) => {
    if(!req.session.loggedIn){
        return next();
    } else {
        return res.redirect("/");
    }
}
