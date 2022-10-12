const express = require('express')
const app = express()
const listaDeUsuarios = require('./model/usuarios.json')
const port = 3000
app.use(express.json())

// [X] TODO: Uma rota que atualiza todos os dados de cadastro de um usuário e se não for encontrado cria um novo na lista -- DONE (Método PUT)

app.put('/usuarios/:id', (req, res) => {
  const idDoUsuario = req.params.id
  const usuarioAtualizado = req.body
  const usuarioExistente = listaDeUsuarios.find(
    usuario => usuario.id == idDoUsuario
  )

  if (usuarioExistente) {
    listaDeUsuarios.map((usuario, index) => {
      if (usuario.id == idDoUsuario) {
        return (listaDeUsuarios[index] = usuarioAtualizado)
      }
    })
    return res.status(200).json(usuarioAtualizado)
  }
  listaDeUsuarios.push(usuarioAtualizado)
  return res.status(201).json(listaDeUsuarios)
})

// [X] TODO: Uma rota que atualiza **APENAS** o endereço do usuário -- DONE (Método PATCH)

app.patch('/usuarios/:id', (req, res) => {
  const idDoUsuario = req.params.id
  const enderecoAtualizado = req.body
  const usuarioExistente = listaDeUsuarios.find(
    usuario => usuario.id == idDoUsuario
  )

  if (usuarioExistente) {
    const novoEndereco = {
      ...usuarioExistente,
      ...enderecoAtualizado
    }
    listaDeUsuarios.map((usuario, index) => {
      if (usuario.id == idDoUsuario) {
        return (listaDeUsuarios[index] = novoEndereco)
      }
    })
    return res.status(200).json(novoEndereco)
  }
  return res.status(404).json({
    message:
      'O usuário não foi encontrado. Por favor, verifique e digite um ID válido!'
  })
})

app.listen(port, () => {
  console.log(`Api está rodando na porta ${port}`)
})
