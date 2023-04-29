import {dateToLocaleString, localeDateStringToIsoDateString} from '/src/moduies/utils.js';

const cloneTemplate = (id) => {
    return document.querySelector(id).content.cloneNode(true).firstElementChild;
};
export default class Render {
    constructor() {

        this.todoElements = [];
        this.formContainer = document.querySelector("#add-form-container");
        this.todoListElement = document.querySelector("#todolist");
        this.displayFormBtn = document.querySelector("#create-form-button");

        this.menuBtn = document.querySelector("#menuIcon");
        this.sideMenu = document.querySelector("nav");

        this.allSelect = document.querySelector("#all");
        this.todaySelect = document.querySelector("#today");
        this.weekSelect = document.querySelector("#week");
        this.monthSelect = document.querySelector("#month");

    }

    updateTodoListRender(todos) {
        this.createTodoElements(todos);
        this.todoListElement.replaceChildren(...this.todoElements);
    }

    onEvent(eventHandler) {

        //Handle in Render
        this.displayFormBtn.addEventListener("click", this.displayForm.bind(this));
        this.formContainer.querySelector("#remove-form").addEventListener("click", this.removeAddTodoForm.bind(this));
        this.menuBtn.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                this.sideMenu.classList.toggle("hideSidebar");
            },
        );

        //Handle by App
        this.todaySelect.addEventListener("click", eventHandler);
        this.todaySelect.addEventListener("click", this.handleMenu);
        this.allSelect.addEventListener("click", eventHandler);
        this.allSelect.addEventListener("click", this.handleMenu);
        this.weekSelect.addEventListener("click", eventHandler);
        this.weekSelect.addEventListener("click", this.handleMenu);
        this.monthSelect.addEventListener("click", eventHandler);
        this.monthSelect.addEventListener("click", this.handleMenu);

        this.formContainer.querySelector("#add-form").addEventListener("submit", eventHandler);
        this.todoListElement.addEventListener("click", eventHandler);
        this.todoListElement.addEventListener("change", eventHandler);

    }

    displayForm() {
        this.formElement = document.querySelector("#add-form");

        /** @type {HTMLInputElement}*/
        let date = this.formElement.querySelector("#date");
        date.value = new Date(Date.now()).toISOString().slice(0, 10);
        this.formContainer.classList.replace("hidden", "visible");

    }

    displayEditTodo(e) {
        let id = e.target.parentNode.id;
        const todoEditFormContainer = cloneTemplate("#edit-todo-container");
        let title = todoEditFormContainer.querySelector("#editTitle");
        title.textContent = e.target.parentNode.querySelector(".task").textContent;
        let date = todoEditFormContainer.querySelector("#editDate");
        date.value = localeDateStringToIsoDateString(e.target.parentNode.querySelector(".date").textContent);

        document.body.append(todoEditFormContainer);
        const todoEditForm = todoEditFormContainer.querySelector("#editTodo")
        todoEditForm.querySelector("#removeEditForm").addEventListener("click", (e) =>{
            todoEditForm.reset();
            id = null;
            todoEditFormContainer.remove();
        })


        return [todoEditFormContainer, todoEditForm, id];

    }

    removeAddTodoForm(modal) {
        this.formContainer.classList.replace("visible", "hidden");
    }

    createTodoElements(todos) {
        this.todoElements = [];
        for (const todo of todos) {
            const todoItemElement = cloneTemplate("#todo-template");
            todoItemElement.id = todo.id;
            /** @type {HTMLSpanElement}*/
            const title = todoItemElement.querySelector(".task");
            title.textContent = todo.title;
            /** @type {HTMLInputElement}*/
            const checkbox = todoItemElement.querySelector("input");
            checkbox.checked = todo.isCompleted;
            if (checkbox.checked) {
                title.style.textDecoration = "line-through";
                title.style.opacity = "0.6";
                todoItemElement.classList.add("checked");
            }
            /** @type {HTMLSpanElement}*/
            const todoDate = todoItemElement.querySelector(".date");
            todoDate.textContent = dateToLocaleString(todo.date);

            /** @type {HTMLButtonElement}*/
            this.todoElements.push(todoItemElement);
        }
    }

    handleMenu(e) {
        for (let selector of e.target.parentNode.children) {
            selector.classList.remove("activated");
        }
        e.target.classList.add("activated");


    }
}