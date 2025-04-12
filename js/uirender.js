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