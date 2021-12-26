const recordButton = document.querySelector("#record");
const stopButton = document.querySelector("#stop");
const message = document.querySelector("#message");
let hanldes
let rec

recordButton.addEventListener("click", () => getMedia({ audio: true }))
stopButton.addEventListener("click", () => stopRecording())

async function stopRecording() {
  rec.stop();
  message.textContent = "녹음 종료"
}

async function getMedia(constraints) {
  let stream = null;
  handles = await window.showSaveFilePicker();
  console.log("test")

  try {
    stream = await navigator.mediaDevices.getUserMedia(constraints);
    
    const createWritable = await handles.createWritable();   
  
    rec = new MediaRecorder(stream);

    rec.ondataavailable = (e) => {      
      e.data.type = 'audio/ogg codecs=opus'
      createWritable.write(e.data)
    };
    rec.onstop = () => {
      createWritable.close()
      console.log(stream);
    }

    rec.start(1000);
    message.textContent = "녹음 중"

  } catch(err) {
    /* 오류 처리 */
    console.log(err)
  }

}


