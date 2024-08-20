document.addEventListener("DOMContentLoaded",()=>{
    let savedStorage = JSON.parse(localStorage.getItem("todo_list"))

if(savedStorage){
    savedStorage.forEach((todo)=>{
        todo_list.push(todo)
    })
}
renderTodo()
updateStats()
})



let todo_list =[];

const localSave =()=>{
    localStorage.setItem("todo_list",JSON.stringify(todo_list));
}

document.getElementById("add-btn").addEventListener("click",function(e){
    e.preventDefault();
    addTodo();
})

let addTodo=()=>{

    const input = document.getElementById("input-box");
    const value = input.value.trim();
    if(value){
    todo_list.push({
        text:value,
        completed:false
    })
}
    renderTodo();

    updateStats()

    localSave()
}



let toggleCompleteTask=(index)=>{
    todo_list[index].completed=!todo_list[index].completed;
    
    renderTodo();
    updateStats();
    localSave();
}

let deleteTodo=(index)=>{
        todo_list.splice(index,1);
        renderTodo();
        updateStats();
        localSave();
}

let editTodo=(index)=>{
    const input = document.getElementById("input-box");
    input.value=todo_list[index].text;
    
    todo_list.splice(index,1)
    renderTodo();
    updateStats();
    localSave();
}

let updateStats=()=>{
    let totalTask = todo_list.length;
    let completedTask = todo_list.filter(todo=>todo.completed).length;

    let progressPercent = (completedTask/totalTask)*100;
    console.log(progressPercent)
    const progress = document.getElementById("progress");
    progress.style.width=`${progressPercent}%`

    const numbers = document.getElementById("numbers");
    numbers.innerText=`${completedTask}/${totalTask}`;
    
    if(progressPercent==100){
        celebrateConfetti();
    }
    
}


let renderTodo=()=>{
    const todoContainer = document.getElementById("todo-cont");
    todoContainer.innerHTML='';

    todo_list.forEach((todo,index)=>{
        const newTodo = document.createElement("div");
        newTodo.innerHTML=`
        <div class="task-cont">

        <div class="task ${todo.completed?"completed":''}">
        <input type="checkbox"onChange="toggleCompleteTask(${index})" class="check" ${todo.completed?"checked":''}>
        <p>${todo.text}</p>
        </div>

        <div class"buttons">
        <button class="edit-btn" onClick="editTodo(${index})">Edit</button>
        <button class="del-btn" onClick="deleteTodo(${index})">Delete</button>
        </div>
        </div>
        `;

   
    todoContainer.appendChild(newTodo);

    
    })
}

let celebrateConfetti=()=>{
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
}