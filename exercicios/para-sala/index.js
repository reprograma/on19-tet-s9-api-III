const express = require("express")
const app = express()
const tasksList = require("./model/todo-list.json")
const port = 3000

app.use(express.json())

//TO-DO: [x] criaremos uma rota utilizando o método PUT que atualiza todos os dados da lista de tarefas e caso não encontre, cria o item. 
app.put("/tasks/:id", (req, res)=>{
    const idTasks = req.params.id
    const updatedTask = req.body

    const thereIsTheTask = tasksList.find(task => task.id == idTasks)

    if(thereIsTheTask){
        return res.status(200).json(updatedTask)
    }

    tasksList.push(updatedTask)

    return res.status(201).json(updatedTask) //STATUS CODE: ACCEPTED
})

//TO-DO: [x] vamos atualizar um registro na lista de tarefas utilizando o método PATCH
app.patch("/tasks/:id",(req, res)=>{
    const idTasks = req.params.id
    const newFields = req.body

    const thereIsTheTask = tasksList.find(task => task.id == idTasks)

    if(thereIsTheTask){
        const updatedTask = {
            ...thereIsTheTask,
            ...newFields
        }
        return res.status(200).json(updatedTask)
    }
    return res.status(404).json({
        message:"Can't find the task"
    })
})

//TO-DO: [x] apagaremos uma tarefa da lista utilizando o método DELETE. 
app.delete("/tasks/:id", (req, res) =>{
    const idTasks = req.params.id

    const thereIsTheTask = tasksList.find((task) => task.id == idTasks)

     if (thereIsTheTask){

        tasksList.map((task, index) =>{
            if(task.id == idTasks) {
                return tasksList.splice(index,1)
            }
            })
        return res.status(200).json(tasksList)
    }
    return res.status(404).json({
        message:"Can't find the task"
    })
})



app.listen(port, ()=> {
    console.log(`Api is working on the door ${port}`)
})