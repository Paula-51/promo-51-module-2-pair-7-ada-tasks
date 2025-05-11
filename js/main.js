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
const btnAdd = document.querySelector(".js-btn-add");
const inputAdd = document.querySelector(".js-newTask"); 



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
    localStorage.setItem("tasks", JSON.stringify(tasks));

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


  const handleNewTask = (event) => {
  event.preventDefault();

  // 1. Recoge el nombre de la tarea
  let nueva = inputAdd.value.trim(); 

  if (nueva === "") return; // no hacer nada si está vacío

  // 2. Crea un objeto para la nueva tarea
  const newTask = {
    id: Date.now(),
    name: nueva, // sustituye este string vacío por el nombre de la tarea nueva
    completed: false,
  };

  // 3. Añade la nueva tarea al array de tareas
  tasks.push(newTask);

   // 4. Enviar la nueva tarea al servidor
  fetch(SERVER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTask)
  })
  .then((response) => response.json())
  .then((data) => {
    if (data.success) {
      // Si la tarea se ha guardado correctamente en el servidor

      // 5. Vuelve a pintar las tareas
      pintarTareas(tasks);

      // 6. Guarda el listado actualizado en el Local Storage
      localStorage.setItem("tasks", JSON.stringify(tasks));

      // 7. Limpia el valor del input
      inputAdd.value = "";

      // (Opcional) Si quieres mostrar algún mensaje de éxito:
      console.log("Tarea añadida correctamente");
    } else {
      // Si hubo un error al guardar en el servidor
      console.error("Error al agregar la tarea al servidor");
    }
  })
  .catch((error) => {
    console.error("Error en la solicitud al servidor", error);
  });
};
  
  
const GITHUB_USER = "paula-51";
const SERVER_URL = `https://dev.adalab.es/api/todo/${GITHUB_USER}`;

const tasksLocalStorage = JSON.parse(localStorage.getItem("tasks"));

if (tasksLocalStorage !== null) {
  // si (existe el listado de tareas en Local Storage)
  // pinta la lista de tareas almacenadas en tasksLocalStorage
  tasks = tasksLocalStorage; 
  pintarTareas(tasks); 
  contarTareas();

} else {
  //sino existe el listado de tareas en el local storage
  // pide los datos al servidor
  fetch(SERVER_URL)
    .then((response) => response.json())
    .then((data) => {
      tasks = data.results;
      console.table(tasks);
      pintarTareas(tasks);
      contarTareas();
      
      //guarda el listado obtenido en el Local Storage
      // pinta la lista de tareas
    })
    .catch((error) => {
      console.error(error);
    });
}



lista.addEventListener("click", handleClickList);
btnAdd.addEventListener("click", handleNewTask);
btnBuscar.addEventListener("click", handleClickFilter); 

