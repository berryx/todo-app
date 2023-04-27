import {formatDateToLocalString, formatLocalDateStringToIsoString} from '/src/moduies/utils.js';


export default class App {
    constructor(todolist, render) {
        this.todolist = todolist;
        this.render = render;

        this.todolist.subscribe(this.onTodoListChange);

        //Update on first start
        this.onTodoListChange(this.todolist.todos);

        this.render.onEvent(this.handleEvent);
    }

    onTodoListChange = todos => {
        this.render.updateTodoListRender(todos);
    };

    /**
     * Handle Event from Render
     * @param e {Event}
     */
    handleEvent = (e) => {
        this.render.onEvent(this.handleEvent);
        switch (e.type) {
            //When delete todo button click
            case "click" :
                if (e.target.classList.contains("delete-btn")) {
                    this.handleTodoDelete(e);
                } else if (e.target.classList.contains("date")) {
                    this.handleDateEdit(e);
                }
                break;
            //When submit new todo
            case "submit":
                this.handleSubmit(e);
                break;
            case "change"  :
                if (e.target.type === "checkbox") {
                    this.handleToggleTodo(e);
                }
                break;
            case "focusout":
                if (e.target.getAttribute("name") === "title") {
                    this.handleEdit(e);
                }
                break;
        }
    };


    handleTodoDelete = e => {
        const id = parseInt(e.target.parentNode.id);
        this.todolist.removeTodo(id);
    };
    handleToggleTodo = e => {
        const id = parseInt(e.target.parentNode.id);
        this.todolist.toggleCompleted(id);
    };

    handleEdit = (e) => {
        const newTitle = e.target.textContent;
        const id = e.target.parentNode.id;
        this.todolist.editTodo(parseInt(id), newTitle);
    };

    handleDateEdit = (e) => {
        let dateInput = document.createElement("input");
        dateInput.setAttribute("type", "date");
        let spanElement = e.target;
        dateInput.value = formatLocalDateStringToIsoString(spanElement.textContent);
        e.target.parentNode.replaceChild(dateInput, e.target);
        dateInput.addEventListener("change", (e) => {
            let newDate = e.target.value;
            let id = e.target.parentNode.id;
            this.todolist.editDate(id, newDate);
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        console.log("In handle submit App.js");
        const form = new FormData(e.currentTarget);
        let title = form.get("title").trim();
        let date = form.get("date");
        if(!title){
            e.currentTarget.firstElementChild.placeholder = "The task is empty..."
            return;
        }
        const newTodo = {title, date};
        e.currentTarget.reset();
        e.currentTarget.parentNode.classList.replace("visible", "hidden");
        this.todolist.addTodo(newTodo);
    };
}