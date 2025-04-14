import { todos } from "./data.js";
import { elInputForm, elTaskList, elTheme } from "./html-elements.js";
import { removeTask, uiRender } from "./uirender.js";

// initial rendering
uiRender(todos.items);

const savedTheme = localStorage.getItem('theme') || 'light';
document.body.dataset.theme = savedTheme;

// dark/light theme
elTheme.addEventListener('click', function(evt){
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
    const taskText = evt.target.input.value;
    todos.items.unshift({title: taskText, isCompleted: false, id:  Date.now().toString()})
    localStorage.setItem('tasks', JSON.stringify(todos));
    uiRender(todos.items)
    evt.target.reset()
})

// event delegation
elTaskList.addEventListener('click', function(evt){
    let li = evt.target.closest('li');
    if (!li) return;
    let id = 0;

    let checkbox = li.querySelector('input[type="checkbox"]'); 
    if (checkbox) { 
        id = checkbox.id
    }

    // changing task's completed using checkbox
    if (checkbox && evt.target === checkbox) {
        console.log(`Checkbox ID: ${id}`);
        console.log(`Checkbox is checked: ${checkbox.checked}`);

        // Find the task and update its isCompleted property
        const task = todos.items.find(item => item.id === id);
        if (task) {
            task.isCompleted = checkbox.checked; 
            localStorage.setItem('tasks', JSON.stringify(todos)); 
        }
    }

    // deleting task from todo
    if (evt.target.matches('#deleteTask')){
        console.log('match');
        removeTask(todos.items, id);
        localStorage.setItem('tasks', JSON.stringify(todos));
        uiRender(todos.items)
        console.log(todos.items)
    }



    // rendering different types of tasks
    if (evt.target.matches('#all')){
        uiRender(todos.items);
    }
    else if (evt.target.matches('#active')){
        let active = todos.items.filter(el=> el.isCompleted===false);
        if (active.length<1){
            alert('no task in active')
        } else{
            uiRender(active)
        }
    }
    else if (evt.target.matches('#completed')){
        let completed = todos.items.filter(el=> el.isCompleted===true);
        if (completed.length<1){
            alert('no task in completed')
        } else{
            uiRender(completed)
        }
    }
    else if (evt.target.matches('#clear')){
        todos.items = todos.items.filter(el => el.isCompleted===false);
        localStorage.setItem('tasks', JSON.stringify(todos));
        uiRender(todos.items);
    }


});



