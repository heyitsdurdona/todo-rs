import { todos } from "./data.js";
import { elInputForm, elTaskList, elTheme, elAudioRemoveTask, elAudioSelectStatus, elAudioCheck, elAudioAddNewTask } from "./html-elements.js";
import { removeTask, renderChoosenType} from "./uirender.js";

// initial rendering
let currentType = "all";
renderChoosenType(todos, currentType);

const savedTheme = localStorage.getItem('theme') || 'light';
document.body.dataset.theme = savedTheme;

// dark/light theme
elTheme.addEventListener('click', function(evt){
    elAudioSelectStatus.play();
    const currentTheme = document.body.dataset.theme;
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.body.dataset.theme = newTheme;
    localStorage.setItem('theme', newTheme);
});

// removing leading spaces
elInputForm.addEventListener('input', function(evt){
    const value = evt.target.value;
    let pattern = /^\s+/g;
    if(pattern.test(value)){
        evt.target.value = value.trimStart();
    }
});


// adding new tasks to todos array
elInputForm.addEventListener('submit', function(evt){
    evt.preventDefault();
    elAudioAddNewTask.play();
    const taskText = evt.target.input.value;
    const newTask = {
        title: taskText,
        isCompleted: false,
        id: Date.now().toString(),
        date: new Date().toLocaleDateString(),
        createdAt: new Date().toString(),
        description: taskText
    };
    todos.items.unshift(newTask);
    localStorage.setItem('tasks', JSON.stringify(todos));
    renderChoosenType(todos, currentType);
    evt.target.reset();
});

// event delegation
elTaskList.addEventListener('click', function(evt){
    let li = evt.target.closest('li');
    if (!li) return;
    let id = 0;

    let checkbox = li.querySelector('input[type="checkbox"]'); 
    if (checkbox) { 
        id = checkbox.id
    }

    // Show task details in modal when clicking the title
    if (evt.target.matches('h3')) {
        id = checkbox.id;
        const task = todos.items.find(item => item.id === id);
        
        // Get modal elements
        const modalTitle = document.getElementById('modal-title');
        const modalDescription = document.getElementById('modal-description');
        const modalDate = document.getElementById('modal-date');
        const modalStatus = document.getElementById('modal-status');
        const modalId = document.getElementById('modal-id');
        
        modalTitle.textContent = task.title;
        modalDescription.textContent = task.title;
        modalDate.textContent = task.date;
        modalStatus.textContent = task.isCompleted ? 'Completed' : 'Active';
        modalId.textContent = task.id;

        const modal = document.getElementById('default-modal');
        modal.classList.remove('hidden');
    }

    // changing task's completed using checkbox
    if (checkbox && evt.target === checkbox) {
        elAudioCheck.play();
        // Find the task and update its isCompleted property
        const task = todos.items.find(item => item.id === id);
        if (task) {
            task.isCompleted = checkbox.checked; 
            localStorage.setItem('tasks', JSON.stringify(todos)); 
        }
    }

    // deleting task from todo
    if (evt.target.matches('#deleteTask')){
        elAudioRemoveTask.play();
        console.log('match');
        removeTask(todos.items, id);
        localStorage.setItem('tasks', JSON.stringify(todos));
        renderChoosenType(todos, currentType)
        console.log(todos.items)
    }



    // rendering different types of tasks
    if (evt.target.matches('#all')){
        elAudioSelectStatus.play();
        currentType = "all"
        renderChoosenType(todos, currentType)
    }
    else if (evt.target.matches('#active')){
        elAudioSelectStatus.play();
        currentType = "active";
        renderChoosenType(todos, currentType)
        
    }
    else if (evt.target.matches('#completed')){
        elAudioSelectStatus.play();
        currentType = "completed";
        renderChoosenType(todos, currentType)

        
    }
    else if (evt.target.matches('#clear')){
        elAudioRemoveTask.play();
        todos.items = todos.items.filter(el => el.isCompleted===false);
        localStorage.setItem('tasks', JSON.stringify(todos));
        renderChoosenType(todos, currentType);
    }

});





