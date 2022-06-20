import { saveTask, onGetTask, deleteTask, getTask, updateTask } from "./firebase.js";

let editStatus = false;
let idTask = '';
const taskForm = document.getElementById("task-form");

window.addEventListener("DOMContentLoaded", async () => {
 
  onGetTask((querySnapshot) => {

  const dataTask = document.getElementById("task-container");
  dataTask.innerHTML = "";
  querySnapshot.docs.forEach((doc) => {
   const taskElement = document.createElement("div");
   const task = doc.data();
   taskElement.classList.add("task-list");
   taskElement.innerHTML = `      
      <h2>${task.title}</h2>
      <p>${task.description}</p>
      <div class='buttons'>
        <button class="delete-task" data-id="${doc.id}">Delete</button> 
        <button class="edit-task" data-id="${doc.id}">Edit</button>       
      <div>`;
   dataTask.appendChild(taskElement);
  });

  const btnsDelete = document.querySelectorAll(".delete-task");
  btnsDelete.forEach((btn) => {
   btn.addEventListener("click", (e) => {
    const id = e.target.dataset.id;
    // createModal("Task Deleted", "modal-deleted");
    deleteTask(id);
   });
  });

  const btnsEdit = document.querySelectorAll(".edit-task");
  btnsEdit.forEach((btn) => {
   btn.addEventListener("click", async (e) => {
    const id = e.target.dataset.id;
    const doc = await getTask(id);
    const task = doc.data();
    console.log(task);
    taskForm["task-title"].value = task.title;
    taskForm["task-description"].value = task.description;
    editStatus = true;
    idTask = doc.id;
    taskForm['btn-task-save'].innerText = "Update";
    taskForm['btn-task-save'].classList.add('update-button');
   });
  });  
});

  taskForm.addEventListener("submit", (e) => {
   e.preventDefault();
   taskForm['btn-task-save'].innerText = "Save";
   taskForm['btn-task-save'].classList.remove('update-button');

   const title = taskForm["task-title"];
   const description = taskForm["task-description"];  
   
   if (!editStatus) {
    saveTask(title.value, description.value);      
    editStatus = false;    
   } else {
    updateTask(idTask, {title: title.value, description: description.value});    
   }
   taskForm.reset();   
  });
});

// const createModal = (textModal, classMod) => {
//   const modal = document.createElement("div");
//   modal.classList.add(classMod);
//   modal.innerHTML = textModal;
//   const closeModal = document.createElement("button");
//   closeModal.classList.add("close-modal");
//   closeModal.innerHTML = "X";
//   closeModal.addEventListener("click", () => {
//    modal.remove();
//   });
//   modal.appendChild(closeModal);
//   document.body.appendChild(modal);
//  };