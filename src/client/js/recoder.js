import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
corePath: "https://unpkg.com/@ffmpeg/core@0.8.5/dist/ffmpeg-core.js"

const actionBtn = document.getElementById("actionBtn");
const video = document.getElementById("preview");

let stream;
let recoder;
let videoFile;

const files = {
    input: "recording.webm",
    output: "output.mp4",
    thumb: "thumbnail.jpg",
}

const downloadFile = (fileUrl, fileName) => {
    const a = document.createElement("a");
    a.href = fileUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
}

const handleDownload = async () => {
    actionBtn.removeEventListener("click", handleDownload);
    actionBtn.innerText = "Transcoding...";
    actionBtn.disabled = true;
    //1단계 
    const ffmpeg = createFFmpeg({log: true});
    await ffmpeg.load();
    //2단계 : ffmpeg에 파일 만들기
    ffmpeg.FS("writeFile", files.input, await fetchFile(videoFile));
    await ffmpeg.run("-i", files.input, "-r", "60", files.output); 

    await ffmpeg.run("-i", files.input, "-ss", "00:00:01", "-frames:v", "1", files.thumb); 

    const mp4File = ffmpeg.FS("readFile", files.output);
    //console.log(mp4File);
    //console.log(mp4File.buffer);
    const thumbFile = ffmpeg.FS("readFile", files.thumb);

    const mp4Blob = new Blob([mp4File.buffer], {type: "video/mp4"});
    const thumbBlob = new Blob([thumbFile.buffer], {type: "image/jpg"});

    const mp4Url = URL.createObjectURL(mp4Blob);
    const thumbUrl = URL.createObjectURL(thumbBlob);

    downloadFile(mp4Url,"MyRecording.mp4");
    downloadFile(thumbUrl,"MyThumbnail.jpg");


    ffmpeg.FS("unlink", files.input);
    ffmpeg.FS("unlink", files.output);
    ffmpeg.FS("unlink", files.thumb);

    URL.revokeObjectURL(mp4Url);
    URL.revokeObjectURL(thumbUrl);
    URL.revokeObjectURL(videoFile);

    actionBtn.disabled = false;
    actionBtn.innerText = "Record Again";
    actionBtn.addEventListener("click", handleStart);
};

//const handleStop = () => {
//    actionBtn.innerText = "Download Recording";
//    actionBtn.removeEventListener("click", handleStop);
//    actionBtn.addEventListener("click", handleDownload);
//    recoder.stop();
//};

const handleStart = () => {
    //actionBtn.innerText = "Stop Recording";
    actionBtn.innerText = "Recording";
    actionBtn.disabled = true;
    actionBtn.removeEventListener("click", handleStart);
    //actionBtn.addEventListener("click", handleStop);
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
        actionBtn.innerText = "Download";
        actionBtn.disabled = false;
        actionBtn.addEventListener("click",handleDownload);
    };
    //console.log(recoder);
    recoder.start(); // 녹화 시작
    //console.log(recoder);
    //setTimeout(()=> {
    //    recoder.stop();
    //}, 10000); 
    //10초 후 녹화 종료 시 dataavailable 이벤트가 발생.
    //그 이벤트를 잡으려면 ondataavailable이라는 handler 사용. 
    setTimeout(()=>{
        recoder.stop();
    }, 5000);
};

const init = async () => {
    // let인 stream을 업데이트.
    stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            width: 1024,
            height: 576,
        },
    });
    //console.log(stream);
    video.srcObject = stream;
    video.play();
}
init();

actionBtn.addEventListener("click", handleStart);