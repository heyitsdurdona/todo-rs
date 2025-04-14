import { elFooterLiTemp, elListTemp, elTaskList } from "./html-elements.js";

export function uiRender(todos){

    let fragment = document.createDocumentFragment();
    todos.forEach(element => {
        const clone = elListTemp .cloneNode(true).content;

        // updating the title
        let taskText = clone.querySelector('h3');
        taskText.innerText = element.title;  
        
        // updating the checkbox
        let checkbox = clone.querySelector('input[type="checkbox"]');
        checkbox.id = element.id;
        checkbox.checked = element.isCompleted;
        
        let label = clone.querySelector('label');
        label.setAttribute('for', `${element.id}`)

        fragment.append(clone);
    });
    elTaskList.innerHTML = '';
    elTaskList.appendChild(fragment);

    let footerClone = elFooterLiTemp.cloneNode(true).content;
    const elTaskCount = footerClone.querySelector('#tasksCount');
    elTaskCount.innerText = todos.length;
    if (todos.length > 0 ){
        elTaskList.append(footerClone);
    }
}


// remove element from todos
export function removeTask(todos, id){
    const index = todos.findIndex(el => el.id === id); 
    if (index !== -1) {
        todos.splice(index, 1); 
    }
}

export function renderChoosenType(todos, type){
    if (type === "all"){
        uiRender(todos.items)
    }
    if (type === "active"){
        let active = todos.items.filter(el=> el.isCompleted===false);
        if (active.length<1){
            alert('no task in active');
            uiRender(todos.items)
        } else{
            uiRender(active)
        }
    }
    if (type === "completed"){
        let completed = todos.items.filter(el=> el.isCompleted===true);
        if (completed.length<1){
            alert('no task in completed')
            uiRender(todos.items)
        } else{
            uiRender(completed)
        }
    }
}