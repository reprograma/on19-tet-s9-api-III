const express = require('express')
const app = express()
const port = 3000
const listaDeTarefas = require("./model/todo-list.json")

app.use(express.json()) // escutar e interpretar json

//- [ ] criaremos uma rota utilizando o método PUT que atualiza todos os dados da lista de tarefas e caso não encontre, cria o item.
app.put("/tarefas/:id",(req, res)=>{
    const IDtarefa = req.params.id
    const tarefaAtualizada = req.body

    const temTarefa = listaDeTarefas.find(tarefa => tarefa.id == IDtarefa)

    if(temTarefa){
        return res.status(200).json(tarefaAtualizada)
    }

    listaDeTarefas.push(tarefaAtualizada)

    return res.status(201).json(tarefaAtualizada) 
    // STATUS CODE : ACCEPTED
})


/// metodo patch
app.patch("/tarefas/:id", (req, res) => {
    const IDtarefa = req.params.id
    const novosCampos = req.body

    const existeTarefa = listaDeTarefas.find(tarefa => tarefa.id == IDtarefa)

    if(existeTarefa) {
        const tarefaAtualizada = {
            ...existeTarefa,
            ...novosCampos
        }
    return  res.status(200).json(tarefaAtualizada)
    }
    return res.status(404).json({
        message:"Tarefa não foi encontrada"
    })
})



// metodo delete

app.delete("/tarefas/:id", (req, res) => {
    const IDtarefa = req.params.id

    const existeTarefa = listaDeTarefas.find((tarefa) => tarefa.id === IDtarefa)

    if(existeTarefa){
        listaDeTarefas.map((tarefa, index) => {
        if (tarefa.id == IDtarefa) {
            return listaDeTarefas.splice(index,1)
        }
        })

        return res.status(200).json(listaDeTarefas)
    }

         return res.status(404).json({
            message:"Tarefa não foi encontrada"
         })
    })

 

//porta
app.listen(port, ()=> {
    console.log(`Api is working in the door ${port}`)
})
