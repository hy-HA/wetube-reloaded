const MiniCssExtractPlugin = require("mini-css-extract-plugin");

//path import
const path = require("path");

//js폴더까지 찾아짐
//console.log(path.resolve(__dirname,"assets","js"));

//wetube폴더까지 찾아짐
//console.log(__dirname);

module.exports = {
    //파일의 경로를 입력
    entry : {
        main: "./src/client/js/main.js",
        videoPlayer: "./src/client/js/videoPlayer.js",
        recoder: "./src/client/js/recoder.js",
    },
    mode: 'development',
    watch: true,
    plugins: [new MiniCssExtractPlugin({
        filename: "css/styles.css",
    })], 
    output : {
        //파일 이름 지정
        filename: "js/[name].js",
        //파일이 저장될 위치 지정(절대경로로 지정해야함)
        path: path.resolve(__dirname, "assets"),
        clean: true,
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
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            }
        ],
    },
    
};