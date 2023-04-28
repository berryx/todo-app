import examples from "../public/example.json"
import Todo from '/src/moduies/Todo.js';
export default class TodoList {
    todos = [];
    #observers = [];
    constructor() {
        //Load json on first start
        this.addTodo(examples.map(todo => todo));
    }

    subscribe(observer){
        this.#observers.push(observer);
    }

    notify(data){
        this.#observers.forEach(observer => observer(data));
    }


     addTodo(todos){
        if (Array.isArray(todos)){
           for(const todo of todos){
               this.addTodo(todo);
           }
            this.notify(this.todos)
        }else {
            const newTodo = new Todo(
                todos.title,
                this.todos.length > 0 ? this.todos[this.todos.length - 1].id + 1 : 1,
                todos.isCompleted ? todos.isCompleted : false,
                todos.date
            )
            this.todos.push(newTodo);
            this.notify(this.todos)
        }

    }


    removeTodo(id){
       this.todos = this.todos.filter(todo => todo.id !== id);
        this.notify(this.todos)
    }

    toggleCompleted(id) {
        const index = this.todos.findIndex(todo => todo.id === id);
        this.todos[index].isCompleted = !this.todos[index].isCompleted;
        this.notify(this.todos)
    }

    editTodo(id, newTitle){
        const index = this.todos.findIndex(todo => todo.id === id);
        this.todos[index].title = newTitle;
        this.notify(this.todos)
    }

    editDate(id, newDate){
        const index = this.todos.findIndex(todo => todo.id === Number(id));
        this.todos[index].date = formatDateToLocalString(new Date(Date.parse(newDate)));
        this.notify(this.todos);
    }

}