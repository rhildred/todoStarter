// Libraries
import Framework7 from 'framework7/framework7.esm.bundle'
import config from "./firebase.js";
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

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

function toggleSignIn() {
  if (!firebase.auth().currentUser) {
    // [START createprovider]
    var provider = new firebase.auth.GoogleAuthProvider();
    // [END createprovider]
    // [START addscopes]
    provider.addScope('https://www.googleapis.com/auth/plus.login');
    // [END addscopes]
    // [START signin]
    firebase.auth().signInWithRedirect(provider);
    // [END signin]
  } else {
    // [START signout]
    firebase.auth().signOut();
    // [END signout]
  }
}
// [END buttoncallback]

document.getElementById("login").addEventListener("click", evt =>{
  evt.preventDefault();
  toggleSignIn();
});

/*document.getElementById("logout").addEventListener("click", evt =>{
  evt.preventDefault();
  toggleSignIn();
})*/

      // Listening for auth state changes.
      // [START authstatelistener]
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    console.log(user);
    document.getElementById("loggedIn").className = "loggedIn";
  } else {
    // User is signed out.
    document.getElementById("loggedIn").className = "notLoggedIn";
  }
});

function addTodo(sKey, sTodo){
  let oTodo = document.createElement("p");
  oTodo.innerHTML = sTodo + "<div class=\"row\"><div class=\"col\"><button id=\"d" + sKey + "\" class=\"delete\">delete</button></div><div class=\"col\"><button id=\"f" + sKey + "\" class=\"finish\">finish</button></div></div>";
  document.getElementById("list").prepend(oTodo);
}

firebase.database().ref("todos").on("value", (snapshot) =>{
  const oTodos=snapshot.val();
  console.log(oTodos);
  document.getElementById("list").innerHTML = "";
  let aTodos = Object.keys(oTodos);
  for(let n = 0; n < aTodos.length; n++){
    const sKey = aTodos[n];
    addTodo(sKey, oTodos[aTodos[n]].name);
  }
  createDeleteHandlers();
  createFinishHandlers();
})

document.getElementById("todo").addEventListener("submit", (evt)=>{
    evt.preventDefault();
    const sTodo = document.getElementById("todoEntry").value;
    const sId = new Date().toISOString().replace(".", "_");
    firebase.database().ref("todos/" + sId).set({
      name: sTodo
    });
});

function createDeleteHandlers(){
  var aClassname = document.getElementsByClassName("delete");

  for(var n = 0; n < aClassname.length; n++){
    aClassname[n].addEventListener("click", (evt) =>{
      const sId = evt.target.id.substr(1); 
      firebase.database().ref("todos/" + sId).remove();
    })
  }
}

function createFinishHandlers(){
  var aClassname = document.getElementsByClassName("finish");

  for(var n = 0; n < aClassname.length; n++){
    aClassname[n].addEventListener("click", (evt) =>{
      const sId = evt.target.id.substr(1);
      const sFinished =  new Date().toISOString().replace(".", "_");
      firebase.database().ref("todos/" + sId + "/completed").set(sFinished);
    })
  }
}
