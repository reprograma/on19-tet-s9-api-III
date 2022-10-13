
const express = require('express')
const app = express()
const listaUsuarios = require("./model/usuarios.json")
const port = 3000

app.use(express.json())

//- [DONE] Uma rota que atualiza todos os dados de cadastro de um usuário e se não for encontrado cria um novo na lista

app.put("/usuarios/:id", (req, res) => {
    const idUsuario = req.params.id
    const cadastroAtualizado = req.body

    const usuarioExistente = listaUsuarios.find((usuario) => usuario.id == idUsuario)

    if(usuarioExistente){
        listaUsuarios.map((usuario,index)=> {
            usuario.id == idUsuario 
                return listaUsuarios[index] = cadastroAtualizado
            })
        
        return res.status(200).json(cadastroAtualizado)
    }

    listaUsuarios.push(cadastroAtualizado)
    return res.status(201).json(cadastroAtualizado) 
})

//- [DONE] Uma rota que atualiza apenas o endereço do usuário

app.patch("/usuarios/:id", (req, res) => {
    const idUsuario = req.params.id
    const enderecoAtualizado = req.body

    const verificarUsuario = listaUsuarios.find((usuario) => usuario.id == idUsuario)
    if(verificarUsuario) {
        verificarUsuario.address = enderecoAtualizado
    
       return res.status(200).json(verificarUsuario)
       const usuarioAtualizado = {
        ...verificarUsuario,
        ...enderecoAtualizado
       }
       listaUsuarios.map((usuario, index) => {
        if(usuario.id == idUsuario){
            return listaUsuarios[index] = usuarioAtualizado
        }
       })
    }    
    return res.status(404).json({
        mensagem: "Usuário não encontrado"
    })

})

//- [DONE] Uma rota que ao receber um ID de usuário , consegue deletar ele da lista de usuários.

app.delete("/usuarios/:id", (req, res) => {
    const idUsuario = req.params.id
    const usuarioADeletar = listaUsuarios.find((usuario) => usuario.id == idUsuario)

    if(usuarioADeletar) {
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
    
