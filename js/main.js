function fetchTasks() {
    fetch(`https://658bea59859b3491d3f50db8.mockapi.io/tasks`)
        .then(response => response.json())
        .then(tasks => {
            const taskList = document.getElementById('taskList');
            taskList.innerHTML = '';

            tasks.forEach(task => {
                const taskItem = document.createElement('li');
                taskItem.textContent = task.title;

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.addEventListener('click', () => deleteTask(task.id));

                const editButton = document.createElement('button');
                editButton.textContent = 'Edit';
                editButton.addEventListener('click', () => editTask(task.id, task.title));

                taskItem.appendChild(deleteButton);
                taskItem.appendChild(editButton);

                taskList.appendChild(taskItem);
            });
        })
        .catch(error => console.error('Error fetching tasks:', error));
}

function fetchTasks() {
    fetch('https://658bea59859b3491d3f50db8.mockapi.io/tasks')
        .then(response => response.json())
        .then(tasks => {
            const taskList = document.getElementById('taskList');
            taskList.innerHTML = '';

            tasks.forEach(task => {
                const taskItem = document.createElement('li');
                taskItem.textContent = task.title;

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.addEventListener('click', () => deleteTask(task.id));

                const editButton = document.createElement('button');
                editButton.textContent = 'Edit';
                editButton.addEventListener('click', () => editTask(task.id, task.title));

                const statusDropdown = document.createElement('select');

                const inProcessOption = document.createElement('option');
                inProcessOption.value = 'in_process';
                inProcessOption.textContent = 'In Process';
                const doneOption = document.createElement('option');
                doneOption.value = 'done';
                doneOption.textContent = 'Done';

                if (task.status === 'in_process') {
                    inProcessOption.selected = true;
                } else {
                    doneOption.selected = true;
                }

                statusDropdown.appendChild(inProcessOption);
                statusDropdown.appendChild(doneOption);

                statusDropdown.addEventListener('change', (event) => updateTaskStatus(task.id, event.target.value)); // Implement status update functionality

                taskItem.appendChild(statusDropdown);
                taskItem.appendChild(deleteButton);
                taskItem.appendChild(editButton); 

                taskList.appendChild(taskItem);
            });
        })
        .catch(error => console.error('Error fetching tasks:', error));
}


function updateTaskStatus(taskId, status) {
    fetch(`https://658bea59859b3491d3f50db8.mockapi.io/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: status }),
    })
    .then(response => {
        if (response.ok) {
            fetchTasks();
        } else {
            throw new Error('Failed to update task status');
        }
    })
    .catch(error => console.error('Error updating task status:', error));
}

function addTask(taskText) {
    fetch(`https://658bea59859b3491d3f50db8.mockapi.io/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: taskText }),
    })
    .then(response => {
        if (response.ok) {
            fetchTasks();
        } else {
            throw new Error('Failed to add task');
        }
    })
    .catch(error => console.error('Error adding task:', error));
}

function editTask(taskId, taskTitle) {
    const newTitle = prompt('Enter new task title', taskTitle);
    if (newTitle !== null && newTitle.trim() !== '') {
        fetch(`https://658bea59859b3491d3f50db8.mockapi.io/tasks/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: newTitle }),
        })
            .then(response => {
                if (response.ok) {
                    fetchTasks();
                } else {
                    throw new Error('Failed to edit task');
                }
            })
            .catch(error => console.error('Error editing task:', error));
    }
}


function deleteTask(taskId) {
    fetch(`https://658bea59859b3491d3f50db8.mockapi.io/tasks/${taskId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            fetchTasks();
        } else {
            throw new Error('Failed to delete task');
        }
    })
    .catch(error => console.error('Error deleting task:', error));
}

document.getElementById('logoutButton').addEventListener('click', function() {
    localStorage.removeItem('userLoggedIn');
    window.location.replace('login.html');
});

document.getElementById('taskForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const taskText = document.getElementById('taskInput').value;
    if (taskText.trim() !== '') {
        addTask(taskText);
        document.getElementById('taskInput').value = '';
    }
});

window.addEventListener('load', function () {
    fetchTasks();
});



tasks.forEach(task => {

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => editTask(task.id, task.title));

    taskItem.appendChild(deleteButton);
    taskItem.appendChild(editButton);
    taskList.appendChild(taskItem);
});

