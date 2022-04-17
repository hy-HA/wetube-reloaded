import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
corePath: "https://unpkg.com/@ffmpeg/core@0.8.5/dist/ffmpeg-core.js"

const startBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");

let stream;
let recoder;
let videoFile;

const handleDownload = async () => {
    //1단계 
    const ffmpeg = createFFmpeg({log: true});
    await ffmpeg.load();
    //2단계 : ffmpeg에 파일 만들기
    ffmpeg.FS("writeFile", "recording.webm", await fetchFile(videoFile));
    await ffmpeg.run("-i", "recording.webm", "-r", "60", "output.mp4"); 

    await ffmpeg.run("-i", "recording.webm", "-ss", "00:00:01", "-frames:v", "1", "thumbnail.jpg"); 

    const mp4File = ffmpeg.FS("readFile", "output.mp4");
    //console.log(mp4File);
    //console.log(mp4File.buffer);
    const thumbFile = ffmpeg.FS("readFile", "thumbnail.jpg");

    const mp4Blob = new Blob([mp4File.buffer], {type: "video/mp4"});
    const thumbBlob = new Blob([thumbFile.buffer], {type: "image/jpg"});

    const mp4Url = URL.createObjectURL(mp4Blob);
    const thumbUrl = URL.createObjectURL(thumbBlob);

    const a = document.createElement("a");
    //a.href = videoFile;
    a.href = mp4Url;
    a.download = "MyRecording.mp4";
    document.body.appendChild(a);
    a.click();

    const thumbA = document.createElement("a");
    thumbA.href = thumbUrl;
    thumbA.download = "MyThumbnail.jpg";
    document.body.appendChild(thumbA);
    thumbA.click();

    ffmpeg.FS("unlink", "recording.webm");
    ffmpeg.FS("unlink", "output.mp4");
    ffmpeg.FS("unlink", "thumbnail.jpg");

    URL.revokeObjectURL(mp4Url);
    URL.revokeObjectURL(thumbUrl);
    URL.revokeObjectURL(videoFile);
};

const handleStop = () => {
    startBtn.innerText = "Download Recording";
    startBtn.removeEventListener("click", handleStop);
    startBtn.addEventListener("click", handleDownload);
    recoder.stop();
};

const handleStart = () => {
    startBtn.innerText = "Stop Recording";
    startBtn.removeEventListener("click", handleStart);
    startBtn.addEventListener("click", handleStop);
    recoder = new MediaRecorder(stream, {mimeType: "video/webm"});
    recoder.ondataavailable = (event) => {
        videoFile = URL.createObjectURL(event.data);
        //console.log(videoFile); //파일을 가리키고 있는 URL이 출력. URL이 어떻게 생겼는지 확인 가능.
        video.srcObject = null;
        video.src = videoFile;
        video.loop = true;
        video.play();
        //console.log("recording done")
        //console.log(e);
        //console.log(event.data); //녹화된 비디오는 event.data에 있음. 
    }
    //console.log(recoder);
    recoder.start(); // 녹화 시작
    //console.log(recoder);
    //setTimeout(()=> {
    //    recoder.stop();
    //}, 10000); 
    //10초 후 녹화 종료 시 dataavailable 이벤트가 발생.
    //그 이벤트를 잡으려면 ondataavailable이라는 handler 사용. 
};

const init = async () => {
    // let인 stream을 업데이트.
    stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: true,
    });
    //console.log(stream);
    video.srcObject = stream;
    video.play();
}
init();

startBtn.addEventListener("click", handleStart);