const  express = require("express")
const app = express()
const port = 3000
const listadetarefas = require("./model/todo-list.json")
app.use(express.json())
//- [ ] criaremos uma rota utilizando o método PUT que atualiza todos os dados da lista de tarefas e caso não encontre, cria o item.
app.put("/tarefas/:id", (req, res ) => {
    const idTarefa = req.params.id
    const idtarefaatualizada = req.body
    
    const novalista = listadetarefas.map((tarefa => {
    if  (tarefa.id == idTarefa){
    return tarefa = idtarefaatualizada
    }  }))
    res.json(novalista).status(202) //status code : accepted
})


//- [ ] vamos atualizar um registro na lista de tarefas utilizando o método PATCH
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



//- [ ] apagaremos uma tarefa da lista utilizando o método DELETE. 
app.listen(port, ()=>{
console.log(`a api está rodando na porta ${port}`)
})