import {dateToLocaleString} from '/src/moduies/utils.js';

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
        this.formContainer.querySelector("#remove-form").addEventListener("click", this.removeForm.bind(this));
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
        this.todoListElement.addEventListener("focusout", eventHandler);

    }

    displayForm() {
        this.formElement = document.querySelector("#add-form");

        /** @type {HTMLInputElement}*/
        let date = this.formElement.querySelector("#date");
        date.value = new Date(Date.now()).toISOString().slice(0, 10);
        this.formContainer.classList.replace("hidden", "visible");

    }

    removeForm() {
        this.formContainer.classList.replace("visible", "hidden");
    }

    createTodoElements(todos) {
        this.todoElements = [];
        for (const todo of todos) {
            const todoItemElement = cloneTemplate("#todo-template");
            todoItemElement.id = todo.id;
            /** @type {HTMLSpanElement}*/
            const todoDescriptionElement = todoItemElement.querySelector(".task");
            todoDescriptionElement.textContent = todo.title;
            todoDescriptionElement.contentEditable = true;
            /** @type {HTMLInputElement}*/
            const checkbox = todoItemElement.querySelector("input");
            checkbox.checked = todo.isCompleted;
            if (checkbox.checked) {
                todoDescriptionElement.style.textDecoration = "line-through";
                todoDescriptionElement.style.opacity = "0.6";
                todoItemElement.classList.add("checked");
            }
            /** @type {HTMLSpanElement}*/
            const todoDate = todoItemElement.querySelector(".date");
            todoDate.textContent = dateToLocaleString(todo.date);


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