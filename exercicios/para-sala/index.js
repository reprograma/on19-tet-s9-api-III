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

    if(temTarefa){
        return res.status(200).json(tarefaAtualizada)
    }

    listaDeTarefas.push(tarefaAtualizada)

    return res.status(201).json(tarefaAtualizada) // status code : ACCEPTED
})


//[ ] vamos atualizar um registro na lista de tarefas utilizando o método PATCH

app.patch("/tarefas/:id",(req,res)=>{
    const IDTarefa = req.params.id
    const novosCampos = req.body

    const existeTarefa = listaDeTarefas.find(tarefa => tarefa.id == IDTarefa)

    if(existeTarefa){
        const tarefaAtualizada = {
            ...existeTarefa,
            ...novosCampos
        }
        return res.status(200).json(tarefaAtualizada)
    }
    res.status(404).json({
        message:"Tarefa não foi encontrada"
    })
})

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
})