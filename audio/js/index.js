async function getMedia(constraints) {
  let stream = null;
  

  try {
    const audioContext = new AudioContext();
    stream = await navigator.mediaDevices.getUserMedia(constraints);
    const mediaStreamAudioSourceNode = audioContext.createMediaStreamSource(stream)
    const destinationNode = audioContext.createMediaStreamDestination()
    console.log(audioContext.destination)
    
    
    console.log("helloworld")    
    const handles = await window.showSaveFilePicker();
    const createWritable = await handles.createWritable();
  
    const rec = new MediaRecorder(stream);
    const chunks = [];


    rec.ondataavailable = (e) => {
      createWritable.write(e.data)
      console.log(e);
    };
    rec.onstop = () => createWritable.close()

    rec.start(1000);

    setTimeout(() => {
      rec.stop();
    }, 5000)

  } catch(err) {
    /* 오류 처리 */
    console.log(err)
  }
}

getMedia({ audio: true })
