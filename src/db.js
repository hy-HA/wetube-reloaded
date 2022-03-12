import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;
const handleOpen = () => console.log("Connected to DB☞☞");
const handleError = (error) => console.log("DB Error",error);

//db가 열릴때, 에러가 발생할 때 콘솔로그 해주기. 
db.on("error", handleError);
db.once("open",handleOpen);