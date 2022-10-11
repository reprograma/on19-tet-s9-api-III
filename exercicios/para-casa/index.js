const express = require('express')
const app = express()
const listaUsuarios = require("./model/usuarios.json")
const port = 3300;
app.use(express.json())

//- [ ] Uma rota que atualiza todos os dados de cadastro de um usuário e se não for encontrado cria um novo na lista
app.put("/usuarios/:id", (req, res) => {
    const cadastros = req.params.id
    const dadoAtualizado = req.body
  
    const localizarUsuario = listaUsuarios.find((usuario) => usuario.id == cadastros)
      if (localizarUsuario) {
      return res.status(200).json(dadoAtualizado)
    }
    listaUsuarios.push(dadoAtualizado)
  
   return res.status(201).json(dadoAtualizado)
  })
  

//- [ ] Uma rota que atualiza apenas o endereço do usuário
app.patch("/usuarios/:id", (req, res) => {
    const enderecos = req.params.id
    const novoEndereco = req.body
  
    const localizarEndereco = listaUsuarios.find(atualizarEndereco => atualizarEndereco.id == enderecos)
      if(localizarEndereco) {
          const enderecoalterado = {
          ...localizarEndereco,
          ...novoEndereco
      }
      listaUsuarios.map((atualizarEndereco, index) => {
        if (atualizarEndereco == enderecos) {
            return listaUsuarios[index] = enderecoalterado
        }
      })
          return res.status(200).json(enderecoalterado)
  }
      return res.status(404).json({
          Messagem:"Endereço não localizado, por favor confira os dados informados"
  
      }) 
  })

//- [ ] Uma rota que ao receber um ID de usuário , consegue deletar ele da lista de usuários.
app.delete("/usuarios/:id", (req, res) => {
    const deletaCadastro = req.params.id

    const localizaUsuario = listaUsuarios.find((usuario) => usuario.id == deletaCadastro)

    if(localizaUsuario){
        listaUsuarios.map((usuario, index) => {
            if(usuario.id == deletaCadastro){
             return listaUsuarios.splice(index, 1)
            }
        })
        return res.status(200).json(listaUsuarios)
    }
    return res.status(404).json({
        message: "O usuario não pode ser localizado, por favor confira os dados informados!"
    })
})


app.listen(port, () => {
    console.log(`Api esta rodando na porta ${port}`)
})