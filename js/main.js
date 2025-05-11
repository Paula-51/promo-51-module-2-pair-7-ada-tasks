// const tasks = [
//   { name: "Recoger setas en el campo", completed: true, id: 1 },
//   { name: "Comprar pilas", completed: true, id: 2 },
//   { name: "Poner una lavadora de blancos", completed: true, id: 3 },
//   {
//     name: "Aprender cómo se realizan las peticiones al servidor en JavaScript",
//     completed: false,
//     id: 4,
//   },
// ];

let tasks = [];

const lista = document.querySelector(".js-check");
const update = document.querySelector(".js_pendiente");
const btnBuscar = document.querySelector(".js-btn-buscar");
const inputFind = document.querySelector (".js-input-find");

function pintarTareas(tareas) {
    lista.innerHTML = "";
    tareas.forEach((task) => {
        const li = document.createElement("li");
        li.classList.add("chek");

        const input = document.createElement("input");
        input.type = "checkbox";
        // input.setAttribute("id", task.id);
        input.id = task.id;
        input.checked = task.completed;

        const label = document.createElement("label");
        // label.setAttribute("for", task.id);
        // label.for = task.id;
        label.textContent = task.name;
        label.classList.toggle("tachar", task.completed);

        li.appendChild(input);
        li.appendChild(label);

        lista.appendChild(li);

        return lista; 

    });

}
function contarTareas() {
    update.innerHTML = "";
    let contador_pendiente = 0;
    let contador_completo = 0;
    tasks.forEach((task) => {
        if (!task.completed) {
            contador_pendiente++;
        }
        else {
            contador_completo++;
        }
    }); 
    let contador_total = tasks.length;
    update.innerHTML = `Tienes ${contador_total} tareas: ${contador_pendiente} tareas pendientes y ${contador_completo} tareas completadas.`;
    return update;

}



const handleClickList = (event) => {
    
    const taskId = parseInt(event.target.id); // Obtengo el id del checkbox clickado por la usuaria
    if (!taskId) return; // Si no ha pulsado en el checkbox, no queremos hacer nada y salimos de la función

    const tarea = tasks.find((task) => task.id === taskId); 
    // Si no existe la tarea, salimos de la función
    if (!tarea) return;
    // Si existe la tarea, actualizamos su propiedad completed
    tarea.completed = event.target.checked; 
    event.target.nextElementSibling.classList.toggle("tachar", tarea.completed);
    contarTareas();
};

function handleClickFilter(event) {
    const valor = inputFind.value.toLowerCase().trim();
  
    if (valor === "") {
      // Si el input está vacío, mostrar todas las tareas
      pintarTareas(tasks);
      return;
    }
  
    const tareasFiltradas = tasks.filter((task) =>
      task.name.toLowerCase().includes(valor)
    );
  
      pintarTareas(tareasFiltradas);
    
  }
  
  
const GITHUB_USER = "paula-51";
const SERVER_URL = `https://dev.adalab.es/api/todo/${GITHUB_USER}`;


//Completa el código;
//Guarda la respuesta obtenida enla variable para el listado de tareas: `tasks`





fetch(SERVER_URL)
  .then(response => response.json()) // <-- faltaba el return implícito
  .then(data => {
    tasks = data.results;
    console.table(tasks);
    pintarTareas(tasks);
    contarTareas();
  });

 


lista.addEventListener("click", handleClickList);
btnBuscar.addEventListener("click", handleClickFilter); 
