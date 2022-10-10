const express = require('express')
const app = express()
const acharEndereco = require("./model/usuarios.json")
const port = 3300;
app.use(express.json())

//- [ ] Uma rota que atualiza todos os dados de cadastro de um usuário e se não for encontrado cria um novo na lista
app.put("/usuarios/:id", (req, res) => {
    const atualizarDados = req.params.id;
    const dadosAtualizados = req.body;
  
    const temTarefa = acharEndereco.find((tarefa) => tarefa.id == atualizarDados);
      if (temTarefa) {
      return res.status(200).json(dadosAtualizados);
    }
    acharEndereco.push(dadosAtualizados);
  
   return res.status(201).json(dadosAtualizados); // STATUS CODE : ACCEPTED
  });
  

//- [ ] Uma rota que atualiza apenas o endereço do usuário
app.patch("/tarefas/:id", (req, res) => {
    const endereco = req.params.id
    const atualizarEndereco = req.body
  
    const enderecoAtualizado = acharEndereco.find(atualizar => atualizar.id === endereco)
      if(enderecoAtualizado) {
          const enderecoalterado = {
          ...enderecoAtualizado,
          ...atualizarEndereco
      }
          return res.status(200).json(enderecoalterado);
  }
      return res.status(404).json({
          Messagem:"Tarefa não encontrada"
  
      })
  })

//- [ ] Uma rota que ao receber um ID de usuário , consegue deletar ele da lista de usuários.
app.delete("/usuarios/:id", (req, res) => {
    const deletaID = req.params.id

    const IDinformado = acharEndereco.find((tarefa) => tarefa.id == deletaID)

    if(IDinformado){
        acharEndereco.map((tarefa, index) => {
            if(tarefa.id == deletaID){
             return acharEndereco.splice(index, 1)
            }
        })
        return res.status(200).json(acharEndereco)
    }
    return res.status(404).json({
        message: "Tarefa não encontrada"
    })
})


app.listen(port, () => {
    console.log(`Api esta rodando na porta ${port}`)
})