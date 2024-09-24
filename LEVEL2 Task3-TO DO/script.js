let pendingTasks = [];
let completedTasks = [];

function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();
    
    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        addedAt: new Date().toLocaleString(),
        completed: false,
    };

    pendingTasks.push(task);
    taskInput.value = '';
    displayTasks();
}

function displayTasks() {
    const pendingTasksList = document.getElementById('pending-tasks');
    const completedTasksList = document.getElementById('completed-tasks');
    
    pendingTasksList.innerHTML = '';
    completedTasksList.innerHTML = '';

    pendingTasks.forEach(task => {
        pendingTasksList.innerHTML += `<li>
        <div>
           <span> ${task.text} (Added: ${task.addedAt})</span>
        </div>
            <div>
            <button class="complete-btn" onclick="completeTask(${task.id})">Complete</button>
            <button class="edit-btn" onclick="editTask(${task.id})">Edit</button>
            <button class="delete-btn" onclick="deleteTask(${task.id}, 'pending')">Delete</button>
            </div>
        </li>`;
    });

    completedTasks.forEach(task => {
        completedTasksList.innerHTML += `<li class="completed">
            <span>${task.text} (Added: ${task.addedAt}, Completed: ${task.completedAt})</span>
            <button class="delete-btn" onclick="deleteTask(${task.id}, 'completed')">Delete</button>
        </li>`;
    });
}

function completeTask(taskId) {
    const taskIndex = pendingTasks.findIndex(task => task.id === taskId);
    const completedTask = pendingTasks.splice(taskIndex, 1)[0];
    completedTask.completed = true;
    completedTask.completedAt = new Date().toLocaleString();
    
    completedTasks.push(completedTask);
    displayTasks();
}

function editTask(taskId) {
    const taskIndex = pendingTasks.findIndex(task => task.id === taskId);
    const newTaskText = prompt("Edit task:", pendingTasks[taskIndex].text);

    if (newTaskText !== null && newTaskText.trim() !== "") {
        pendingTasks[taskIndex].text = newTaskText.trim();
        displayTasks();
    }
}

function deleteTask(taskId, list) {
    if (list === 'pending') {
        pendingTasks = pendingTasks.filter(task => task.id !== taskId);
    } else if (list === 'completed') {
        completedTasks = completedTasks.filter(task => task.id !== taskId);
    }
    
    displayTasks();
}

