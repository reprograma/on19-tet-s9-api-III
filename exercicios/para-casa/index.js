const express = require('express')
const app = express()
const port = 3000
const listaDeUsuarios = require("./model/usuarios.json")
app.use(express.json())

// Criar uma rota que atualiza todos os dados de cadastro de um usuário e se não for encontrado cria um novo na lista

app.put("/usuarios/:id", (req,res) => {
    const IDusuario = req.params.id
    const usuarioAtualizado = req.body

    const temUsuario = listaDeUsuarios.find(usuario => usuario.id == IDusuario)

    if(temUsuario) {
       return res.status(200).json(usuarioAtualizado)

    }

    listaDeUsuarios.push(usuarioAtualizado)
    return res.status(201).json(usuarioAtualizado)
})




// Criar uma rota que atualiza apenas o endereço do usuário

app.patch("/usuarios/:id", (req,res) => {
    const IDusuario = req.params.id
    const novoUsuario = req.body

    const existeUsuario = listaDeUsuarios.find(usuario => usuario.id == IDusuario)

    if(existeUsuario) {
      const enderecoNovo = {
        ...existeUsuario,
        ...novoUsuario

      }
      listaDeTarefas.map((usuario, index) => {
        if(usuario.id == IDusuario) {
            return listaDeUsuarios[index] = novoUsuario
        }
    })
       return res.status(200).json(existeUsuario)
    }

})

app.listen (port, () => {
    console.log(`ESTAMOS ON NA PORTA ${port}`);
})

