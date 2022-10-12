const express = require('express')
const app = express()
const listaDeUsuarios = require("./model/usuarios.json")
const port = 3333

app.use(express.json())

app.put("/usuarios/:id",(req, res)=>{
    const IDusuario = req.params.id
    const cadastroAtualizado = req.body

    const existeUsuario = listaDeUsuarios.find(usuario => usuario.id == IDusuario)

    if(existeUsuario){
        listaDeUsuarios.map((usuario, index)=>{
            if(usuario.id == IDusuario){
                return listaDeUsuarios[index] = cadastroAtualizado
            }
        })
        return res.status(200).json(cadastroAtualizado)
    }
    listaDeUsuarios.push(cadastroAtualizado)

    return res.status(201).json(listaDeUsuarios) 
   
})

app.patch("/usuarios/:id",(req, res)=>{
    const IDusuario = req.params.id
    const endAtualizado = req.body

    const existeUsuario = listaDeUsuarios.find(usuario => usuario.id == IDusuario)

    if(existeUsuario) {
        const novoEndereco = {
            ...existeUsuario,
            ...endAtualizado
        }
        
        listaDeUsuarios.map((usuario, index)=>{
            if(usuario.id == IDusuario){
                return listaDeUsuarios[index] = novoEndereco
            }
        })
        return res.status(200).json(novoEndereco)
    }
    return res.status(404).json({message:"Usuário não foi encontrado"})
})

app.delete("/usuarios/:id",(req, res)=>{
    const IDusuario = req.params.id

    const existeUsuario = listaDeUsuarios.find(usuario => usuario.id == IDusuario)
     if(existeUsuario){
        listaDeUsuarios.map((usuario, index)=>{
            if(usuario.id == IDusuario){
                return listaDeUsuarios.splice(index,1)
            }
        })

        return res.status(200).json(listaDeUsuarios)
    }

    return res.status(404).json({
        message:"Usuário não existe"
    })
})

app.listen(port,()=>{
    console.log(`Api está rodando na porta ${port}`)
})