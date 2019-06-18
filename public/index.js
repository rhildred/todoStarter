// Libraries
import Framework7 from 'framework7/framework7.esm.bundle'
import config from "./firebase.js";
import firebase from 'firebase/app';
import 'firebase/database';

// Theme
var theme = 'auto';

firebase.initializeApp(config);

// Init F7
new Framework7({
  root: '#app',
  theme: theme,
  // Fix for iPhone X notch
  statusbar: {
    overlay: Framework7.device.ios ? Framework7.device.webView || Framework7.device.cordova : 'auto',
  },
})


function addTodo(sKey, sTodo){
  let oTodo = document.createElement("p");
  oTodo.innerHTML = sTodo + "<button id=\"" + sKey + "\" class=\"delete\">delete</button>";
  document.getElementById("list").prepend(oTodo);
}

firebase.database().ref("todos").on("value", (snapshot) =>{
  const oTodos=snapshot.val();
  console.log(oTodos);
  document.getElementById("list").innerHTML = "";
  Object.keys(oTodos).map((sKey) => {
    addTodo(sKey, oTodos[sKey].name);

  });
})

document.getElementById("todo").addEventListener("submit", (evt)=>{
    evt.preventDefault();
    const sTodo = document.getElementById("todoEntry").value;
    const sId = new Date().toISOString().replace(".", "_");
    firebase.database().ref("todos/" + sId).set({
      name: sTodo
    });
});
