// Libraries
import Framework7 from 'framework7/framework7.esm'
import config from "./firebase.js";
import firebase from 'firebase/app';
import 'firebase/database';

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

function addTodo(sTodo){
  let oTodo = document.createElement("p");
  oTodo.innerHTML = sTodo;
  document.getElementById("list").prepend(oTodo);
}

document.getElementById("todo").addEventListener("submit", (evt)=>{
    evt.preventDefault();
    const sTodo = document.getElementById("todoEntry").value;
    addTodo(sTodo);
});
