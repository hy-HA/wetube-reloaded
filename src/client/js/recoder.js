const startBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");

let stream;

//버튼이 하나만 있기 때문에 이벤트 리스너를 삭제&생성하는 것. 
const handleStop = () => {
    startBtn.innerText = "Start Recording";
    startBtn.removeEventListener("click", handleStop);
    startBtn.addEventListener("click", handleStart);
    
};

const handleStart = () => {
    startBtn.innerText = "Stop Recording";
    startBtn.removeEventListener("click", handleStart);
    startBtn.addEventListener("click", handleStop);
    const recoder = new MediaRecorder(stream);
    recoder.ondataavailable = (e) => {
        console.log("recording done")
        console.log(e);
        console.log(e.data);
    }
    console.log(recoder);
    recoder.start(); // 녹화 시작
    console.log(recoder);
    setTimeout(()=> {
        recoder.stop();
    }, 10000); 
    //10초 후 녹화 종료 시 dataavailable 이벤트가 발생.
    //그 이벤트를 잡으려면 ondataavailable이라는 handler 사용. 
};

const init = async () => {
    // let인 stream을 업데이트.
    stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
    });
    //console.log(stream);
    video.srcObject = stream;
    video.play();
}
init();

startBtn.addEventListener("click", handleStart);