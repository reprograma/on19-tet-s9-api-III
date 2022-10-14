const express = require('express')
const app = express()
const listaDeUsuarios = require("./model/usuarios.json")
const port = 3002

app.use(express.json())

app.put("/usuarios/:id",(req, res)=>{
    const IDusuario = req.params.id
    const usuarioAtualizado = req.body

    const oUsuario = listaUsuarios.find(usuario => usuario.id == IDusuario)

    if(oUsuario){
        listaUsuarios.map((usuario, index)=>{
            if(usuario.id == IDusuario){
                return listaUsuarios[index] = usuarioAtualizado
            }
        })
        return res.status(200).json(usuarioAtualizado)
    }
    listaUsuarios.push(usuarioAtualizado)
    return res.status(201).json(usuarioAtualizado) 
})

app.patch("/usuarios/:id",(req,res) => {

    const idUsuario = req.params.id
    const dadoAlterado = req.body

    const novaListaUsuario = listaDeUsuarios.map((usuario) => {
     if(usuario.id == idUsuario)
         return  {
            ...usuario, 
            ...dadoAlterado
     }

     return usuario

})


res.status(202).json(novaListaUsuario)
})

app.delete("/usuarios/:id",(req,res) =>{
    const idUsuario = req.params.id

    const deletarUsuario = listaDeUsuarios.find((usuario) => usuario.id == idUsuario)

    if(deletarUsuario){
        listaDeUsuarios.map((usuario, index)=>{
            if(usuario.id == idUsuario){
                return listaDeUsuarios.splice(index,1)
            }
        })

        return res.status(200).json(listaDeUsuarios)
    }

    return res.status(404).json({
        message:"Usuário não foi encontrado"
    })   
})


app.listen(port,()=>{
console.log(`Api está rodando na porta ${port}`)
})