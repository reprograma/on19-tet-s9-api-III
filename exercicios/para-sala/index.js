const express = require('express')
const app = express()
const listaTarefas = require("./model/todo-list.json")
const port = 3000

app.use(express.json())

app.put("/tarefas/:id", (req, res) => {
    const IDtarefa = req.params.id
    const tarefaAtualizada = req.body

    const temTarefa = listaTarefas.find(tarefa => tarefa.id == IDtarefa)

    if (temTarefa) {
        res.status(200).json(tarefaAtualizada)
    }

    listaTarefas.push(tarefaAtualizada)
//    const novaLista = listaTarefas.map((tarefa) => {
//        if (tarefa.id == IDtarefa) {
//            return tarefa = body
//        }
//       return tarefa 
//    })
    return res.status(201).json(tarefaAtualizada)
})

app.patch("/tarefas/:id", (req, res) => {
    const IDtarefa = req.params.id
    const novosCampos = req.body


    const existeTarefa = listaTarefas.find(tarefa => tarefa.id == IDtarefa)

    if (existeTarefa) {
        const tarefaAtualizada = {
            ... existeTarefa,
            ... novosCampos
        }
        return res.status(200).json(tarefaAtualizada)
    }
//    const novaLista = listaTarefas.map((tarefa) => {
//        if (tarefa.id == IDtarefa) {
//            return {
//                ...tarefa, ...novosCampos
//            }
//        }
//        return tarefa
//    })
    res.status(404).json({
        mensagem: "Tarefa não encontrada"
    })
})

app.delete("/tarefas/:id", (req, res) => {
    const IDtarefa = req.params.id

    const existeTarefa = listaTarefas.find((tarefa) => tarefa.id == IDtarefa)

    if (existeTarefa) {
        listaTarefas.map((tarefa,index) => {
            if (tarefa.id == IDtarefa) {
                return listaTarefas.splice(index, 1)
            }
        })
        
        return res.status(200).json(listaTarefas)
    }
    return res.status(404).json({
        mensagem: "Tarefa não foi encontrada."
    })
})

app.listen(port, () => {
    console.log(`API está ouvindo a porta: ${port}.`);
})