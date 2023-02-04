const { json } = require('express')
const express = require('express')
const app = express()
const listaDeTarefas = require("./model/todo-list.json")
const port = 3007

app.use(express.json())

//TODO: [X] criaremos uma rota utilizando o método PUT que atualiza um registro da lista de tarefas e caso não encontre, cria o item. - DONE
app.put("/tarefas/:id",(req, res)=>{
    const idTarefa = req.params.id
    const body = req.body

    const novaLista = listaDeTarefas.map((tarefa)=>{
        if(tarefa.id == idTarefa){
            return tarefa = body
        }
        return tarefa
    })
    res.status(202).json(novaLista) 
})

//TODO: [X] vamos atualizar um registro na lista de tarefas utilizando o método PATCH - DONE
app.patch("/tarefas/:id",(req, res)=>{
    const IDtarefa = req.params.id
    const novosCampos = req.body

    const novaTarefa = listaDeTarefas.find(tarefa=> tarefa.id ==IDtarefa)
    if(novaTarefa){
        const tarefaAtaulizada={
            ...novaTarefa,
            ...novosCampos
        }
        return res.status(200).json(tarefaAtaulizada)
    }
    return res.status(404).json({message:"tarefa não encontrada"})
     } )  
       
    //res.status(202).json(novaTarefa)//
    //console.log(novaTarefa)//exibirá todos os itens com o due date modificado if(tarefa.id = IDtarefa)

//exemplo 2 de put
app.put("/tarefa/:id",(req, res)=>{
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

//TODO: [X] apagaremos uma tarefa da lista utilizando o método DELETE. - DONE
app.delete("/tarefas/:id",(req, res)=>{
    const IDtarefa = req.params.id

    const existeTarefa = listaDeTarefas.find((tarefa) => tarefa.id == IDtarefa)

    if(existeTarefa){
        listaDeTarefas.map((tarefa, index)=>{
            if(tarefa.id == IDtarefa){
                return listaDeTarefas.splice(index,1)
            }
        })

        return res.status(200).json(listaDeTarefas)
    }

    return res.status(404).json({
        message:`Tarefa com o id ${IDtarefa }não foi encontrada`
    })
})

app.listen(port,()=>{
    console.log(`Aplicação funcionando na porta ${port}`)
})