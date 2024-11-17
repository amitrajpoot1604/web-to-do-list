

   
// localStorage.clear();

// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos())
todoButton.addEventListener("click", addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);


//Functions
function addTodo(event)
{
   event.preventDefault(); // prevent form from submitting


   // Todo DIV
   const todoDiv = document.createElement('div');
   todoDiv.classList.add('todo');

   //Create LI
   const newTodo = document.createElement('li');
   newTodo.innerText = todoInput.value;
   newTodo.classList.add('todo-item');

   todoDiv.appendChild(newTodo);

   //Check mark button
   const completedButton = document.createElement('button');
   completedButton.innerHTML = '<i class="fas fa-check"></i>';
   completedButton.classList.add('completed-btn');
   todoDiv.appendChild(completedButton);

   //Trash Button
   const trashButton = document.createElement('button');
   trashButton.innerHTML = '<i class="fas fa-trash"></i>';
   trashButton.classList.add('trash-btn');
   todoDiv.appendChild(trashButton);

   //Append to List
   todoList.appendChild(todoDiv);


   // Add Todo to LocalStorage
   saveLocalTodos(todoInput.value);

   // Clear Todo input value
   todoInput.value = "";
}

function deleteCheck(event)
{
   const item = event.target;

   // Delete Todo
   if (item.classList[0] === 'trash-btn')
   {
       const todo = item.parentElement;
       //Animation
       todo.classList.add("fall");

       //remove from local storage too
       removeLocalTodos(todo);

       todo.addEventListener('transitionend', () =>
       {
           todo.remove();
       });
   }

   // Check Mark
   if (item.classList[0] === 'completed-btn')
   {
       const todo = item.parentElement;
       todo.classList.toggle('completed');
       // console.log(todo.innerText);
   }
}

function filterTodo(event)
{
   const todos = todoList.childNodes;
   // console.log(todos);
   todos.forEach(function (todo)
   {
       // console.log(todo)
       // console.log(event.target.value);
       // console.log(todo.classList.constains('completed'))
       switch (event.target.value)
       {
           case "all":
               todo.style.display = 'flex'
               break;
           case "completed":
               if (todo.classList.contains('completed'))
               {
                   todo.style.display = 'flex';
               }
               else
               {
                   todo.style.display = 'none';
               }
               break;
           case "uncompleted":
               if (!todo.classList.contains('completed'))
               {
                   todo.style.display = 'flex';
               }
               else
               {
                   todo.style.display = 'none';
               }
               break;
       }
   })
}


// Saves all the logs locally
function saveLocalTodos(todo)
{
   let todos = [];
   if (localStorage.getItem("todos") === null)
   {
       // todo = [];
   }
   else
   {
       todos = JSON.parse(localStorage.getItem("todos"));
   }
   todos.push(todo);
   localStorage.setItem("todos", JSON.stringify(todos));
}


// Getting the earlier todos from local storage to the main UI.
function getTodos()
{
   let todos = [];
   if (localStorage.getItem("todos") === null) { }
   else
   {
       todos = JSON.parse(localStorage.getItem("todos"));
   }

   todos.forEach((todo) =>
   {
       // Copy things from above

       // Todo DIV
       const todoDiv = document.createElement('div');
       todoDiv.classList.add('todo');

       //Create LI
       const newTodo = document.createElement('li');
       newTodo.innerText = todo;
       newTodo.classList.add('todo-item');

       todoDiv.appendChild(newTodo);

       //Check mark button
       const completedButton = document.createElement('button');
       completedButton.innerHTML = '<i class="fas fa-check"></i>';
       completedButton.classList.add('completed-btn');
       todoDiv.appendChild(completedButton);

       //Trash Button
       const trashButton = document.createElement('button');
       trashButton.innerHTML = '<i class="fas fa-trash"></i>';
       trashButton.classList.add('trash-btn');
       todoDiv.appendChild(trashButton);

       //Append to List
       todoList.appendChild(todoDiv);

   })
}

function removeLocalTodos(todo)
{
   let todos = [];
   if (localStorage.getItem("todos") === null) { }
   else
   {
       todos = JSON.parse(localStorage.getItem("todos"));
   }

   // console.log(todo.children[0].innerText);
   // console.log(todos.indexOf("chocolate"))

   const todoIndex = todo.children[0].innerText;
   todos.splice(todos.indexOf(todoIndex), 1);

   localStorage.setItem("todos", JSON.stringify(todos));

}

