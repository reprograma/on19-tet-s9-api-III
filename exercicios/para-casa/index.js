const express = require('express')
const app = express()
const listaDeUsuarios = require("./model/usuarios.json")
const port = 3000

app.use(express.json())

//Uma rota que atualiza todos os dados de cadastro de um usuário e se não for encontrado cria um novo na lista//
app.put("/usuarios/:id",(req, res)=>{
    const IDusuario = req.params.id
    const usuarioAtualizado = req.body

    const temUsuario = listaDeUsuarios.find(usuario => usuario.id == IDusuario)

    if(temUsuario){
        listaDeUsuarios.map((usuario, index)=>{
            if(usuario.id == IDusuario){
                return listaDeUsuarios[index] = usuarioAtualizado
            }
        })
        return res.status(200).json(usuarioAtualizado)
    }
    listaDeUsuarios.push(usuarioAtualizado)
    return res.status(201).json(usuarioAtualizado) 
})


//Uma rota que atualiza apenas o endereço do usuario//

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

//Uma rota que ao receber um ID de usuário , consegue deletar ele da lista de usuarios//

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