var vm = new Vue({
    el: '#container',
    data:{
        todo: '',
        id: 1,
        listTodo: JSON.parse(localStorage.getItem('todo')),
        beforeEdit: '',
        todoList: []
    },
    directives: {
        focus: {
            inserted: function (el) {
                el.focus()
            }
        }
    },
    methods: {
        addTodo() {
            if(this.todo.trim().length == 0){
                return
            }
            this.todoList.push({
                'id':this.id,
                'content': this.todo,
                'complete': false,
                'editing': false
            })
            this.id++
            this.todo = ''
            localStorage.setItem('todo', JSON.stringify(this.todoList))
            this.listTodo = JSON.parse(localStorage.getItem('todo'))
        },
        editItem(item){
            item.editing=true
            this.beforeEdit = item.content
        },
        doneEdit(item){
            if(item.content.trim() == ''){
                item.content= this.beforeEdit
            }
            item.editing=false
            this.todoList.forEach(function (todo) {
                if(todo.id == item.id) {
                    todo.content = item.content
                }
            })
        },
        removeItem(index){
            this.todoList.splice(index, 1)
            localStorage.setItem('todo', JSON.stringify(this.todoList))
            this.listTodo = JSON.parse(localStorage.getItem('todo'))
        },
        enter(item){
            this.listTodo.forEach(function (x) {
                if(x.id == item.id){
                    !x.complete
                }
            })
            localStorage.setItem('todo', JSON.stringify(this.listTodo))
            this.listTodo = JSON.parse(localStorage.getItem('todo'))
        },
        render(item){
            this.listTodo.forEach(function (x) {
                if(x.id == item.id){
                    x.content = item.content
                }
            })
            localStorage.setItem('todo', JSON.stringify(this.listTodo))
            this.listTodo = JSON.parse(localStorage.getItem('todo'))
        },
        checkedAll(){
            this.listTodo.forEach(function(x) {
                x.complete = true
            })
            localStorage.setItem('todo', JSON.stringify(this.listTodo))
            this.listTodo = JSON.parse(localStorage.getItem('todo'))
        },
        allTodo(){
            this.listTodo = JSON.parse(localStorage.getItem('todo'))
        },
        completedTodo(){
            this.listTodo = JSON.parse(localStorage.getItem('todo'))
            localStorage.setItem('todoTemp', JSON.stringify(this.listTodo.filter(x=>x.complete==true)))

            this.listTodo = JSON.parse(localStorage.getItem('todoTemp'))
        },
        incompleteTodo(){
            this.listTodo = JSON.parse(localStorage.getItem('todo'))
            localStorage.setItem('todoTemp', JSON.stringify(this.listTodo.filter(x=>x.complete==false)))
            this.listTodo = JSON.parse(localStorage.getItem('todoTemp'))
        },
        deletedTodo(){
            this.listTodo = JSON.parse(localStorage.getItem('todo'))
            localStorage.setItem('todo', JSON.stringify(this.listTodo.filter(x=>x.complete==false)))
            this.listTodo = JSON.parse(localStorage.getItem('todo'))
        }
    }

})