// Function to target elements
function target(id) {
    return document.getElementById(id);
}

// Targeting elements
const input = target('todoInput');
const timeInput = target('timeInput');
const list = target('todoList');
const addBtn = target('addBtn');
const filterBtns = document.querySelectorAll('.filters button');

//Loading the list data from the localStorage 

let todos = JSON.parse(localStorage.getItem('todos')) || [];

//Initial state value of filter
let filter = 'all';

//For repeatedly saving the data into the localStorage
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

//To check whether a todo task's execution time has already passed..

function isOverdue(todo) {
    //if a the task has no time limit then can not be overdue and if it is already done then we don't care whether it is overdue or not. so return false.
    if (!todo.time || todo.done) return false;

    //Capturing current time
    const now = new Date();
    //split the time of todo task at ":" and which will make an array having 2 values one is hours and anothor is minutes. Store them into 2 different variables by destructuring
    const [h, m] = todo.time.split(':');

    //Capturing current time into due and modify the pre-assigned due time so that i can check by comparing it with the current time whether the task is overdued or not
    const due = new Date();
    due.setHours(h, m, 0, 0);
    return now > due;
}


//It'll rebuild the visible todo list from the current application state(todos + filter) everytime something changes.
function getVisibleTodos() {


    //Sorting the todo array using more like a "Timsort" algorithm structure where we compare a.time with b.time. if a.time is smaller compared to b.time then it'll return a -ve number and a.time has to remain before b.time and if a.time is larger than b.time then it'll return a positive number and a.time will be moved infront of b.time.

    ////From the sorted todos, picking the ones I want to show by using ".filter()", then render each one into the DOM by using ".forEach()".
    return todos.slice().sort((a, b) => {
        if (!a.time && !b.time) return 0;
        if (!a.time) return 1;
        if (!b.time) return -1;
        return a.time.localeCompare(b.time);
    }).filter(t =>
        filter === 'all' ||
            (filter === 'active' && !t.done) ||
            (filter === "completed" && t.done)
    );
}

function render() {
    //This will clear the list screen first so that there would be no duplicate value issues

    //Forget the old UI, I'll redraw everyting from scratch
    list.innerHTML = '';
    const visibleTodos = getVisibleTodos();

    visibleTodos.forEach(todo => {
        //Create a new list element
        const li = document.createElement('li');

        //Assign an id to it which is exactly the current todo task's id
        li.dataset.id = todo.id;

        //Give it a class name which will explain that whether it's done executed or not and is overdue or not. Here condition and 'value' approach is used. That means in [todo.done && 'done'] if condition todo.done is truthy then it'll return a value 'done', if conditon is falsy then return the condition itself. Here li.className will return you an array having two values like li.className = ['value', 'value];

        //.filter(Boolean) removes all falsy values like false, null, undefined, 0, "", NaN etc. so result would be:

        //["done", false]        → ["done"]
        // [false, "overdue"]     →["overdue"]
        // ["done", "overdue"]    →["done", "overdue"]
        // [false, false]         →[]

        //.join('') turns array -> string with spaces
        // ["done"]             → "done"
        // ["overdue"]          → "overdue"
        // ["done", "overdue"]   → "done overdue"
        // []                   → ""



        //Basically this is newer version of this code
        // let classes = '';

        // if (todo.done) classes += 'done ';
        // if (isOverdue(todo)) classes += 'overdue ';

        // li.className = classes.trim();

        li.className = [
            todo.done && 'done',
            isOverdue(todo) && 'overdue'
        ].filter(Boolean).join(' ');

        // If todo.time exists / is truthy → compute and return a formatted time
        // If todo.time is missing / empty / null → return an empty string ''

        //JavaScript Date requires a full date + time format and we only have a time. So we've attached the time to a dummy date which is 1970-01-01

        //.toLocaleTimeString converts the Date into a human-readable time string. Here [] is locale which uses user's default locale.. which ensures converting the global timing into locale timing

        const displayTime = todo.time ? new Date(`1970-01-01T${todo.time}`).toLocaleTimeString([], {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        }) : '';

        li.innerHTML = `
          <input type="checkbox" ${todo.done ? 'checked' : ''}>

        <div style="flex:1">
          <p>${todo.text}</p>
          ${displayTime ? `<div class="meta">Finish by <span class="time">${displayTime}</span></div>` : ''}
        </div>
        <div class="actions">
          <button class="delete">✕</button>
        </div>
      `;
      list.appendChild(li);
    });
}

//Instead of adding listeners to every checkbox and button we've
// Attached one listener
// Let events bubble
// Detect intent

list.addEventListener('click', (e) => {
    //Identifying which todo was clicked
    const li = e.target.closest('li');
    if(!li) return;

    const id = Number(li.dataset.id);
    const todo = todos.find(t=> t.id === id);

    if(e.target.type === 'checkbox') {
        todo.done = e.target.checked;
    }

    if(e.target.classList.contains('delete')){
        todos = todos.filter(t => t.id !== id);
    }

    saveTodos();
    render();
});

addBtn.addEventListener('click', ()=>{
    const text = input.value.trim();
    if(!text) return;

    todos.push({
        id: Date.now(),
        text,
        time: timeInput.value,
        done: false
    });

    input.value = '';
    timeInput.value = '';
    saveTodos();
    render();
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', ()=>{
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        filter = btn.dataset.filter;
        render();
    });
});

//Initial rendering
render();




