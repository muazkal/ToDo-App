const newToDoInputBttn = document.querySelector('#newToDoInputBttn');
const newToDoInputTxt = document.querySelector("#newToDoInputTxt");

const toDoItemsDiv = document.querySelector(".toDoItems");
const toDoItemLeft = document.querySelector("#toDoItemLeft");
const toDoItemRight = document.querySelector("#toDoItemRight");

const tasksSearchBox = document.querySelector("#toDoItemSearch");
const showCompletedCheck = document.querySelector("#showCompletedCheck")

let taskList = JSON.parse(localStorage.getItem('tasks')) || []

newToDoInputBttn.addEventListener("click",  (event) => {
    event.preventDefault();

    makeNewToDoItem(newToDoInputTxt.value)
    

})

function renderTasks(tasksArray) {

    toDoItemsDiv.innerHTML = "";

    tasksArray.forEach((task) => {

        const newToDoItem = document.createElement('div');
        newToDoItem.id = "toDoItem";

        toDoItemsDiv.appendChild(newToDoItem);

            
        const newToDoItemLeft = document.createElement('div');
        const newToDoItemRight = document.createElement('div');

        const newCheck = document.createElement('input')
        newCheck.type = 'checkbox';
        newCheck.name = 'checkComplete';
        newCheck.id = 'checkComplete';
        newCheck.value = 'itemComplete';
        newCheck.checked = task.completed;

        // Left elements
        const newItemTitle = document.createElement("div");
        newItemTitle.id = 'listItemTitle';
        newItemTitle.textContent = task.task;

        // Append left elements
        newToDoItem.appendChild(newToDoItemLeft);
        newToDoItemLeft.appendChild(newCheck);
        newToDoItemLeft.appendChild(newItemTitle);
        newToDoItemLeft.id = 'toDoItemLeft';

        // Right Elements
        const newDeleteBttn = document.createElement('img');
        newDeleteBttn.id = 'deleteBttn';
        newDeleteBttn.src = "images/Delete.svg"

        const newEditBttn = document.createElement('img')
        newEditBttn.id = 'editBttn';
        newEditBttn.src = "images/Edit.svg"

        // Append right elements
        newToDoItem.appendChild(newToDoItemRight);
        newToDoItemRight.appendChild(newDeleteBttn);
        newToDoItemRight.appendChild(newEditBttn);
        newToDoItemRight.id = 'toDoItemRight';

        // Delete todo item functionality

        newDeleteBttn.addEventListener("click", () => {

            // remove item from array
            taskList = taskList.filter(t => t.id !== task.id)

            // update local storage
            localStorage.setItem('tasks', JSON.stringify(taskList));

            // re-render tasks
            filterArray();

        })

        // checkbox funtionality
        newCheck.addEventListener("change", () => {
            task.completed = newCheck.checked;
            localStorage.setItem('tasks', JSON.stringify(taskList));
            filterArray();
        })

        // edit task button functionality 
        newEditBttn.addEventListener("click", () => {
            const newTaskTitle = prompt("Enter new task name...");
            newItemTitle.textContent = newTaskTitle;
            task.task = newTaskTitle;
            localStorage.setItem('tasks', JSON.stringify(taskList));
        })

    })

}

function makeNewToDoItem(task) {
    
    taskList.push({
        id: Date.now(),
        task: task,
        completed: false
    })

    localStorage.setItem('tasks', JSON.stringify(taskList));

    filterArray()

}


// filter tasks array

// render filtered search
showCompletedCheck.addEventListener("change", filterArray)
tasksSearchBox.addEventListener("input", filterArray);

function filterArray() {
    let filtered = [...taskList];
    const searchValue = tasksSearchBox.value.toLowerCase();

    if(searchValue) {
        filtered = filtered.filter(task =>
            task.task.toLowerCase().includes(searchValue)
        )
    }

    if(showCompletedCheck.checked) {
        filtered = filtered.filter(task => task.completed)
    }

    renderTasks(filtered)
}

// Initial render with tasks saved in the localStorage 
filterArray();

// theme picker
const themePicker = document.querySelector("#themePicker");
const bodyElement = document.body;


themePicker.addEventListener("click", () => {
    bodyElement.classList.toggle("dark-theme")

    if (bodyElement.classList.contains("dark-theme")) {
        themePicker.src = "images/moon.svg"
        localStorage.setItem("theme", "dark-theme")
    } else {
        themePicker.src = "images/sun.svg"
        localStorage.setItem("theme", "light-theme");
    }
})

// set saved theme on load 

let savedTheme = localStorage.getItem("theme")

if (savedTheme === "dark-theme") {
    bodyElement.classList.add("dark-theme");
    themePicker.src = "images/moon.svg"
    
} else {
    themePicker.src = "images/sun.svg"
    bodyElement.classList.remove("dark-theme");
    
}

console.log(bodyElement.className);
