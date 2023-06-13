//referencing html elements
const form = document.getElementById("n-form");
const input = document.getElementById("n-input");
const todo_list = document.querySelector(".todo_list");
const toggler= document.querySelector(".toggler");
const counter= document.querySelector(".counter");
const filterbuttons = document.querySelector(".filterContainer");
const clearBtn = document.querySelector(".clrBtn")



//assign event listeners to elements

for(let i=0; i<3; i++){
    filterbuttons.children[i].addEventListener("click",filterTodo)

}
document.addEventListener("DOMContentLoaded", getLocalTodos);
form.addEventListener("submit", createTodo)
toggler.addEventListener("click", darkmodechanger);
todo_list.addEventListener("click", delorcheck);
clearBtn.addEventListener("click",clearTodos)
todo_list.addEventListener("dragover", dragOver);



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

    todoDiv.setAttribute("draggable",true)
    todoDiv.addEventListener("dragstart",()=>{todoDiv.classList.add("dragging")})
    todoDiv.addEventListener("dragend",dragEnd)
    //adds new items to the todo_list
    todo_list.prepend(todoDiv);


    //addinf to local storage
    saveLocalTodos(input.value);

    //clears the input after assigning it
    input.value = "";

    remainingTodo()

}

//delete and check function combined
function delorcheck(e){
    
    const item = e.target;
    const todo = item.parentElement;
    
    if(item.classList[0]==="close"){
        
        console.log("nnnnnnnnnnn");
        removeLocalTodos(todo);
        //removes actual element
        todo.remove();
        remainingTodo();
    }   
    if(item.classList[0]==="checkedbox"){
         
        item.classList.toggle("checked")

        const svg = item.getElementsByTagName("svg")[0]
        svg.classList.toggle("checked")

        const todo_item = item.nextElementSibling;
        todo_item.classList.toggle("checked");
        todo.parentElement.classList.toggle("checked");

        let todos;
        if(localStorage.getItem("todos") === null) {
            todos = [];
        } else {
            todos = JSON.parse(localStorage.getItem("todos"));
            
        }

        todos.forEach(function(todo){
            console.log(todo[0])
            console.log(todo_item.innerText)
            if (todo[0] == todo_item.innerText){
                if(todo[1] == "active"){
                    todo[1] = "completed"
                }else{
                    todo[1] = "active"
                }
            }
        })
        localStorage.setItem("todos", JSON.stringify(todos));

        remainingTodo();
    }

}

//function to filter todos based on completed or active
function filterTodo(e){
    
    const btn = e.target
    const todos = todo_list.querySelectorAll(".todo");
   
    if(btn.innerHTML === "Active"){
        todos.forEach(function(todo) {
            if(!todo.classList.contains("checked")) {
                todo.style.display = "flex";
            } else {
                todo.style.display = "none";
            }

            //apply active styling
            const btns = btn.parentElement.querySelectorAll("li")
            btns.forEach(function(b) {
                b.classList.remove("checked")
            })
            btn.classList.add("checked")


    })}else if(btn.innerHTML === "Completed"){
        todos.forEach(function(todo) {
            if(todo.classList.contains("checked")) {
                todo.style.display = "flex";
            } else {
                todo.style.display = "none";
            }

            //apply active styling
            const btns = btn.parentElement.querySelectorAll("li")
            btns.forEach(function(b) {
                b.classList.remove("checked")
            })
            btn.classList.add("checked")
    })}else{
        todos.forEach(function(todo) {
            todo.style.display = "flex";

            //apply active styling
            const btns = btn.parentElement.querySelectorAll("li")
            btns.forEach(function(b) {
                b.classList.remove("checked")
            })
            btn.classList.add("checked")
            })
    }
   
}

//light and dark mode toggle
function darkmodechanger(){
    document.documentElement.classList.toggle("darkmode");
    toggler.classList.toggle("iconchange");

}

//function to save todos to localstorage
function saveLocalTodos(todo) {
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push([todo,"active"]);
      //updating local storage with current todos
    localStorage.setItem("todos", JSON.stringify(todos));
}
//function to fetch todos from localstorage on page load
function getLocalTodos() {

    //display mode based on time
    var today = new Date;
    if (today.getHours() >= 18){
        darkmodechanger();
    }

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
        
        //apply completed styling if todo is completed
        if(todo[1] == "completed"){
            todoDiv.classList.add("checked")
            checkButton.classList.add("checked")
            checkButton.children[0].classList.add("checked")
            todo_item.classList.add("checked")
        }

        //adding new text to the todo-list
        todo_item.innerText = todo[0];

        todoDiv.setAttribute("draggable",true)
        todoDiv.addEventListener("dragstart",()=>{todoDiv.classList.add("dragging")})
        todoDiv.addEventListener("dragend",dragEnd)

        todo_list.append(todoDiv);
        remainingTodo();

    });
}


//remove todos from localstorage upon delete
function removeLocalTodos(todo) {
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    const todo_value = todo.children[0].innerText;

    //fetch index of 2d array
    const todoIndex = todos.findIndex((i) => {
        if(i.includes(todo_value)){
            return true
        }
    }) 
    //remove item based on its index
    todos.splice(todoIndex, 1);
    //apply the changes to your local storage
    localStorage.setItem("todos", JSON.stringify(todos));
}

//count and display active todos
function remainingTodo(){
    const todos= todo_list.querySelectorAll(".todo");
    var count = 0;
    todos.forEach(function(todo){

        if (!todo.classList.contains("checked")){
            count++;
        }
    })
    counter.innerHTML = count + " items left";
}

//delete completed todos
function clearTodos(){
    let todos;
    if(localStorage.getItem("todos")===null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    const todo_items = todo_list.querySelectorAll(".todo");

    todo_items.forEach(function(todo){
    if (todo.classList.contains("checked")){
        todo.remove();

        const todo_value = todo.children[0].innerText;

        //fetch index of 2d array
        const todoIndex = todos.findIndex((i) => {
            if(i.includes(todo_value)){
                return true
            }
        }) 
        //remove item based on its index
        todos.splice(todoIndex, 1);
        localStorage.setItem("todos", JSON.stringify(todos));
        }
    })
    
    remainingTodo();
}


function dragOver(e){
    e.preventDefault()
    const draggable = document.querySelector(".dragging")
    const afterElement = getAfterElement(e.clientY)
    if (afterElement == null) {
        todo_list.appendChild(draggable)
    }else{
        todo_list.insertBefore(draggable,afterElement)
    }
}

function getAfterElement(y){
    const elements = [...todo_list.querySelectorAll(".todo:not(.dragging)")]
    
    
    return elements.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = y - box.top -box.height/2
        if(offset < 0 && offset >closest.offset){
            return{offset:offset,element:child}
        }
        else{
            return closest
        }
    },{offset:Number.NEGATIVE_INFINITY}).element
}

function dragEnd(e){
    //remove dragging effect
    e.target.classList.remove("dragging")

    //update localstorage with current arrangements
    let todos = [];
    const newlist = [...todo_list.querySelectorAll(".todo")]
    newlist.forEach((item)=>{
        if (item.classList[1] == "checked"){
            todos.push([item.children[0].children[1].innerText,"completed"])
        }else{
            todos.push([item.children[0].children[1].innerText,"active"])
        }
    })

    todos = todos.reverse()
    
    localStorage.setItem("todos", JSON.stringify(todos));
   
}