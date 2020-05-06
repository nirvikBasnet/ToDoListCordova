//selectore
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');




//event listeners

todoButton.addEventListener('click', addTodo);



//functions

function addTodo(event){
    //prevent form
    event.preventDefault();
    
    console.log("hey");

    //Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //create li
    const newTodo = document.createElement('li');
    
    newTodo.innerText =todoInput.value;
    newTodo.classList.add("todo-item");

    todoDiv.appendChild(newTodo);

    //Check mark Button

    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //append to list

    todoList.appendChild(todoDiv);
}