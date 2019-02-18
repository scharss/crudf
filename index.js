/*Scharss https://scharss.github.io*/

var config = {
  apiKey: "AIzaSyCfv50nUqoMQ-jqWjdMiB-8szP6k6BmW3A",
  authDomain: "crud-6dd16.firebaseapp.com",
  databaseURL: "https://crud-6dd16.firebaseio.com",
  projectId: "crud-6dd16",
  storageBucket: "",
  messagingSenderId: "884286271048"
};
firebase.initializeApp(config);

var d = new Date();
var t = d.getTime();
var counter = t;

document.getElementById("form").addEventListener("submit", (e)=>{
var task = document.getElementById("task").value;
var description = document.getElementById("description").value;
e.preventDefault();
createTask(task,description);
form.reset();
});

function createTask(taskName, description){
  console.log(counter);
  counter +=1;
  console.log(counter);
  var task={
    id: counter,
    task: taskName,    
    description: description
  }
  let db = firebase.database().ref("task/"+counter);
  db.set(task);
  document.getElementById("cardSection").innerHTML='';
  readTask();
}

function readTask(){
  var task = firebase.database().ref("task/");
  task.on("child_added",function(data) {
    var taskValue = data.val();
  
  document.getElementById("cardSection").innerHTML+=`
  <div class="card mb-3">
    <div class="card-body" style="background-color:#DFE3EA">
             <h5 class="card-title">${taskValue.task}</h5>
             <p class="card-text">${taskValue.description}</p>
             <p><button type="submit" style="color:white" class="btn btn-dark" onclick="updateTask(${taskValue.id},'${taskValue.task}','${taskValue.description}')"><i class="fas fa-edit"></i> Editar Tarea</button></p>
             <button type="submit" class="btn btn-dark" onclick="deleteTask(${taskValue.id})"><i class="fas fa-trash-alt"></i> Borrar Tarea</button>
    </div>
  </div>
  
  `
  
  });
}

function reset(){
  document.getElementById("firstSection").innerHTML=`
  
  <form class="border p-4 mb-4" id="form">

                <div class="form-group">
                <label><strong>Servicio</strong></label>    
                <input type="text"  id="task" placeholder="Servicio" class="form-control">
                </div>

                <div class="form-group">
                <label><strong>Descripción</strong></label>
                <input type="text" id="description" placeholder="Descripción" class="form-control">
                </div>
                
                <button type="submit" id="button1" class="btn btn-dark"><i class="fas fa-plus"></i> Agregar Servicio</button>
                <button style="display: none" id="button2" class="btn btn-dark"> Editar Tarea</button>  
                <button style="display: none" id="button3" class="btn btn-dark">Cancelar</button>  
                
                </form>
  
  `;
  document.getElementById("form").addEventListener("submit", (e)=>{
    var task = document.getElementById("task").value;
    var description = document.getElementById("description").value;
    e.preventDefault();
    createTask(task,description);
    form.reset();
    });
}

function updateTask(id,name,description){
  document.getElementById("firstSection").innerHTML=`
                <form class="border p-4 mb-4 " id="form2">

                <div class="form-group">
                <label><strong>Servicio</strong></label>    
                <input type="text"  id="task" placeholder="Servicio" class="form-control">
                </div>

                <div class="form-group">
                <label><strong>Descripción</strong></label>
                <input type="text" id="description" placeholder="Descripción" class="form-control">
                </div>
                
                <p><button  style="display: none" id="button1" class="btn btn-dark"><i class="fas fa-plus"></i> Agregar Servicio</button></p>
                <p><button type="submit" style="display: inline-block" id="button2" class="btn btn-dark"><i class="fas fa-sync-alt"></i> Actualizar Tarea</button></p>  
                <p><button  style="display: inline-block" id="button3" class="btn btn-dark"><i class="fas fa-ban"></i> Cancelar</button></p>  
                
                </form>

  `;
  document.getElementById("form2").addEventListener("submit",(e)=>{
    e.preventDefault();
  });

  document.getElementById("button3").addEventListener("click",(e)=>{
    reset();
  });
  document.getElementById("button2").addEventListener("click",(e)=>{
    updateTask2(id,document.getElementById("task").value,document.getElementById("description").value);
  });
  document.getElementById("task").value=name;
  document.getElementById("description").value=description;
}

function updateTask2(id,name,description){
var taskUpdate={
  task:name,
  id:id,
  description:description
 }
  let db = firebase.database().ref("task/"+id);
  db.set(taskUpdate);

  document.getElementById("cardSection").innerHTML='';
  readTask();
  reset();
}
function deleteTask(id){
  var task= firebase.database().ref("task/"+id);
  task.remove();  
  reset();
  document.getElementById("cardSection").innerHTML='';
  readTask();
}
