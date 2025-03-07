const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');

const list = document.getElementById('list');
const doneList = document.getElementById('done-list');


let draggedItem = null;

// Function: Add Task
function addTask() {
    const taskText = taskInput.value.trim();
    console.log(taskText);
    if(taskText !== ''){
        const newTask = document.createElement('li');
        // Text (String) content added to list instance newTask
        newTask.textContent = taskText;
        newTask.classList.add('item');
        newTask.setAttribute('draggable', 'true');
        
        // Button element added to list instance newTask
        const deleteButton = document.createElement('button');
        deleteButton.textContent = "Delete";
        deleteButton.classList.add('deleteTaskButton');

        // Add Button into newTask list instance
        newTask.appendChild(deleteButton);

        // Add newTask list intance to list of Tasks
        list.appendChild(newTask);
        taskInput.value = ''; // clear after 

        // Event Listener for Delete Task Button; because this is appended on every new additional tasks
        deleteButton.addEventListener('click', (e) => {
            e.target.parentElement.remove();
        });
    } 
}


// Event Listener for Add Task Button
addTaskButton.addEventListener('click', addTask);


// Event Listener for Enter Key where the input field is
taskInput.addEventListener('keydown', (e) => {
    if(e.key === 'Enter'){
        addTask();
    }
});

// Drag Start Task List
list.addEventListener('dragstart', (e) => {
    draggedItem = e.target;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', draggedItem.innerHTML);
});

// Drag Start for Done List
doneList.addEventListener('dragstart', (e) => {
    draggedItem = e.target;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', draggedItem.innerHTML);
});

// Prevent Dragover Default, don't snap back, allow drop
list.addEventListener('dragover', (e) => {
    e.preventDefault();
});
doneList.addEventListener('dragover', (e) => {
    e.preventDefault();
});

// Drop Listening for Done List
doneList.addEventListener('drop', (e) => {
    e.preventDefault();
    if(draggedItem){
        doneList.appendChild(draggedItem);
        draggedItem = null;
    }
});

// Drop Listening for Task List
list.addEventListener('drop', (e) => {
    e.preventDefault();
    if(draggedItem){
        list.appendChild(draggedItem);
        draggedItem = null;
    }
});