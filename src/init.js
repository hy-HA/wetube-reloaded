import "dotenv/config";
import "./db";
import "./models/Video";
import "./models/User";
import app from "./server";

const PORT = 4000;

const handleListening = () => 
    console.log(`Server listening on port http://localhost:${PORT} ☞☞`);

app.listen(PORT, handleListening);
//위 두줄을 합칠 수도 있음. 
//app.listen(4000, () => console.log("Server listening on port 4000 ☞☞"));