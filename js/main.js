'use strict'

const btnAdd = document.querySelector(".js-btn-add");
const lista = document.querySelector(".js-check");
const newTask = document.querySelector(".js-newTask");
const newInput = document.querySelector(".js-input-find");
const btnFind = document.querySelector(".js-btn-buscar");
const tareas = [];


function cargarTareasIniciales() {
  const labels = document.querySelectorAll(".js-check label");

  labels.forEach(label => {
    const texto = label.textContent.trim(); //innerText también funciona (si ni tiene ningún estilo CSS que lo oculte).
    tareas.push(texto);
  });
}

cargarTareasIniciales(); 

function addTask(event) {
    const tarea = newTask.value.trim();
    if (!tarea) return; // evita tareas vacías y detiene la función de abajo 

    tareas.push(tarea); // añadimos la tarea al array

    lista.innerHTML += `<li>
        <input type="checkbox" id="${tarea}">
        <label for="${tarea}">${tarea}</label>
    </li>`;

    newTask.value = ""; // limpiamos el input
}

function checkear(event) {
    if (event.target.type === "checkbox") {
      const label = event.target.nextElementSibling;
      label.classList.toggle("tachar", event.target.checked);
    }
  }

function buscar(event) {
  const textoBuscado = newInput.value.trim().toLowerCase();

  // if (!textoBuscado) {
  //   return;
  // }
  
  // Filtrar las tareas que contienen el texto buscado
  const resultados = tareas.filter(tarea =>
    tarea.toLowerCase().includes(textoBuscado)
  );

  // Limpiar la lista antes de agregar los resultados filtrados
  lista.innerHTML = "";  

  // Mostrar las tareas filtradas
  if (resultados.length > 0) {
    resultados.forEach(tarea => {
      lista.innerHTML += `<li>
        <input type="checkbox" id="${tarea}">
        <label for="${tarea}">${tarea}</label>
      </li>`;
    });
  } 

  // Limpiar el input de búsqueda
  newInput.value = "";
}




btnAdd.addEventListener ("click", addTask);  
lista.addEventListener("change", checkear);
btnFind.addEventListener("click", buscar);
