const express = require('express')
const app = express()
const port = 3000
const listaUsuarios = require('./model/usuarios.json')

app.use(express.json())

app.put('/usuarios/:id', (req, res) => {
  const idUsuario = req.params.id
  const atualizaCadastro = req.body

  const usuario = listaUsuarios.find(usuario => usuario.id == idUsuario)

  if (usuario) {
    listaUsuarios.map((usuario, index) => {
      if (usuario.id == idUsuario) {
        return (listaUsuarios[index] = atualizaCadastro)
      }
    })
    return res.status(200).json(atualizaCadastro)
  }

  listaUsuarios.push(atualizaCadastro)

  return res.status(201).json(usuarioAtualizado)
})

app.patch('/usuarios/:id', (req, res) => {
  const idUsuario = req.params.id
  const atualizaDados = req.body
  const verificaEndereco = listaUsuarios.find(
    usuarios => usuarios.id == idUsuario
  )

  if (verificaEndereco) {
    const atualizaEndereco = {
      ...verificaEndereco,
      ...atualizaDados
    }
    listaUsuarios.map((usuarios, index) => {
      if (usuarios.id == idUsuario) {
        return (listaUsuarios[index] = atualizaEndereco)
      }
    })

    return res.status(200).json(atualizaEndereco)
  }

  return res.status(404).json({
    messagem: 'Endereço não encontrado!!'
  })
})

app.delete('/usuarios/:id', (req, res) => {
  const idUsuario = req.params.id
  const deletaUsuario = listaUsuarios.find(usuario => usuario.id == idUsuario)

  if (deletaUsuario) {
    listaUsuarios.map((usuario, index) => {
      if (usuario.id == idUsuario) {
        return listaUsuarios.splice(index, 1)
      }
    })
    return res.status(200).json(listaUsuarios)
  }
  return res.status(404).json({
    message: 'Usuário não encontrado!'
  })
})

app.listen(port, () => {
  console.log('API is up!!')
})
