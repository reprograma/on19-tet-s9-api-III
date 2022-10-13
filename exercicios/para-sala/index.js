const express = require('express')
const app = express()
<<<<<<< HEAD
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
=======
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
>>>>>>> 52783825dbb50ec9e79d4642330215fd8c653673
})
