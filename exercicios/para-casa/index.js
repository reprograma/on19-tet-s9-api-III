const express = require('express')
const app = express()
const listaDeUsuario = require("./model/usuarios.json")
const port = 3003
app.use(express.json())

app.put("/usuarios/:id",(req, res)=>{
    const IDusuario = req.params.id
    const usuarioAtualizado = req.body

    const temUsuario = listaDeUsuario.find(usuario => usuario.id == IDusuario)

    if(temUsuario){
        listaDeUsuario.map((usuario, index)=>{
            if(usuario.id == IDusuario){
                return listaDeUsuario[index] = usuarioAtualizado
            }
        })
        return res.status(200).json(usuarioAtualizado)
    }
    listaDeUsuario.push(usuarioAtualizado)
    return res.status(201).json(usuarioAtualizado) 
})

app.patch("/usuarios/:id",(req, res)=>{
    const IDusuario = req.params.id
    const novosCampos = req.body

    const existeCadastro = listaDeUsuario.find(usuario => usuario.id == IDusuario)

    if(existeCadastro) {
        const usuarioAtualizado = {
            ...existeCadastro,
            ...novosCampos
        }
        listaDeUsuario.map((usuario, index)=>{
            if(usuario.id == IDusuario){
                return listaDeUsuario[index] = usuarioAtualizado
            }
        })

        return res.status(200).json(usuarioAtualizado)
    }
    return res.status(404).json({message:"usuário não foi encontrado"})
})
app.delete("/usuarios/:id",(req, res)=>{
    const IDusuario = req.params.id

    const existeUsuario = listaDeUsuario.find((usuario) => usuario.id == IDusuario)
    if(existeUsuario){
        listaDeUsuario.map((usuario, index)=>{
            if(usuario.id == IDusuario){
                return listaDeUsuario.splice(index,1)
            }
        })

        return res.status(200).json(listaDeUsuario)
    }

    return res.status(404).json({
        message:"Usuário não foi encontrada"
    })
})

app.listen(port,()=>{
    console.log(`Api está rodando na porta ${port}`)
})
