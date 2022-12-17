const express = require('express')
const app = express()
const port = 3000
const listaDeTarefas = require("./model/todo-list.json")

app.use(express.json()) // escutar e interpretar json

//- [ ] criaremos uma rota utilizando o método PUT que atualiza todos os dados da lista de tarefas e caso não encontre, cria o item.
app.put("/tarefas/:id",(req, res)=>{
    const IDtarefa = req.params.id
    const tarefaAtualizada = req.body

    const novaListaDeTarefas = listDeTarefas.map((tarefa)=>{
        if(tarefa.id == IDtarefa){
            return tarefa = tarefaAtualizada
        }
        return tarefa
    })

    res.status(202).json(novaListaDeTarefas) // STATUS CODE : ACCEPTED

})


app.listen(() => {
    console.log(`API está todando na porta ${port}`)
})
