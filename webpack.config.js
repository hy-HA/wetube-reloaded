//path import
//const path = require("path");
//js폴더까지 찾아짐
//console.log(path.resolve(__dirname,"assets","js"));
//wetube폴더까지 찾아짐
//console.log(__dirname);

module.export = {
    //파일의 경로를 입력
    entry : "./src/client/js/main.js",
    output : {
        //파일 이름 지정
        filename: "main.js",
        //파일이 저장될 위치 지정(절대경로로 지정해야함)
        path: path.resolve(__dirname, "assets", "js"),
    },
};