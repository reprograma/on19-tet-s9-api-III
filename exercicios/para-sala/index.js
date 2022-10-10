const express = require('express')
const app = express()
const port = 3000
const listaDeTarefas = require("./model/todo-list.json")

app.use(express.json()) // escutar e interpretar json

//- [x] criaremos uma rota utilizando o método PUT que atualiza todos os dados da lista de tarefas e caso não encontre, cria o item.
app.put("/tarefas/:id", (req, res) => {
    const IDtarefa = req.params.id
    const tarefaAtualizada = req.body
    
    const temTarefa = listaDeTarefas.find(tarefa => tarefa.id == IDtarefa) // ver se o item existe:

    if (temTarefa){
       return res.status(200).json(tarefaAtualizada) // 200 = atualizado
    } //return executa o cód até ele e nada mais
    //else 
    listaDeTarefas.push(tarefaAtualizada)
    return res.status(201).json(tarefaAtualizada) //201 = criado
})

    /* 1ª parte
    const novaListaDeTarefas = listaDeTarefas.map((tarefa)=>{
        if (tarefa.id == IDtarefa) {
            return tarefa = tarefaAtualizada
        }
        return tarefa
    })

    res.status(202).json(novaListaDeTarefas) // status code: 202 Accepted
    */


//- [x] vamos atualizar um registro na lista de tarefas utilizando o método PATCH
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


/* 1ª parte
    const novaListaDeTarefas = listaDeTarefas.map((tarefa)=>{ // retornar o item inteiro atualizado e não a lista
        if (tarefa.id == IDtarefa) {
            return { // retorne um novo objeto | ... = spred = todos os campos
                ...tarefa, ...novosCampos //2º objeto do spred é o q ficará/atualiza
            }
        } 
        return tarefa

    }) 
    */

//- [x] apagaremos uma tarefa da lista utilizando o método DELETE. 
app.delete("/tarefas/:id", (req,res) =>{
    const IDtarefa = req.params.id

    const existeTarefa = listaDeTarefas.find((tarefa) => tarefa.id == IDtarefa)

    if (existeTarefa){
        listaDeTarefas.map((tarefa,index) => {
            if(tarefa.id == IDtarefa){
                listaDeTarefas.splice(index,1)
            }
    })
    return res.status(200).json(listaDeTarefas) //204 - excluído - No content - não conseguimos mandar um json junto
                
    }
    return res.status(404).json({
        message: "Tarefa não encontrada"
    })
})


app.listen(port,() => {
    console.log(`API está rodando na porta ${port}`)
})
