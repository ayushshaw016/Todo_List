let tasks = [];
const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');

// Fetching the todos using API cal
function fetchTodos(){
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then (function (response){
        // console.log(response); // converting the response object into promise
        return response.json(); // also return a promise
    }).then(function (data){
        // console.log(data);
        tasks = data.slice(0,3)
        renderList();
    })
}
function addTasktoDom(task){
const li = document.createElement('li');
li.innerHTML = `
        
          <input type="checkbox" id="${task.id}" data-id="${task.id}" ${task.completed ? 'checked':''} class="custom-checkbox">
          <label for="${task.id}">${task.title}</label>
          <img src="bin.png" class="delete" data-id="${task.id}" />
        
`;
taskList.append(li);
}

function renderList () {
    taskList.innerHTML = '';
    for(let i =0; i<tasks.length; i++){
        addTasktoDom(tasks[i]);
    }
    tasksCounter.innerHTML = tasks.length;
}

function markTaskAsComplete (taskId) {
    const task = tasks.filter(function(task){
        return task.id === Number(taskId); 
    })
    if(task.length > 0){
        const currenttask = task[0];
        currenttask.completed = !currenttask.completed;
        renderList();
        showNotification("Changes done successfully");
        return;

    }
    showNotification("No task to make changes");
}

function deleteTask (taskId) {
    // us task ko remove krdege jiski taskId ki match ho jayegi
    // wo sari task add hojayengi newtasks me jiski id match nhi hongi;
    const newtasks = tasks.filter(function(task){
        return task.id !== Number(taskId); 
    })
    tasks = newtasks;
    renderList();
    showNotification('Task deleted Successfully!!');
}

function addTask (task) {
    // adding the task function in the tasks array
    if(task){
    tasks.push(task);
    // calling the render function
    renderList();
    showNotification('Task Successfully Added');
    return;
    }
    // If not any task is present then show the message that
    showNotification('Task can not be added');
}

function showNotification(inputtext) {
    alert(inputtext);
}
function inputkeyhandle(e){
    if(e.key =='Enter'){
        const inputtext = addTaskInput.value;
        console.log(inputtext);

    if(!inputtext){
        showNotification('Can not be empty');
    }
    const task = {
        title: inputtext,
        id :Date.now(),
        completed : false,
    }
    addTaskInput.value = "";
    addTask(task);
}

}
function handleclicklistener(e){
    const target = e.target;
    if(target.className === 'delete'){
const taskid = target.dataset.id;
deleteTask(taskid);
return;
    }
    else if(target.className === 'custom-checkbox'){
        const taskid = target.id;
markTaskAsComplete(taskid);
return;
    }
}
function initializeApp(){
    fetchTodos();
    addTaskInput.addEventListener('keyup', inputkeyhandle);
    document.addEventListener('click', handleclicklistener);
}
initializeApp();
