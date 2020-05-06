
const taskInput = document.querySelector('.task-input'); 
const todoButton = document.querySelector('.add-button');
const todoList = document.querySelector('.todo-list');

document.addEventListener('DOMContentLoaded',getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click',checkButton);

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


    
    const todoDiv = document.createElement("div"); //crating the todo div
    todoDiv.classList.add("todo");

    
    const newTodo = document.createElement('li'); //crating li
    
    newTodo.innerText =taskInput.value; //getting the inputvalue from the user 
    newTodo.classList.add("todo-item"); 

    todoDiv.appendChild(newTodo); // appending the li into the todo div

    saveLocalTodos(taskInput.value);

    

    const completedButton = document.createElement('button'); //creating button for checked functionality
    completedButton.innerText = 'Checked';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    
    const trashButton = document.createElement('button'); //creating button to delete the tasks
    trashButton.innerText = 'Remove';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //append to list

    todoList.appendChild(todoDiv);

    taskInput.value=""; //resetting the value of the input field
}


function checkButton(e){

    const item = e.target; // getting the selected item
    
    if (item.classList[0] === "trash-btn"){ //if the item seleted is a trash button
        const todo = item.parentElement;
        removeLocalTodos(todo);
        todo.remove();
    }
    // check mark
    if(item.classList[0]=== "complete-btn"){ //if the item selected is a complete button
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }


}
//to save the list in the loal storage
function saveLocalTodos(todo){
    
    
    if (localStorage.getItem('todos')=== null){ //if the storage is null
        todos = [];

    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo); //oushing the list to todo
    localStorage.setItem('todos',JSON.stringify(todos)); //saving the items in the local storage
}

//getting the list from the local storage
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
//function to remove items from the todolist
function removeLocalTodos(todo){
    if (localStorage.getItem('todos')=== null){
        todos = [];

    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;//getting the index of the selected item
    todos.splice(todos.indexOf(todoIndex),1); //using splice to delete the selected item

    localStorage.setItem("todos" , JSON.stringify(todos)); //updating the list
}