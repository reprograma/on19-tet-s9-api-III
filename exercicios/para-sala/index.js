const express = require('express')
const app = express()
const port = 3003
const listaTarefas = require('./model/todo-list.json')

app.use(express.json())

// Criar uma rota usando o PUT pra atualizar os dados e se o item não existir, deve ser criado
app.put('/tarefas/:id', (req, res) => {
  const IdTarefa = req.params.id
  const tarefaAtualizada = req.body

  const novaLista = listaTarefas.map(tarefa => {
    if (tarefa.id == IdTarefa) {
      return (tarefa = tarefaAtualizada)
    }
    return tarefa
  })

  res.status(202).json(novaLista) // STATUS CODE : ACCEPTED
})

// Atualizar um registro usando o PATCH
app.patch('/tarefas/:id', (req, res) => {
  const idTarefa = req.params.id
  const novosCampos = req.body
  const existeTarefa = listaTarefas.find(tarefa => tarefa.id == idTarefa)

  if (existeTarefa) {
    const tarefaAtualizada = {
      ...existeTarefa,
      ...novosCampos
    }
    return res.status(200).json(tarefaAtualizada)
  }
  return res.status(404).json({
    mensagem: 'Tarefa não encontrada!'
  })
})

// apagar uma tarefa usando DELETE
app.delete('/tarefa:id', (req, res) => {
  const idTarefa = req.params.id
  const existeTarefa = listaTarefas.find(tarefa => tarefa.id == idTarefa)

  if (existeTarefa) {
  }
  return res.status(404).json({
    message: 'Tarefa não encontrada!'
  })
})

//código heloisa
// app.delete("/tarefas/:id", (req, res) => {
//   const Idcadastros = req.params.id
//   const deletecampos = req.body

//   const newlist = ListaDeTarefas.map((tarefas) => {
//       if (tarefas.id == Idcadastros) {
//           return delete { // aqui vai retornar um true, que apagou o id e seus parametros.
//               ...tarefas,
//               ...deletecampos
//           }
//       }
//       return tarefas
//   })
//   res.status(200).json(newlist)

// })

app.listen(port, () => {
  console.log('API is ON, baby!!')
})
