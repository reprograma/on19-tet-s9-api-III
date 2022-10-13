const express = require('express')
const app = express()
const listaUsuarios = require("./model/usuarios.json")
const port = 3330

app.use(express.json())

//fazer: 200 - OK; 201 - CREATED; 202 - ACCEPTED; 204 - NO CONTENT; 404 - NOT FOUND.

//1 teste
app.put("/usuarios/:id",(req, res)=>{
    const IDusuario = req.params.id
    const cadastroAtualizado = req.body

    const usuarioExiste = listaUsuarios.find(usuario => usuario.id == IDusuario)
    if(usuarioExiste){
        listaUsuarios.map((usuario, index)=>{
            if(usuario.id == IDusuario){
                return listaUsuarios[index] = cadastroAtualizado
            }
        })
        return res.status(200).json(cadastroAtualizado)
    }
    listaUsuarios.push(cadastroAtualizado)

    return res.status(201).json(listaUsuarios) 

})

//2 teste
app.patch("/usuarios/:id",(req, res)=>{
    const IDusuario = req.params.id
    const atualizarEndereco = req.body

    const usuarioExiste = listaUsuarios.find(usuario => usuario.id == IDusuario)

    if(usuarioExiste) {
        const novoEndereco = {
            ...usuarioExiste,
            ...atualizarEndereco
        }

        listaUsuarios.map((usuario, index)=>{
            if(usuario.id == IDusuario){
                return listaUsuarios[index] = novoEndereco
            }
        })
        return res.status(200).json(novoEndereco)
    }
    return res.status(404).json()
})

//3 teste
app.delete("/usuarios/:id",(req, res)=>{
    const IDusuario = req.params.id

    const usuarioExiste = listaUsuarios.find(usuario => usuario.id == IDusuario)
     if(usuarioExiste){
        listaUsuarios.map((usuario, index)=>{
            if(usuario.id == IDusuario){
                return listaUsuarios.splice(index,1)
            }
        })

        return res.status(200).json(listaUsuarios)
    }

    return res.status(404).json({
        message:"Usuário não existe"
    })
})

app.listen(port,()=>{
    console.log(`Aplicação está batendo na porta ${port}`)
})