let input_value = document.getElementById("input");
let addTask = document.getElementById("add");
let list = document.getElementById("lists");

//ADDIN SAVE FOR LOACLSTORAGE
function saveTasks() {
  const tasks = [];

  document.querySelectorAll("#lists li").forEach(li => {
    tasks.push({
      text: li.querySelector(".todo-text").textContent,
      completed: li.classList.contains("done")
    });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));

}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach(task => {
    const li = document.createElement("li");

    if(task.completed){
      li.classList.add("done");
    }
    li.innerHTML = `
      <span class="todo-text">${task.text}</span>
      <input type="checkbox" class="cmplt" ${task.completed ? "checked" : ""}>
      <button class="delete">
        <i class="fa-solid fa-xmark"></i>
      </button>
    `;

    list.appendChild(li);

  });

}



// function-for-Todo
function createTodo(input){
  const li = document.createElement("li");
  li.innerHTML = `<span class="todo-text">${input.value}</span> <input type = "checkbox" class= "cmplt"><button class="delete"><i class="fa-solid fa-xmark"></i></button>`;
  list.appendChild(li);
  input.value = "";
}

addTask.addEventListener("click", () => {
  if (input_value.value.trim() !== "") {
    createTodo(input_value);
    saveTasks();
  };
});

list.addEventListener("click", (e) => {
  if (e.target.classList.contains("cmplt")) {
    const li = e.target.parentElement;
    li.classList.toggle("done");
    saveTasks();

  } else if (e.target.closest(".delete")) {
    const li = e.target.closest("li");
    li.remove();
    saveTasks();
  }
});

let all = document.getElementById("all");
let done = document.getElementById('done');
let active = document.getElementById('active');

function filterTasks(mode) {
  const allTasks = document.querySelectorAll('li');
  allTasks.forEach(task => {
    const isDone = task.classList.contains('done');

    if (mode === 'all') task.style.display = '';
    else if (mode === 'done') task.style.display = isDone ? '' : 'none';
    else if (mode === 'active') task.style.display = isDone ? 'none' : '';
  });
}

all.addEventListener('click', () => filterTasks('all'));
done.addEventListener('click', () => filterTasks('done'));
active.addEventListener('click', () => filterTasks('active'));

const toggleBtn = document.querySelector('.theme-checkbox');
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme')
});

loadTasks();