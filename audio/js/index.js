import { createFFmpeg, fetchFile, createFFmpegCore } from '@ffmpeg/ffmpeg';

async function getMedia(constraints) {
  let stream = null;
  const ffmpeg = createFFmpeg({ log: true });

  try {
    stream = await navigator.mediaDevices.getUserMedia(constraints);
    await ffmpeg.load(); 
    const audioTag = document.createElement("audio");

    audioTag.srcObject = stream;
    audioTag.play();
    console.dir(audioTag)
    console.log("helloworld")
    // const audioNode = new MediaStreamAudioDestinationNode(stream.audioNode)
    // const handles = await window.showSaveFilePicker();
    // const createWritable = await handles.createWritable();
    // const blob = new Blob([], { type: "audio/mpeg-3" })
    
    // await createWritable.write(blob);
    // await createWritable.write(1);
    // await createWritable.close()
    
    const rec = new MediaRecorder(audioTag.srcObject);
    const chunks = [];

    console.log(rec)

    rec.ondataavailable = (e) => console.log("testtt");
    rec.start(1000);

    // const audioCtx = new AudioContext();
    // const source = audioCtx.createMediaStreamSource(stream)
    // const analyser = audioCtx.createAnalyser();
    // analyser.fftSize = 2048;
    // const floatData = new Float32Array(analyser.frequencyBinCount);
    
    
    // source.connect(analyser);

    // var canvas = document.getElementById("oscilloscope");
    // var canvasCtx = canvas.getContext("2d");

    // // 현재 오디오 소스의 오실로스코프를 그립니다

    // function draw() {
    //   analyser.getFloatFrequencyData(floatData);
    //   requestAnimationFrame(draw)
    //   console.log(floatData)
    // }
    
    // draw();
  } catch(err) {
    /* 오류 처리 */
    console.log(err)
  }
}

getMedia({ audio: true })

// const getVedio = () => {
  
//   const ffmpeg = createFFmpeg({ log: true });

//   const webcam = document.getElementById('webcam');
//   const recordBtn = document.getElementById('record');
//   const startRecording = () => {
//     const rec = new MediaRecorder(webcam.srcObject);
//     const chunks = [];
    
//     recordBtn.textContent = 'Stop Recording';
//     recordBtn.onclick = () => {
//       rec.stop();
//       recordBtn.textContent = 'Start Recording';
//       recordBtn.onclick = startRecording;
//     }

//     rec.ondataavailable = e => chunks.push(e.data);
//     rec.onstop = async () => {
//       transcode(new Uint8Array(await (new Blob(chunks)).arrayBuffer()));
//     };
//     rec.start();
//   };

//   (async () => {
//     webcam.srcObject = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//     await webcam.play();
//     recordBtn.disabled = false;
//     recordBtn.onclick = startRecording;
//   })();

//   const transcode = async (webcamData) => {
//     const message = document.getElementById('message');
//     const name = 'record.webm';
//     message.innerHTML = 'Loading ffmpeg-core.js';
//     await ffmpeg.load();
//     message.innerHTML = 'Start transcoding';
//     ffmpeg.FS('writeFile', name, await fetchFile(webcamData));
//     await ffmpeg.run('-i', name,  'output.mp4');
//     message.innerHTML = 'Complete transcoding';
//     const data = ffmpeg.FS('readFile', 'output.mp4');

//     const video = document.getElementById('output-video');
//     console.log(data.buffer)
//     video.src = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));
//   }
// }

// getVedio();