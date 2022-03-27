//path import
const path = require("path");

//js폴더까지 찾아짐
//console.log(path.resolve(__dirname,"assets","js"));

//wetube폴더까지 찾아짐
//console.log(__dirname);

module.exports = {
    //파일의 경로를 입력
    entry : "./src/client/js/main.js",
    mode: 'development',
    output : {
        //파일 이름 지정
        filename: "main.js",
        //파일이 저장될 위치 지정(절대경로로 지정해야함)
        path: path.resolve(__dirname, "assets", "js"),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [["@babel/preset-env", {targets: "defaults"}]],
                    },
                },
            },
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            }
        ],
    },
    
};