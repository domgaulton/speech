// const levels = () => {
    
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     const recognition = new SpeechRecognition();

//     recognition.lang = 'en-GB';
//     recognition.interimResults = false;
//     recognition.maxAlternatives = 1;

//     const output = document.querySelector('.output');
//     output.innerHTML = 'Listening...';

//     // START MICROPHONE Courtesy www.0AV.com, LGPL license or as set by forked host, Travis Holliday, https://codepen.io/travisholliday/pen/gyaJk (modified by fixing for browser security change)
//     // Variables Needed
//     const audioContext = new AudioContext();
//     const microphoneFeedback = document.querySelector(".microphoneFeedback");

//     navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
//     if (navigator.getUserMedia) {
//       navigator.getUserMedia({
//         audio: true
//       }, (stream) => {
//         const analyser = audioContext.createAnalyser();
//         const microphone = audioContext.createMediaStreamSource(stream);
//         const javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);
//         analyser.smoothingTimeConstant = 0.8;
//         analyser.fftSize = 1024;
//         microphone.connect(analyser);
//         analyser.connect(javascriptNode);
//         javascriptNode.connect(audioContext.destination);
//         javascriptNode.onaudioprocess = () => {
//           const array = new Uint8Array(analyser.frequencyBinCount);
//           analyser.getByteFrequencyData(array);
//           let values = 0;
//           const { length } = array;
//           for (var i = 0; i < length; i++) {
//             values += (array[i]);
//           }
//           const average = ((values / length) / 100) + 0.3;
//           // console.log(average);
//           microphoneFeedback.classList.add('listening');
//           microphoneFeedback.style.transform = `scale(${average})`;
//         };
//       },
//       (err) => {
//         console.log(`The following error occured: ${err.name}`);
//       });
//     } else {
//       console.log("getUserMedia not supported");
//     }
//     // END MICROPHONE

//     recognition.start();

//     recognition.onresult = (event) => {
//       let { transcript } = event.results[0][0];
//       transcript = transcript.toLowerCase();
//       audioContext.close();
//       microphoneFeedback.classList.remove('listening');
//       return commandTrigger(transcript);
//     };

//     recognition.onspeechend = () => {
//       recognition.stop();
//     };

//     recognition.onerror = (event) => {
//       const { error } = event;
//       output.textContent = `Error occurred: ${error}`;
//     };
//   }

// export default levels;
