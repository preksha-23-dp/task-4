// ===== DOM elements =====
const taskInput = document.getElementById("taskInput");
const taskDateTime = document.getElementById("taskDateTime");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// ===== Data storage =====
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// ===== Render Tasks =====
function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = `task ${task.completed ? "completed" : ""}`;

    li.innerHTML = `
      <input type="checkbox" ${task.completed ? "checked" : ""} data-index="${index}" class="complete-checkbox">
      <div class="task-info">
        <span>${task.text}</span>
        ${
          task.datetime
            ? `<small>🕒 ${new Date(task.datetime).toLocaleString()}</small>`
            : ""
        }
      </div>
      <div class="task-actions">
        <button class="edit" data-index="${index}">✏️</button>
        <button class="delete" data-index="${index}">🗑️</button>
      </div>
    `;

    taskList.appendChild(li);
  });

  saveTasks();
}

// ===== Add Task =====
function addTask() {
  const text = taskInput.value.trim();
  const datetime = taskDateTime.value;

  if (!text) {
    alert("Please enter a task!");
    return;
  }

  const newTask = { text, datetime, completed: false };
  tasks.push(newTask);
  taskInput.value = "";
  taskDateTime.value = "";

  renderTasks();
}

// ===== Delete Task =====
function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

// ===== Edit Task =====
function editTask(index) {
  const task = tasks[index];
  const newText = prompt("Edit your task:", task.text);
  if (newText !== null && newText.trim() !== "") {
    task.text = newText.trim();
  }
  renderTasks();
}

// ===== Toggle Complete =====
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

// ===== Save to localStorage =====
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ===== Event Listeners =====
addBtn.addEventListener("click", addTask);

taskList.addEventListener("click", (e) => {
  const index = e.target.dataset.index;
  if (e.target.classList.contains("delete")) {
    deleteTask(index);
  } else if (e.target.classList.contains("edit")) {
    editTask(index);
  }
});

taskList.addEventListener("change", (e) => {
  if (e.target.classList.contains("complete-checkbox")) {
    toggleComplete(e.target.dataset.index);
  }
});

// ===== Initialize =====
renderTasks();
