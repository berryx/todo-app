import App from '/src/moduies/App.js';
import TodoList from '/src/moduies/TodoList.js';
import Render from '/src/moduies/Render.js';
import './style.css';



const app = new App(new TodoList(), new Render());