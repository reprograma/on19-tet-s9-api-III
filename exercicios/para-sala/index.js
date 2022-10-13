const express = require('express')
const app = express ()
const listaDeTarefas = require("./model/todo-list.json")
const port = 3000

app.use(express.json())

app.put("/tarefas/:id",(req, res)=>{
    const IDtarefa = req.params.id
    const body = req.body

    const novaListadeTarefas = listaDeTarefas.map((tarefa)=>{
        if(tarefa.id == IDtarefa){
            return tarefa = tarefaAtualizada
        }
        return tarefa
    })

    res.status(202).json(novaListadeTarefas) 

})
 app.listen(port, ()=> {
    console.log(`Api is working in the door ${port}`)
})

app.patch("/tarefas/:id",(req, res)=>{
    const IDtarefa = req.params.id
    const novosCampos = req.body

    const novaListaDeTarefas = listDeTarefas.map((tarefa)=>{
        if(tarefa.id == IDtarefa){
            return {
                ...tarefa, ...novosCampos
            }
        }
        return tarefa
    })
    res.status(200).json(novaListaDeTarefas)
})
