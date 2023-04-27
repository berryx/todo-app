import {formatDateToLocalString} from '/src/moduies/utils.js';

function formatDate(date){
    return date.toLocaleDateString();
}
class Todo {
    title;
    constructor(title, id, completed, date) {
        this.id = id;
        this.title = title;
        this.date = (date ? formatDateToLocalString(new Date(date)) : false) ||  formatDateToLocalString(new Date(Date.now()));
        this.isCompleted = completed || false;
    }
    set title(newTitle){
        this._title = newTitle.trim();
    }
    set description(newDesc){
        this._title = newDesc.trim();
    }


}

export default Todo;