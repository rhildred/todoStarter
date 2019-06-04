// Librairies
import Framework7 from 'framework7/framework7.esm'

// Theme
var theme = 'auto';

// Init F7
var app = new Framework7({
  root: '#app',
  theme: theme,
  // Fix for iPhone X notch
  statusbar: {
    overlay: Framework7.device.ios ? Framework7.device.webView || Framework7.device.cordova : 'auto',
  },
})

document.getElementById("magic").addEventListener("submit", (evt)=>{
    evt.preventDefault();
    const aAnswers = ["no", "yes"];
    const nAnswer = Math.floor(Math.random() * aAnswers.length);
    document.getElementById("answer").innerHTML = aAnswers[nAnswer];
});
