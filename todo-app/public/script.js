document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('new-task-form');
    const taskInput = document.getElementById('new-task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage
    loadTasks();

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addTask(taskInput.value.trim());
        taskInput.value = '';
    });

    function addTask(taskText) {
        if (taskText === '') return;

        const li = document.createElement('li');
        li.appendChild(createTaskSpan(taskText));
        li.appendChild(createButton('Complete', 'complete', toggleComplete));
        li.appendChild(createButton('Edit', 'edit', editTask));
        li.appendChild(createButton('Delete', 'delete', deleteTask));

        taskList.appendChild(li);
        saveTasks();
    }

    function createTaskSpan(taskText) {
        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;
        return taskSpan;
    }

    function createButton(text, className, eventHandler) {
        const button = document.createElement('button');
        button.textContent = text;
        button.classList.add(className);
        button.addEventListener('click', eventHandler);
        return button;
    }

    function toggleComplete(e) {
        const li = e.target.parentElement;
        li.classList.toggle('completed');
        saveTasks();
    }

    function editTask(e) {
        const li = e.target.parentElement;
        const taskSpan = li.querySelector('span');
        const newTaskText = prompt('Edit your task', taskSpan.textContent);
        if (newTaskText !== null && newTaskText.trim() !== '') {
            taskSpan.textContent = newTaskText.trim();
            saveTasks();
        }
    }

    function deleteTask(e) {
        const li = e.target.parentElement;
        taskList.removeChild(li);
        saveTasks();
    }

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            tasks.push({
                text: li.querySelector('span').textContent,
                completed: li.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const li = document.createElement('li');
            if (task.completed) li.classList.add('completed');
            li.appendChild(createTaskSpan(task.text));
            li.appendChild(createButton('Complete', 'complete', toggleComplete));
            li.appendChild(createButton('Edit', 'edit', editTask));
            li.appendChild(createButton('Delete', 'delete', deleteTask));
            taskList.appendChild(li);
        });
    }
});
