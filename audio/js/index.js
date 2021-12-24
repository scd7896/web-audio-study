async function getMedia(constraints) {
  let stream = null;

  try {
    stream = await navigator.mediaDevices.getUserMedia(constraints);
    const handles = await window.showSaveFilePicker();
    const createWritable = await handles.createWritable();   
  
    const rec = new MediaRecorder(stream);

    rec.ondataavailable = (e) => {      
      e.data.type = 'audio/ogg codecs=opus'
      createWritable.write(e.data)
    };
    rec.onstop = () => createWritable.close()

    rec.start(1000);

    setTimeout(() => {
      rec.stop();
    }, 10 * 1000)

  } catch(err) {
    /* 오류 처리 */
    console.log(err)
  }

}

getMedia({ audio: true })
