var m=Object.defineProperty;var g=(o,t,e)=>t in o?m(o,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[t]=e;var d=(o,t,e)=>(g(o,typeof t!="symbol"?t+"":t,e),e),f=(o,t,e)=>{if(!t.has(o))throw TypeError("Cannot "+e)};var c=(o,t,e)=>(f(o,t,"read from private field"),e?e.call(o):t.get(o)),h=(o,t,e)=>{if(t.has(o))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(o):t.set(o,e)};(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function e(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(i){if(i.ep)return;i.ep=!0;const n=e(i);fetch(i.href,n)}})();function p(o){return o.toLocaleDateString().slice(0,10)}function y(o,t){return o.getFullYear()===t.getFullYear()&&o.getMonth()===t.getMonth()&&o.getDay()===t.getDay()}const u=o=>{const t=new Date(o.getFullYear(),0,1);return Math.ceil(((o.getTime()-t.getTime())/864e5+t.getDay()+1)/7)};function L(o,t){return u(o)===u(t)}function E(o,t){return o.getFullYear()===t.getFullYear()&&o.getMonth()===t.getMonth()}class T{constructor(t,e){d(this,"onTodoListChange",t=>{this.render.updateTodoListRender(t)});d(this,"handleEvent",t=>{switch(this.render.onEvent(this.handleEvent),t.type){case"click":t.target.classList.contains("delete-btn")?this.handleTodoDelete(t):t.target.classList.contains("date")?this.handleDateEdit(t):(t.target.id==="all"||t.target.id==="today"||t.target.id==="week"||t.target.id==="month")&&this.handleDateRender(t);break;case"submit":this.handleSubmit(t);break;case"change":t.target.type==="checkbox"&&this.handleToggleTodo(t);break;case"focusout":t.target.getAttribute("name")==="title"&&this.handleEdit(t);break}});d(this,"handleTodoDelete",t=>{const e=parseInt(t.target.parentNode.id);this.todolist.removeTodo(e)});d(this,"handleToggleTodo",t=>{const e=parseInt(t.target.parentNode.id);this.todolist.toggleCompleted(e)});d(this,"handleEdit",t=>{const e=t.target.textContent,s=t.target.parentNode.id;this.todolist.editTodo(parseInt(s),e)});d(this,"handleDateEdit",t=>{let e=document.createElement("input");e.setAttribute("type","date");let s=t.target;e.value=formatLocalDateStringToIsoString(s.textContent),t.target.parentNode.replaceChild(e,t.target),e.addEventListener("change",i=>{let n=i.target.value,r=i.target.parentNode.id;this.todolist.editDate(r,n)})});d(this,"handleSubmit",t=>{t.preventDefault(),console.log("In handle submit App.js");const e=new FormData(t.currentTarget);let s=e.get("title").trim(),i=e.get("date");if(!s){t.currentTarget.firstElementChild.placeholder="The task is empty...";return}const n={title:s,date:i};t.currentTarget.reset(),t.currentTarget.parentNode.classList.replace("visible","hidden"),this.todolist.addTodo(n)});this.todolist=t,this.render=e,this.todolist.subscribe(this.onTodoListChange),this.onTodoListChange(this.todolist.todos),this.render.onEvent(this.handleEvent)}handleDateRender(t){let e=new Date(Date.now());switch(t.target.id){case"all":this.onTodoListChange(this.todolist.todos);break;case"today":let s=new Date(Date.now()),i=this.todolist.todos.filter(a=>y(a.date,s));this.onTodoListChange(i);break;case"week":let n=this.todolist.todos.filter(a=>L(a.date,e));this.onTodoListChange(n);break;case"month":let r=this.todolist.todos.filter(a=>E(a.date,e));this.onTodoListChange(r);break}}}const S=[{title:"First task",isCompleted:!1,date:"2023-05-27"},{title:"Second task"},{title:"Third task",isCompleted:!0},{title:"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et",date:"2024-01-25"},{title:"New Task",date:"2024-04-24"}];class v{constructor(t,e,s,i){d(this,"title");this.id=e,this.title=t,this.date=i?new Date(i):new Date(Date.now()),this.isCompleted=s||!1}set title(t){this._title=t.trim()}set description(t){this._title=t.trim()}}var l;class b{constructor(){d(this,"todos",[]);h(this,l,[]);this.addTodo(S.map(t=>t))}subscribe(t){c(this,l).push(t)}notify(t){c(this,l).forEach(e=>e(t))}addTodo(t){if(Array.isArray(t)){for(const e of t)this.addTodo(e);this.notify(this.todos)}else{const e=new v(t.title,this.todos.length>0?this.todos[this.todos.length-1].id+1:1,t.isCompleted?t.isCompleted:!1,t.date);this.todos.push(e),this.notify(this.todos)}}removeTodo(t){this.todos=this.todos.filter(e=>e.id!==t),this.notify(this.todos)}toggleCompleted(t){const e=this.todos.findIndex(s=>s.id===t);this.todos[e].isCompleted=!this.todos[e].isCompleted,this.notify(this.todos)}editTodo(t,e){const s=this.todos.findIndex(i=>i.id===t);this.todos[s].title=e,this.notify(this.todos)}editDate(t,e){const s=this.todos.findIndex(i=>i.id===Number(t));this.todos[s].date=formatDateToLocalString(new Date(Date.parse(e))),this.notify(this.todos)}}l=new WeakMap;const k=o=>document.querySelector(o).content.cloneNode(!0).firstElementChild;class D{constructor(){this.todoElements=[],this.formContainer=document.querySelector("#add-form-container"),this.todoListElement=document.querySelector("#todolist"),this.displayFormBtn=document.querySelector("#create-form-button"),this.menuBtn=document.querySelector("#menuIcon"),this.sideMenu=document.querySelector("nav"),this.allSelect=document.querySelector("#all"),this.todaySelect=document.querySelector("#today"),this.weekSelect=document.querySelector("#week"),this.monthSelect=document.querySelector("#month")}updateTodoListRender(t){this.createTodoElements(t),this.todoListElement.replaceChildren(...this.todoElements)}onEvent(t){this.displayFormBtn.addEventListener("click",this.displayForm.bind(this)),this.formContainer.querySelector("#remove-form").addEventListener("click",this.removeForm.bind(this)),this.menuBtn.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation(),this.sideMenu.classList.toggle("hideSidebar")}),this.todaySelect.addEventListener("click",t),this.todaySelect.addEventListener("click",this.handleMenu),this.allSelect.addEventListener("click",t),this.allSelect.addEventListener("click",this.handleMenu),this.weekSelect.addEventListener("click",t),this.weekSelect.addEventListener("click",this.handleMenu),this.monthSelect.addEventListener("click",t),this.monthSelect.addEventListener("click",this.handleMenu),this.formContainer.querySelector("#add-form").addEventListener("submit",t),this.todoListElement.addEventListener("click",t),this.todoListElement.addEventListener("change",t),this.todoListElement.addEventListener("focusout",t)}displayForm(){this.formElement=document.querySelector("#add-form");let t=this.formElement.querySelector("#date");t.value=new Date(Date.now()).toISOString().slice(0,10),this.formContainer.classList.replace("hidden","visible")}removeForm(){this.formContainer.classList.replace("visible","hidden")}createTodoElements(t){this.todoElements=[];for(const e of t){const s=k("#todo-template");s.id=e.id;const i=s.querySelector(".task");i.textContent=e.title,i.contentEditable=!0;const n=s.querySelector("input");n.checked=e.isCompleted,n.checked&&(i.style.textDecoration="line-through",i.style.opacity="0.6",s.classList.add("checked"));const r=s.querySelector(".date");r.textContent=p(e.date),this.todoElements.push(s)}}handleMenu(t){for(let e of t.target.parentNode.children)e.classList.remove("activated");t.target.classList.add("activated")}}new T(new b,new D);
