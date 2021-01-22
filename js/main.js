//! Short getEle
function getEle(id){
    return document.getElementById(id);
}
var today = new Date();
var date = "Ngày " + today.getDate()+' Tháng '+(today.getMonth()+1)+' Năm '+today.getFullYear();
getEle('dateNow').innerHTML = date;
var _taskList = new taskList();
var valid = new validation();
var idCard = _taskList.arr.length + 1;
getLocalStorage();
function AddTask(event){
    event.preventDefault();
    var cardInput = getEle('newTask').value;
    if(valid.checkEmpty(cardInput)){
        var task = new createTask(cardInput, idCard);
        var checkDup = valid.doubling(_taskList.arr, cardInput);
        if(checkDup){
            _taskList.addTask(task, idCard);
            _taskList.sortId();
            console.log(_taskList.arr);
            createList(_taskList.arr);
            setLocalStorage();
            
        }
    }
    console.log(_taskList.arr);

}

function createList(taskList){
    var contentTodo = "";
    var contentCompleted = "";
    if(taskList.length <= 0){
        getEle('todo').innerHTML = "";
        getEle('completed').innerHTML = "";
    }
    else{
        for(var i = 0; i < taskList.length; i++){
            if(taskList[i].status == 0){
                contentTodo += `
                <li>
                    <span>${taskList[i].taskValue}</span>
                    <div class="buttons">
                        <button class="remove" onclick="deleteToDo(${taskList[i].idTask})">
                            <i class="fa fa-trash-alt"></i>
                        </button>
                        <button class="complete" onclick="editButton(${taskList[i].idTask})">
                            <i class="far fa-edit"></i>
                        </button>
                        <button class="complete" onclick="changeStatus(${taskList[i].idTask})">
                            <i class="far fa-check-circle"></i>
                            <i class="fas fa-check-circle"></i>
                        </button>
                        
                    </div>
                </li>
                `;
            }
            else{
                contentCompleted += `
                <li>
                    <span>${taskList[i].taskValue}</span>
                    <div class="buttons">
                    <button class="remove" onclick="deleteToDo(${taskList[i].idTask})">
                        <i class="fa fa-trash-alt"></i>
                    </button>
                    <button class="complete" onclick="editButton(${taskList[i].idTask})">
                            <i class="fas fa-edit"></i>
                        </button>
                    <button class="complete" onclick="changeStatus(${taskList[i].idTask})">
                        <i class="far fa-check-circle"></i>
                        <i class="fas fa-check-circle"></i>
                    </button>
                    </div>
                </li>
                `;
            }
        }
        getEle('todo').innerHTML = contentTodo;
        getEle('completed').innerHTML = contentCompleted;
    }
    
}
function changeStatus(idTask){
    _taskList.changeStatus(idTask);
    createList(_taskList.arr);
    setLocalStorage();
}

function deleteToDo(idTask){
    _taskList.deleteTask(idTask);
    _taskList.sortId();
    createList(_taskList.arr);
    ;setLocalStorage();
}
function setLocalStorage(){
    var arrString = JSON.stringify(_taskList.arr);
    localStorage.setItem("TaskList", arrString);
}
function getLocalStorage(){
    if(localStorage.getItem("TaskList")){
        _taskList.arr = JSON.parse(localStorage.getItem("TaskList"));
        createList(_taskList.arr);
    }
}

function editButton(idTask){
    var taskCurrent = _taskList.getTask(idTask);
    console.log(taskCurrent);
    getEle('card__add').innerHTML = `
        <input
        id="newTask"
        type="text"
        placeholder="Enter an activity..."
        value=""
        />
        <button type="button" onclick="editTask(${idTask});" id="addItem">
            <i class="fas fa-edit"></i>
        </button>
    `;
    getEle('newTask').value = taskCurrent.taskValue;
}

function editTask(idTask){
    var newTaskValue = getEle('newTask').value;
    var taskCurrent = _taskList.getTask(idTask);
    valid.checkEmpty(newTaskValue);
    valid.doubling(_taskList.arr, newTaskValue);
    if(valid.checkEmpty(newTaskValue) && valid.doubling(_taskList.arr, newTaskValue)){
        var task = new createTask(newTaskValue, taskCurrent.idTask, taskCurrent.status);
        _taskList.updateTask(task)
        createList(_taskList.arr);
        setLocalStorage();
        getLocalStorage();
    }
    
}
