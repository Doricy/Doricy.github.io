//referencing the form
const form = document.getElementById("n-form");
const input = document.getElementById("n-input");
const todo_list = document.querySelector(".todo_list");
const toggler= document.querySelector(".toggler");
const closebtn = document.querySelector(".close");

const checkbtn = document.querySelector(".checkedbox");

//assign event listeners to elements
//gets current todo's in the storage
document.addEventListener("DOMContentLoaded", getLocalTodos);
//assign event listener to elements
form.addEventListener("submit", createTodo)
toggler.addEventListener("click", darkmodechanger);
todo_list.addEventListener("click", delorcheck);



//function to add todo
function createTodo(e){
    //prevents the page from refreshing
    e.preventDefault();

    //creates an element()with its corresponding class
const todoDiv = document.createElement("div")
todoDiv.classList.add("todo");
const todoSection= document.createElement("section");
const checkButton = document.createElement("button")
checkButton.classList.add("checkedbox");       
checkButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg>'
const closeButton = document.createElement("button")
closeButton.classList.add("close");
closeButton.innerHTML= '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>'
const todo_item = document.createElement("li")
todo_item.classList.add("todo_item");



//restructuring elements
todoDiv.appendChild(todoSection);
todoDiv.appendChild(closeButton);
todoSection.appendChild(checkButton);
todoSection.appendChild(todo_item);

//adding new text to the todo-list
todo_item.innerText=input.value;


//adds new items to the todo_list
todo_list.prepend(todoDiv);


//addinf to local storage
saveLocalTodos(input.value);

//clears the input after assigning it
input.value = "";



}


function delorcheck(e){
    
    const item = e.target;
    const todo = item.parentElement;
    console.log(item);
    if(item.classList[0]==="close"){
        
        console.log("nnnnnnnnnnn");
        removeLocalTodos(todo);
        //removes actual element
        todo.remove();
    }   
    if(item.classList[0]==="checkedbox"){
         
        item.classList.toggle("checked")

        const svg = item.getElementsByTagName("svg")[0]
        svg.classList.toggle("checked")

        todo_item = item.nextElementSibling;
        todo_item.classList.toggle("checked");
        todo.parentElement.classList.toggle("checked");
    }

}






function darkmodechanger(){
    document.documentElement.classList.toggle("darkmode");
    toggler.classList.toggle("iconchange");

    console.log("hi")

    
}

function saveLocalTodos(todo) {
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
      //updating local storage with current todos
    localStorage.setItem("todos", JSON.stringify(todos));
}
//only runs when the page refreshes
function getLocalTodos() {
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
        todos = todos.reverse();
    }

    //creates elements for the todo including the styling
    todos.forEach(function(todo) {
        const todoDiv = document.createElement("div")
        todoDiv.classList.add("todo");
        const todoSection= document.createElement("section");
        const checkButton = document.createElement("button")
        checkButton.classList.add("checkedbox");       
        checkButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg>'
        const closeButton = document.createElement("button")
        closeButton.classList.add("close");
        closeButton.innerHTML= '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>'
        const todo_item = document.createElement("li")
        todo_item.classList.add("todo_item");

        //restructuring elements
        todoDiv.appendChild(todoSection);
        todoDiv.appendChild(closeButton);
        todoSection.appendChild(checkButton);
        todoSection.appendChild(todo_item);
        
        
        //adding new text to the todo-list
        todo_item.innerText=todo;
        todo_list.prepend(todoDiv);

    });
}

function removeLocalTodos(todo) {
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
//todo.children (section)
    const todoIndex = todo.children[0].innerText;
    
    todos.splice(todos.indexOf(todoIndex), 1);
    //apply the changes to your local storage
    localStorage.setItem("todos", JSON.stringify(todos));
}