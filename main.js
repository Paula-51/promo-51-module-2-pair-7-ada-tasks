const btnAdd = document.querySelector(".js-btn-add");
const lista = document.querySelector(".js-check");
const newTask = document.querySelector(".js-newTask");


function addTask() {
    let tarea = newTask.value;
    lista.innerHTML += `<li>
                    <input type="checkbox" id="tarea1">
                    <label for="tarea1">tarea</label>
                    </li>`;
    console.log (tarea);
}

btnAdd.addEventListener ("click", addTask ());