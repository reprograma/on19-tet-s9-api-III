const express = require('express')
const app = express()
const listaDeTarefas = require("./model/todo-list.json")
const port = 3000

app.use(express.json())

/**
 * STATUS CODES:
 * 200 - OK
 * 201 - CREATED
 * 202 - ACCEPTED
 * 204 - NO CONTENT ( nao aceita corpo da requisição)
 * 
 * 404 - NOT FOUND
 */

//TODO: [X] criaremos uma rota utilizando o método PUT que atualiza um registro da lista de tarefas e caso não encontre, cria o item. - DONE
app.put("/tarefas/:id",(req, res)=>{
    const IDtarefa = req.params.id
    const tarefaAtualizada = req.body

    const temTarefa = listaDeTarefas.find(tarefa => tarefa.id == IDtarefa)

    if(temTarefa){
        listaDeTarefas.map((tarefa, index)=>{
            if(tarefa.id == IDtarefa){
                return listaDeTarefas[index] = tarefaAtualizada
            }
        })
        return res.status(200).json(tarefaAtualizada)
    }

    listaDeTarefas.push(tarefaAtualizada)

    return res.status(201).json(tarefaAtualizada) 
    
})

//TODO: [X] vamos atualizar um registro na lista de tarefas utilizando o método PATCH - DONE

app.patch("/tarefas/:id",(req, res)=>{
    const IDtarefa = req.params.id
    const novosCampos = req.body

    const existeTarefa = listaDeTarefas.find(tarefa => tarefa.id == IDtarefa)

    if(existeTarefa) {
        const tarefaAtualizada = {
            ...existeTarefa,
            ...novosCampos
        }
        // Garante que a lista de tarefas vai ser atualizada com o novo registro
        listaDeTarefas.map((tarefa, index)=>{
            if(tarefa.id == IDtarefa){
                return listaDeTarefas[index] = tarefaAtualizada
            }
        })

        return res.status(200).json(tarefaAtualizada)
    }
    return res.status(404).json({message:"tarefa não foi encontrada"})
})

//TODO: [X] apagaremos uma tarefa da lista utilizando o método DELETE. - DONE
app.delete("/tarefas/:id",(req, res)=>{
    const IDtarefa = req.params.id

    const existeTarefa = listaDeTarefas.find((tarefa) => tarefa.id == IDtarefa)
    //False = 0, null , [] , {} , undefined , false
    //True = {...}, 1 , True
    if(existeTarefa){
        listaDeTarefas.map((tarefa, index)=>{
            if(tarefa.id == IDtarefa){
                return listaDeTarefas.splice(index,1)
            }
        })

        return res.status(200).json(listaDeTarefas)
    }

    return res.status(404).json({
        message:"Tarefa não foi encontrada"
    })
})


app.listen(port,()=>{
    console.log(`Api está rodando na porta ${port}`)
})