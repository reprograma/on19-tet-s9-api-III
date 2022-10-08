<<<<<<< HEAD
const express = require ('express')
const app = express()
const listaDeTarefas = require("./model/todo-list.json")
const port = 3003

app.use(express.json())

//[x] criaremos uma rota utilizando o método PUT que atualiza todos os dados da lista de tarefas e caso não encontre, cria o item.

app.put("/tarefas/:id",(req,res)=>{
    const IDTarefa = req.params.id
    const tarefaAtualizada = req.body

    const temTarefa = listaDeTarefas.find(tarefa => tarefa.id == IDTarefa)
=======
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
>>>>>>> 41e400dcc41e643e85f1a9c81f3a8353967d811e

    if(temTarefa){
        return res.status(200).json(tarefaAtualizada)
    }

    listaDeTarefas.push(tarefaAtualizada)

<<<<<<< HEAD
    return res.status(201).json(tarefaAtualizada) // status code : ACCEPTED
})


//[ ] vamos atualizar um registro na lista de tarefas utilizando o método PATCH

app.patch("/tarefas/:id",(req,res)=>{
    const IDTarefa = req.params.id
    const novosCampos = req.body

    const existeTarefa = listaDeTarefas.find(tarefa => tarefa.id == IDTarefa)

    if(existeTarefa){
=======
    return res.status(201).json(tarefaAtualizada) 
    
})

//TODO: [X] vamos atualizar um registro na lista de tarefas utilizando o método PATCH - DONE

app.patch("/tarefas/:id",(req, res)=>{
    const IDtarefa = req.params.id
    const novosCampos = req.body

    const existeTarefa = listaDeTarefas.find(tarefa => tarefa.id == IDtarefa)

    if(existeTarefa) {
>>>>>>> 41e400dcc41e643e85f1a9c81f3a8353967d811e
        const tarefaAtualizada = {
            ...existeTarefa,
            ...novosCampos
        }
<<<<<<< HEAD
        return res.status(200).json(tarefaAtualizada)
    }
    res.status(404).json({
=======

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
>>>>>>> 41e400dcc41e643e85f1a9c81f3a8353967d811e
        message:"Tarefa não foi encontrada"
    })
})

<<<<<<< HEAD
//[ ] apagaremos uma tarefa da lista utilizando o método DELETE. 

app.delete("/tarefas/:id",(req,res)=>{
    const IDTarefa = req.params.id

    const existeTarefa = listaDeTarefas.find((tarefa)=> tarefa.id == IDTarefa)

    if(existeTarefa){
        listaDeTarefas.map((tarefa,index)=>{
            if(tarefa.id == IDTarefa){
                return listaDeTarefas.splice(index,1)
            }
        })
        return res.status(200).json(listaDeTarefas)
    }
    return res.status(404).json({
        message:"Tarefa não foi encontarada"
    })
})


/* 
Segunda opção que fiz para deletar um item
app.delete("/tarefas/:id",(req,res)=>{
    const IDTarefa = req.params.id
    
    const posicaoTarefa = listaDeTarefas.findIndex(tarefa => tarefa.id == IDTarefa);
    if (posicaoTarefa > -1){
        listaDeTarefas.splice(posicaoTarefa, 1);
        return res.status(200).json(listaDeTarefas)
        }
    return res.status(404).json({
        message:"Tarefa não encontrada"
    })
})
*/

app.listen(port,()=>{
    console.log(`Api esta rodando na porta ${port}`);
=======

app.listen(port,()=>{
    console.log(`Api está rodando na porta ${port}`)
>>>>>>> 41e400dcc41e643e85f1a9c81f3a8353967d811e
})