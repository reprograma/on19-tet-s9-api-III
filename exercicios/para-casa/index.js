
const express = require('express')
const app = express()
const listaUsuarios = require("./model/usuarios.json")
const port = 3000

app.use(express.json())

//- [DONE] Uma rota que atualiza todos os dados de cadastro de um usuário e se não for encontrado cria um novo na lista

app.put("/usuarios/:id", (req, res) => {
    const idUsuario = req.params.id
    const cadAtualizado = req.body

    const usuarioExistente = listaUsuarios.find((usuario) => usuario.id == idUsuario)

    if(usuarioExistente){
        return res.status(200).json(cadAtualizado)
    }

    listaUsuarios.push(cadAtualizado)
    return res.status(201).json(cadAtualizado) 
})

//- [DONE] Uma rota que atualiza apenas o endereço do usuário

app.patch("/usuarios/:id", (req, res) => {
    const idUsuario = req.params.id
    const enderecoAtualizado = req.body

    const acharIdEndereco = listaUsuarios.find((usuario) => usuario.id == idUsuario)
    if(acharIdEndereco) {
       acharIdEndereco.address = enderecoAtualizado
    
       return res.status(200).json(acharIdEndereco)

    }
    return res.status(404).json({
        mensagem: "Usuário não encontrado"
    })

})

//- [ ] Uma rota que ao receber um ID de usuário , consegue deletar ele da lista de usuários.

app.delete("/usuarios/:id", (req, res) => {
    const idUsuario = req.params.id
    const confereUsuario = listaUsuarios.find((usuario) => usuario.id == idUsuario)

    if(confereUsuario) {
        listaUsuarios.map((usuario, index) => {
            if(usuario.id == idUsuario) {
                return listaUsuarios.splice(index, 1)
            }
        })
        return res.status(200).json(listaUsuarios)
    }
    
    return res.status(404).json({
        mensagem: "Usuário não encontrato"
    })
})

    
app.listen(port, () => {
    console.log(`Api está rodando na porta ${port}`)
})
    
