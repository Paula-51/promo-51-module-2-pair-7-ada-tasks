'use strict'

const btnAdd = document.querySelector(".js-btn-add");
const lista = document.querySelector(".js-check");
const newTask = document.querySelector(".js-newTask");
const newInput = document.querySelector(".js-input-find");
const btnFind = document.querySelector(".js-btn-buscar");
const tareas = [];

function addTask(event) {
    let tarea = newTask.value;
    lista.innerHTML += `<li>
                    <input type="checkbox" id="tarea1">
                    <label for="tarea1"> ${tarea}</label>
                    </li>`;
    console.log (tarea);
}

function checkear(event) {
    if (event.target.type === "checkbox") {
      const label = event.target.nextElementSibling;
      label.classList.toggle("tachar", event.target.checked);
    }
  }

function buscar (event) {
    let oldTask = newInput.value;

}



btnAdd.addEventListener ("click", addTask);  
lista.addEventListener("change", checkear);
