const inputTask = document.querySelector('.inputTask');
const addTask = document.querySelector('.addTask');
const taskList = document.querySelector('.taskList');

//Load Tasks of the localStorage

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
            const newItem = document.createElement("li");
            newItem.textContent = task.text;
            if (task.completed) {
                newItem.classList.add('completed');
            }
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.classList.add('deleteTask');

        newItem.appendChild(deleteButton);
        taskList.appendChild(newItem);
    });
}

//start page and load tasks

loadTasks();

//Safe tasks in localStorage

function saveTaskes() {
    const tasks = [];
    taskList.querySelectorAll('li').forEach(task => {
        tasks.push({
            text: task.textContent,
            completed: task.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Add Task

addTask.addEventListener("click", function(event) {
    event.preventDefault();

    const text = inputTask.value.trim();

    if (text !== '') {
        const newItem = document.createElement("li");

        newItem.textContent = text;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.classList.add('deleteTask');

        newItem.appendChild(deleteButton);
        taskList.appendChild(newItem);

        saveTaskes();
        inputTask.value = '';
    } else {
        alert('Por favor, insira uma tarefa antes de enviar.');
    };
});

//Completd Task

taskList.addEventListener("click", function(event) {
    if (event.target.tagName === 'LI') {
        event.target.classList.toggle('completed');
        saveTaskes();
    };
});

//Delete Task

taskList.addEventListener("click", function(event) {
    if (event.target.classList.contains('deleteTask')) {
        event.target.parentElement.remove();
        saveTaskes();
    }
});