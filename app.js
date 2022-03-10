//selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listeners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);
document.addEventListener('DOMContentLoaded', getTodos);

//Functions
function addTodo(event) {
    //prevents form from submiting
    event.preventDefault(); 
    //todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");
    //create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //add todo to local storage
    saveLocalTodos(todoInput.value);
    //Check mark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //Trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //Append to List
    todoList.appendChild(todoDiv);
    //clear todoInput value
    todoInput.value = "";
}

function deleteCheck(e) {
    const item = e.target;
    //Delete todo
    if (item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        //animation
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
        })
    }

    //check mark
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalTodos(todo) {
    //check if items are already in local storage
    let todos;
    if (localStorage.getItem('todos') === null) {  //checks if we have todos. if not, creates an empty array
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos')); //if we do have todos, we'll have an array of todos from local storage
    }
    todos.push(todo);  //if we have an array we'll push todos to the array
    localStorage.setItem('todos', JSON.stringify(todos)); //set back to local storage
}
 
function getTodos() {
    //check if items are already in local storage
    let todos;
    if (localStorage.getItem('todos') === null) {  //checks if we have todos. if not, creates an empty array
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos')); //if we do have todos, we'll have an array of todos from local storage
    } 
    todos.forEach(function (todo) {
        //todo div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo");
        //create LI
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);
        //Check mark button
        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        //Trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>'
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        //Append to List
        todoList.appendChild(todoDiv);
    })
}

function removeLocalTodos(todo) {
    //check if items are already in local storage
    let todos;
    if (localStorage.getItem('todos') === null) {  //checks if we have todos. if not, creates an empty array
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos')); //if we do have todos, we'll have an array of todos from local storage
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}
