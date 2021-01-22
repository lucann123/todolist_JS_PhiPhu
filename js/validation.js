function validation(){
    this.valid = true;
    var classTask = new taskList();
    this.checkEmpty = function(input){
        if(input == ""){
            classTask.noti('error', 'Không được trống');
            this.valid = false;
        }
        else this.valid = true;
        return this.valid;
    }
    this.doubling = function(arr, taskInput){
        if(arr.length > 0){
            for(var i = 0; i < arr.length; i++){
                if(taskInput === arr[i].taskValue){
                    classTask.noti('error', 'Task Trùng');
                    return false;
                }
            }
        }
        return true;
    }
}