export function microphoneLevels(startStop) {
  const audioContext = new AudioContext();
  const microphoneFeedback = document.querySelector(".microphoneFeedback");
  const microphoneUX = document.querySelector(".microphoneUX");
  console.log(audioContext);

  if (startStop === 'stop') {
    microphoneFeedback.classList.remove('listening');
    microphoneUX.classList.remove('listening');
    audioContext.close();
  } else {
    navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia;

    if (navigator.getUserMedia) {
      navigator.getUserMedia({ audio: true }, (stream) => {
        const analyser = audioContext.createAnalyser();
        const microphone = audioContext.createMediaStreamSource(stream);
        const javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);
        analyser.smoothingTimeConstant = 0.8;
        analyser.fftSize = 1024;
        microphone.connect(analyser);
        analyser.connect(javascriptNode);
        javascriptNode.connect(audioContext.destination);
        javascriptNode.onaudioprocess = () => {
          const array = new Uint8Array(analyser.frequencyBinCount);
          analyser.getByteFrequencyData(array);
          let values = 0;
          const { length } = array;
          for (var i = 0; i < length; i++) {
            values += (array[i]);
          }
          const average = ((values / length) / 100) + 0.3;
          microphoneFeedback.classList.add('listening');
          microphoneFeedback.style.transform = `scale(${average})`;
          microphoneFeedback.style.opacity = `${average*2}`;

          microphoneUX.classList.add('listening');
          microphoneUX.style.transform = `scale(${average * 1.4})`;
          microphoneUX.style.opacity = `${average*2}`;
          microphoneUX.style.borderRadius = `${average * 150}% / ${average * 50}%`;
          microphoneUX.style.animation = `rotating ${average}s linear infinite`;
        };
      },
      (err) => {
        console.log(`The following error occured: ${err.name}`);
      });
    } else {
      console.log("getUserMedia not supported");
    }
  }
}