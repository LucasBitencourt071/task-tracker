const inputElement = document.querySelector(".new-task-input");
const addTaskButton = document.querySelector(".new-task-button");
const tasksContainer = document.querySelector(".tasks-container");

const validateInput = () => inputElement.value.trim().length > 0;

const handleAddTask = () => {
  const inputIsValid = validateInput();

  if (!inputIsValid) {
    return inputElement.classList.add("error");
  }

  const taskItemContainer = document.createElement("div");
  taskItemContainer.classList.add("task-item");

  const taskContent = document.createElement("p");
  taskContent.innerText = inputElement.value;

  const completeItem = document.createElement("i");
  completeItem.classList.add("far", "fa-check-circle");
  completeItem.addEventListener("click", () => handleCompleteClick(taskItemContainer, taskContent));

  const editItem = document.createElement("i");
  editItem.classList.add("far", "fa-edit");
  editItem.addEventListener("click", () => handleEditClick(taskItemContainer, taskContent));

  const deleteItem = document.createElement("i");
  deleteItem.classList.add("far", "fa-trash-alt");
  deleteItem.addEventListener("click", () => handleDeleteClick(taskItemContainer, taskContent));

  taskItemContainer.appendChild(taskContent);
  taskItemContainer.appendChild(deleteItem);
  taskItemContainer.appendChild(completeItem);
  taskItemContainer.appendChild(editItem);

  tasksContainer.appendChild(taskItemContainer);

  inputElement.value = "";

  updateLocalStorage();
};

const handleEditClick = (taskItemContainer, taskContent) => {
  const updatedTaskContent = prompt("Editar tarefa:", taskContent.innerText);

  if (updatedTaskContent !== null && updatedTaskContent.trim().length > 0) {
    taskContent.innerText = updatedTaskContent;
    updateLocalStorage();
  }
};

const handleCompleteClick = (taskItemContainer, taskContent) => {
  taskContent.classList.toggle("completed");
  updateLocalStorage();
};

const handleDeleteClick = (taskItemContainer, taskContent) => {
  taskItemContainer.remove();
  updateLocalStorage();
};

const handleInputChange = () => {
  const inputIsValid = validateInput();

  if (inputIsValid) {
    return inputElement.classList.remove("error");
  }
};

const updateLocalStorage = () => {
  const tasks = tasksContainer.childNodes;

  const localStorageTasks = [...tasks].map((task) => {
    const content = task.firstChild;
    const isCompleted = content.classList.contains("completed");

    return { description: content.innerText, isCompleted };
  });

  localStorage.setItem("tasks", JSON.stringify(localStorageTasks));
};

const refreshTasksUsingLocalStorage = () => {
  const tasksFromLocalStorage = JSON.parse(localStorage.getItem("tasks"));

  if (!tasksFromLocalStorage) return;

  for (const task of tasksFromLocalStorage) {
    const taskItemContainer = document.createElement("div");
    taskItemContainer.classList.add("task-item");

    const taskContent = document.createElement("p");
    taskContent.innerText = task.description;

    if (task.isCompleted) {
      taskContent.classList.add("completed");
    }

    const completeItem = document.createElement("i");
    completeItem.classList.add("far", "fa-check-circle");
    completeItem.addEventListener("click", () => handleCompleteClick(taskItemContainer, taskContent));

    const editItem = document.createElement("i");
    editItem.classList.add("far", "fa-edit");
    editItem.addEventListener("click", () => handleEditClick(taskItemContainer, taskContent));

    const deleteItem = document.createElement("i");
    deleteItem.classList.add("far", "fa-trash-alt");
    deleteItem.addEventListener("click", () => handleDeleteClick(taskItemContainer, taskContent));

    taskItemContainer.appendChild(taskContent);
    taskItemContainer.appendChild(deleteItem);
    taskItemContainer.appendChild(completeItem);
    taskItemContainer.appendChild(editItem);

    tasksContainer.appendChild(taskItemContainer);
  }
};

refreshTasksUsingLocalStorage();

addTaskButton.addEventListener("click", () => handleAddTask());

inputElement.addEventListener("change", () => handleInputChange());

