const express = require("express");
const app = express();
const port = 3000;
const listaDeTarefas = require("./model/todo-list.json");

app.use(express.json()); // escutar e interpretar json

//- [ ] criaremos uma rota utilizando o método PUT que atualiza todos os dados da lista de tarefas e caso não encontre, cria o item.
//lista TODOS os produtos do json

app.put("/tarefas/:id", (req, res) => {
  const IDtarefa = req.params.id;
  const tarefaAtualizada = req.body;

  const novaListaDeTarefas = listDeTarefas.map((tarefa) => {
    if (tarefa.id == IDtarefa) {
      return (tarefa = tarefaAtualizada);
    }
    return tarefa;
  });

  res.status(202).json(novaListaDeTarefas); // STATUS CODE : ACCEPTED
});

//É o mesmo código de cima mas só retorna o produto que foi atualizado
app.put("/tarefas/:id",(req, res)=>{
    const IDtarefa = req.params.id
    const tarefaAtualizada = req.body

    const temTarefa = listDeTarefas.find(tarefa => tarefa.id == IDtarefa)

    if(temTarefa){
        return res.status(200).json(tarefaAtualizada)
    }

    listDeTarefas.push(tarefaAtualizada)

    return res.status(201).json(tarefaAtualizada) 
    // STATUS CODE : ACCEPTED
})

//[ ] vamos atualizar um registro na lista de tarefas utilizando o método PATCH
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
//[ ] apagaremos uma tarefa da lista utilizando o método DELETE
app.delete("/tarefas/:id", (req, res) => {
    const Idcadastros = req.params.id
    const deletecampos = req.body

    const newlist = ListaDeTarefas.map((tarefas) => {
        if (tarefas.id == Idcadastros) {
            return delete { // aqui vai retornar um true, que apagou o id e seus parametros.
                ...tarefas,
                ...deletecampos
            }
        }
        return tarefas
    })
    res.status(200).json(newlist)

})










app.listen(port, () => {
  console.log(`API está todando na porta ${port}`);
});
