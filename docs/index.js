// Libraries
import "https://cdnjs.cloudflare.com/ajax/libs/framework7/1.4.2/js/framework7.min.js";

// here initialize the app
var myApp = new Framework7();

// If your using custom DOM library, then save it to $$ variable
var $$ = Dom7;

// Add the view
myApp.addView('.view-main', {

    // enable the dynamic navbar for this view:
    dynamicNavbar: true
});

function addTodo(sKey, sTodo){
  let oTodo = document.createElement("p");
  oTodo.innerHTML = `<span id="${sKey}" class="row">${sTodo}</span>`;
  document.getElementById("list").prepend(oTodo);
}


document.getElementById("todo").addEventListener("submit", (evt)=>{
    evt.preventDefault();
    const sTodo = document.getElementById("todoEntry").value;
    if(sTodo){
      const sId = new Date().toISOString().replace(".", "_");
      addTodo(sId, sTodo);
      document.getElementById("todoEntry").value = "";
    }
});

window.onload = () => {
  'use strict';

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./sw.js');
  }
}
