const express = require('express')
const app = express()
const listaUsuarios = require("./model/usuarios.json")
const port = 3300;
app.use(express.json())

//- [ ] Uma rota que atualiza todos os dados de cadastro de um usuário e se não for encontrado cria um novo na lista
app.put("/usuarios/:id", (req, res) => {
    const cadastrosId = req.params.id
    const dadoAtualizado = req.body
  
    const existeUsuario = listaUsuarios.find((usuario) => usuario.id == cadastrosId)
    if(existeUsuario){
        listaUsuarios.map((usuario, index) => {
            if(usuario.id == cadastrosId){
             return listaUsuarios[index] = dadoAtualizado
            }
        })
      return res.status(200).json({message: "Atualizado com sucesso"})
    }
    listaUsuarios.push(dadoAtualizado)
  
   return res.status(201).json({message: "Usuario criado cmom sucesso"})
  })
  

//- [ ] Uma rota que atualiza apenas o endereço do usuário
app.patch("/usuarios/:id", (req, res) => {
    const enderecos = req.params.id
    const novoEndereco = req.body
  
    const existeUsuario = listaUsuarios.find(atualizarEndereco => atualizarEndereco.id == enderecos)
      if(existeUsuario) {
          const enderecoalterado = {
          ...existeUsuario,
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
          Messagem:"Usuario não localizado, por favor confira os dados informados"
  
      }) 
  })

//- [ ] Uma rota que ao receber um ID de usuário , consegue deletar ele da lista de usuários.
app.delete("/usuarios/:id", (req, res) => {
    const idUsuario = req.params.id

    const localizaUsuario = listaUsuarios.find((usuario) => usuario.id == idUsuario)

    if(localizaUsuario){
        listaUsuarios.map((usuario, index) => {
            if(usuario.id == usuario){
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