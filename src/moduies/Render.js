const cloneTemplate = (id) => {
    return document.querySelector(id).content.cloneNode(true).firstElementChild;
};
export default class Render {
    constructor() {

        this.todoElements = [];
        this.formContainer = document.querySelector("#add-form-container");
        this.todoListElement = document.querySelector("#todolist");
        this.displayFormBtn = document.querySelector("#create-form-button");
    }

    updateTodoListRender(todos) {
        this.createTodoElements(todos);
        this.todoListElement.replaceChildren(...this.todoElements);
    }

    onEvent(eventHandler) {

        this.displayFormBtn.addEventListener("click", this.displayForm.bind(this));
        this.formContainer.querySelector("#add-form").addEventListener("submit", eventHandler);
        this.formContainer.querySelector("#remove-form").addEventListener("click", this.removeForm.bind(this));


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
            todoDate.textContent = todo.date;


            this.todoElements.push(todoItemElement);
        }
    }


}