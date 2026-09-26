let prevLiId = 0;
let todoItems = [];

function checkForValue(value){
    for (let i=0; i<todoItems.length; i++){
        if (todoItems[i].text === value) return true;
    }
    return false;
}
function addItem(){
    const todoValue = document.getElementById('todoInput').value.trim();
    if (!todoValue) return;
    else if (checkForValue(todoValue)) window.alert(`${todoValue} already exists`);
    else{
        addLi(todoValue, prevLiId);
        prevLiId ++;
    }
}
// calling addItem function if enter is pressed:
const todoInput = document.getElementById('todoInput').onkeypress = function(e){
    if (!e) e = window.event;
    const keyCode = e.code || e.key;
    if (keyCode == 'Enter'){
        addItem();
    }
  }
// calling addItem function if button is pressed:
const addTodoBtn = document.querySelector('.addTodoBtn');
addTodoBtn.addEventListener('click', addItem);

function addLi(newTodo, liIndex){
    const todos = document.querySelector('.todosList');
    const newChild = document.createElement('li');
    newChild.id = `todoItem${liIndex}`;
    newChild.className = 'todoItem';
    
    newChild.innerHTML = `
    <input type="checkbox" class="todoCheckbox">
    <h3 class="todo" id="todo${liIndex}">${newTodo}</h3>
    <i class="fa-solid fa-trash deleteTodoBtn" id="deleteTodoBtn${liIndex}"></i>`;
    todos.appendChild(newChild);

    todoItems.push({text: newTodo,
            state: "unfinished"});
    // create event listeners for each checkbox
    newChild.querySelector('.todoCheckbox').addEventListener('click',()=>{
        currentStatus = todoItems[todoItems.length - 1]
        //console.log(currentStatus.state)
        if (currentStatus.state === "finished"){
            currentStatus.state = "unfinished";
        }
        else if (currentStatus.state === "unfinished"){
            currentStatus.state = "finished";
        }   
        //console.log(currentStatus.state)     
    })
    //console.log(todoItems)
}

// creating even delegation
function globalEvenListener(event, selector, cb, parent){
    parent.addEventListener(event, (e)=>{
        if (e.target.matches(selector)){
            cb(e.target);
        }
    })
}

function removeLi(li){
    li = li.parentElement;
    todoTextContent = li.querySelector('h3').textContent;
    elementIndex = todoItems.findIndex(value => value.text === todoTextContent);
    //console.log(elementIndex)
    todoItems.splice(elementIndex, 1);
    //console.log(todoItems)
    li.remove();
}

globalEvenListener('click', '.deleteTodoBtn', removeLi, document.querySelector('.todosList'))


