// get elements by class and by tag name
const taskInput = document.querySelector(".task-input input");
const filters = document.querySelectorAll(".filters span");
const clearAll = document.querySelector(".clear-btn");
const taskBox = document.querySelector(".task-box");

// variables for editing managing 
let editId;
let isEditedTask = false;

// variable for todo-list 
let todos = JSON.parse(localStorage.getItem("todo-list"));

// add for each filter button eventlistener  
filters.forEach(btn => {
  btn.addEventListener("click", () => {
    // on click switch active class 
    // on clicked button from previous button 
    document.querySelector("span.active").classList.remove("active");
    btn.classList.add("active");
    showTodo(btn.id);
  });
});

// func for show todo 
// in argument active filter
function showTodo(filter) {
  let li = "";
  if (todos) {
    // iterate over each element 
    todos.forEach((todo, id) => {
      // variable for todo status
      let isCompleted = todo.status == "completed" ? "checked" : "";
      // if filter have status or filter all 
      if (filter == todo.status || filter == "all") {
        // 46 add and asign in variable dynamic tasks 
        // create elem of list task 
        // this id task relate with checkbox
        // on click checkbox - run func "updateStatus" with the context of this object as argument, which make status checkbox completed  

        // 51 create elem div with class settings for 2 func
        // on click rest operator run func showMenu with the context of this object as argument, which show list of func for THIS task
        // create list ul
        // 1 elem of list on click run func "editTsk" which edit by id name of task, this li relate with i elem "pen"
        // 2 elem on click run func, which delete this task, relate with i "trash"
        li += `<li class="task">
                <label for="${id}">
                   <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${isCompleted}>  
                    <p class="${isCompleted}">${todo.name}</p> 
            </label>
            <div class="settings">
               <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
              <ul class="task-menu">
                <li onclick="editTask(${id}, '${todo.name}')"><i class="uil uil-pen"></i>Edit</li>
                <li onclick="deleteTask(${id})"><i class="uil uil-trash"></i>Delete</li>
                   </ul>
               </div>
            </li>`;
      }
    });
  }
  // get for taskBox inner in li or if no task - span title
  taskBox.innerHTML = li || `<span>You don't have any task</span>`;
}
// run func 
showTodo("all");


function showMenu(selectedTask) {
  // pull out of the obj selectedTask parentel (div) and his lastchild (ul) and set in variable
  let taskMenu = selectedTask.parentElement.lastElementChild;
  // add to classlist class "show"
  taskMenu.classList.add("show");
  // on click document 
  document.addEventListener("click", e => {
    // if link of target dont have tagName I or link of target not this obj context 
    if (e.target.tagName != "I" || e.target != selectedTask) {
      // delete class "show"         
      taskMenu.classList.remove("show");
    }
  });
}

// declare func with id and todo.name as args
function editTask(taskId, taskName) {
  // add id to variable editId
  editId = taskId;
  // value in variable becomes true
  isEditedTask = true;
  // set taskName(todo.name) in value of taskInput
  taskInput.value = taskName;
}

// declare func with task's id as arg
function deleteTask(deleteId) {
  // delete by method splice elem deleteId(id) from array todos  
  todos.splice(deleteId, 1);
  // save updates of arr in localstor 
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodo("all");
}

// add event on btn clearAll
clearAll.addEventListener("click", () => {
  // delete all from arr todos 
  todos.splice(0, todos.length);
  // save updates of arr in localstor 
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodo("all");
})

// declare func with context of obj as arg
function updateStatus(selectedTask) {
  // pull out of the obj selectedTask parentel (div) and his lastchild (ul) and set in variable
  let taskName = selectedTask.parentElement.lastElementChild; 
  // if selectedTask has property checked (on click the checkbox status of task is updated)
  if (selectedTask.checked) {
    // then for task name add to classlist class "checked"
    taskName.classList.add("checked"); 
    // and status this elem becomes "completed"
    todos[selectedTask.id].status = "completed";
  } else {
    // or delete class checked
    taskName.classList.remove("checked");
    // and status this elem becomes "pending"
    todos[selectedTask.id].status = "pending";
  }
  // save updates of arr in localstor 
  localStorage.setItem("todo-list", JSON.stringify(todos));
}
// add event to taskInput relate with keyup
taskInput.addEventListener("keyup", e => {
  
  // variable for trimmed from spaces taskInput(inside taskName)
  let userTask = taskInput.value.trim();
  // if keyup enter and userTask has trimmed value
  if (e.key == "Enter" && userTask) {
    // if isEditedTask false (dont change task) 
    if (!isEditedTask) {
      // if todos isnt - create empty array 
      if (!todos) {
        todos = [];
      }
      // create obj with trimmed name and status pending
      let taskInfo = { name: userTask, status: 'pending' };
      // add this task to arr of tasks "todos"
      todos.push(taskInfo);
    } else { 
      // or change value of isEditedTask (because edited)
      isEditedTask = false; 
      // set in todos elem's name trimmed name
      todos[editId].name = userTask;
    }
    // value of var becomes empty
    taskInput.value = "";
    // and save updates in localst, set by key "todo-list" and value arr todos as value (change type to string)
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo("all");
  }
});