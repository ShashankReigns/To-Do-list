const form = document.getElementById('todoForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

let tasks = [];


const storedTasks = JSON.parse(localStorage.getItem('tasks'));
if (storedTasks) {
    tasks = storedTasks;
    tasks.forEach(task => {
        addTaskToList(task);
    });
}


form.addEventListener('submit', function(event) {
    event.preventDefault();
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false
        };
        tasks.push(newTask);
        addTaskToList(newTask);
        updateLocalStorage();
        taskInput.value = '';
    }
});


function addTaskToList(task) {
    const li = document.createElement('li');
    li.dataset.id = task.id;
    li.className = task.completed ? 'completed' : '';
    li.innerHTML = `
        <span>${task.text}</span>
        <div class="actions">
            <button class="complete-btn">Complete</button>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </div>
    `;
    taskList.appendChild(li);

    
    const completeBtn = li.querySelector('.complete-btn');
    completeBtn.addEventListener('click', function() {
        task.completed = !task.completed;
        li.classList.toggle('completed');
        updateLocalStorage();
    });

    const editBtn = li.querySelector('.edit-btn');
    editBtn.addEventListener('click', function() {
        const newText = prompt('Edit task:', task.text);
        if (newText !== null && newText.trim() !== '') {
            task.text = newText.trim();
            li.querySelector('span').textContent = task.text;
            updateLocalStorage();
        }
    });

    const deleteBtn = li.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', function() {
        tasks = tasks.filter(t => t.id !== task.id);
        li.remove();
        updateLocalStorage();
    });
}


function updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
