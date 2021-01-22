function taskList(){
    this.arr = [];

    this.addTask = function(task){
        this.arr.push(task);
        this.noti('success', 'Thêm Thành Công');
    }
    this.findTask = function(idTask){
        var viTri = -1;
        for(var i = 0; i < this.arr.length; i++){
            if(this.arr[i].idTask === idTask){
                viTri = i;
                return viTri;
            }
        }
        return viTri;
    };
    this.sortId = function(){
        if(this.arr.length == 0){
            return;
        }

        for(var i = 0; i < this.arr.length; i++){
            this.arr[i].idTask = i;
        }
    }
    this.getTask = function(id){
        var viTri = this.findTask(id);
        if(viTri != -1){
            return this.arr[viTri];
        }
    };
    this.updateTask = function(task){
        var viTri = this.findTask(task.idTask)
        console.log(viTri);
        if(viTri != -1){
            this.arr[viTri] = task;
            this.noti('success', 'Cập Nhật Thành Công');
        }
    }
    this.changeStatus = function(id){
        if(this.arr[id].status == 1)
        this.arr[id].status = 0;
        else this.arr[id].status = 1;
        this.noti('success', 'Cập Nhật Thành Công');
    }
    this.deleteTask = function(id){
        viTri = this.findTask(id);
        if(viTri != -1){
            this.arr.splice(viTri, 1);
            this.noti('success', 'Xóa Thành Công');
        }
    };
    this.noti = function(icon, mess){
        Swal.fire({
            icon: icon,
            title: mess,
            showConfirmButton: false,
            timer: 1500
        });
    }
}