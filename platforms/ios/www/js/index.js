
const taskInput = document.querySelector('.task-input');
const todoButton = document.querySelector('.add-button');
const todoList = document.querySelector('.todo-list');

document.addEventListener('DOMContentLoaded',getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click',deleteCheck);

var todos = [];



function addCordovaEvents(){
    
    document.addEventListener("deviceready",onDeviceReady,false);
  }
  function onDeviceReady(){
    document.addEventListener("pause",function(){
      saveList(todos);
    },false);
    document.addEventListener("resume",function(){
      loadList(todos);
    },false);
    document.addEventListener("backbutton",function(){
      saveList(todos);
      navigator.app.exitApp();
    },false);
  }

function addTodo(event){
 
    event.preventDefault();


    //Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //create li
    const newTodo = document.createElement('li');
    
    newTodo.innerText =taskInput.value;
    newTodo.classList.add("todo-item");

    todoDiv.appendChild(newTodo);

    saveLocalTodos(taskInput.value);

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

    taskInput.value="";
}

function deleteCheck(e){

    const item = e.target;
    //delete
    if (item.classList[0] === "trash-btn"){
        const todo = item.parentElement;
        removeLocalTodos(todo);
        todo.remove();
    }
    // check mark
    if(item.classList[0]=== "complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }


}

function saveLocalTodos(todo){
    //check -- Hey do i have things here
    
    if (localStorage.getItem('todos')=== null){
        todos = [];

    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos));
}


function getTodos(){
    addCordovaEvents();
    

    if (localStorage.getItem('todos')=== null){
        todos = [];

    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(todo){

        //Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //create li
    const newTodo = document.createElement('li');
    
    newTodo.innerText =todo;
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




    });
    
}

function removeLocalTodos(todo){
    if (localStorage.getItem('todos')=== null){
        todos = [];

    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);

    localStorage.setItem("todos" , JSON.stringify(todos));
}