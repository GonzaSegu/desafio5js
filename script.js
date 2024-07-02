const formulario = document.querySelector('#formulario')
const inputTarea = document.querySelector('#tarea')
const listaTareas = document.querySelector("#lista-tareas")
const registros = document.querySelector("#registros")
const realizadas = document.querySelector("#realizadas")

let toDoList= [
    {id:1, tarea: "Hacer Mercado", completed: true},
    {id:2, tarea:"Estudiar", completed:false},
    {id:3, tarea:"Sacar Basura", completed:false}]




const render_tareas = () =>{
    const fragment = document.createDocumentFragment()
    listaTareas.innerHTML=""
    toDoList.forEach((toDoElement) => {
        const tr = document.createElement('tr')
        tr.id = toDoElement.id
        const td_id = document.createElement('td')
        td_id.innerText=toDoElement.id
        const td_tarea = document.createElement('td')
        td_tarea.innerText= toDoElement.tarea
        const check_box = document.createElement('input')
        check_box.type = "checkbox"
        check_box.checked = toDoElement.completed
        check_box.addEventListener('click', ()=>{
            toDoElement.completed =! toDoElement.completed
            render_tareas() 
            console.log(toDoList)
        })
        const btn_delete = document.createElement('button')
        btn_delete.innerText = "X"
        tr.appendChild(td_id)
        tr.appendChild(td_tarea)
        tr.appendChild(check_box)
        tr.appendChild(btn_delete)
        fragment.appendChild(tr)
        
    })
    listaTareas.appendChild(fragment)
    eliminar()
    total=toDoList.length
    registros.innerHTML= total
    completadas = toDoList.filter((element) => element.completed == true).length
    realizadas.innerHTML = completadas
}


formulario.addEventListener('submit', (e) => {
    e.preventDefault()
    const nuevaTarea = {
        id:Date.now(),
        tarea: inputTarea.value,
        completed:false
    }
    toDoList.push(nuevaTarea)
    inputTarea.value = ""
    render_tareas()
})

const eliminar = ()=>{
    const botones = document.querySelectorAll("#lista-tareas button")
    botones.forEach((btn) => {
        btn.addEventListener("click", ()=>{
            const index = toDoList.findIndex((elemento)=> elemento.id == btn.parentNode.id)
            toDoList.splice(index, 1)
            render_tareas()
        })
      
    })
}




render_tareas()
