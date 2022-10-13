const express = require('express')
const app = express()
const listaTarefas =  require("./model/todo-list.json")
const port = 3000
app.use(express.json())

//-[x] criaremos uma rota utilizando o método PUT que atualiza todos os dados da lista de tarefas
// e caso não encontre, cria o item. DONE

app.put("/tarefas/:id", (req, res) => {
    const IDtarefa = req.params.id
    const tarefaAtualizada = req.body

    const temTarefa = listaTarefas.find(tarefa => tarefa.id == IDtarefa)

    if(temTarefa){
        res.status(200).json(tarefaAtualizada)
    }

    listaTarefas.push(tarefaAtualizada)
   
    return res.status(201).json(tarefaAtualizada)
})

//-[ ] vamos atualizar um registro na lista de tarefas utilizando o método PATCH

app.patch("/tarefas/:id", (req, res) => {
    const IDtarefa = req.params.id
    const novosCampos = req.body
    
    const existeTarefa = listaTarefas.find(tarefa => tarefa.id == IDtarefa)

    if(existeTarefa) {
        const tarefaAtualizada = {
            ...existeTarefa,
            ...novosCampos
        }

        return res.status(200).json(tarefaAtualizada)
    }
    return res.status(404).json({mensagem: "Tarefa não encontrada"})    
})

//-[ ] apagaremos uma tarefa da lista utilizando o método DELETE. 

app.delete("/tarefas/:id", (req, res) =>{
    const IDtarefa = id.params.id

    const existeTarefa =  listaTarefas.filter(tarefa => tarefa.id == IDtarefa)

    if(existeTarefa){
        novaLista = listaTarefas.map((tarefa,index) => {
            if(tarefa == existeTarefa){
                
            }
        })
    
    }
    return 
})
app.listen(port, () => {
    console.log("Api está rodando na porta 3000")
})