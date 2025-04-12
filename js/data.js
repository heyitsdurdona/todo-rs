let todos = JSON.parse(localStorage.getItem('tasks')) ||{
    items: [],
    get length(){
        return this.items.length;
    }
}

export {todos}