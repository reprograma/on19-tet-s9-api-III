// # Exercício de Casa 🏠
//  Crie uma rota que atualiza todos os dados de cadastro de um usuário e se não for encontrado cria um novo na lista

const express = require('express')
const app = express()
const listaDeUsuarios = require("./model/usuarios.json")
const port = 3000

app.use(express.json())

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

    listaDeTarefas.push(usuarioAtualizado)

    return res.status(201).json(usuarioAtualizado) 
    
})

// Crie uma rota que atualiza apenas o endereço do usuário

app.patch("/usuarios/:id",(req, res)=>{
    const IDusuario = req.params.id
    const novosUsuario = req.body

    const existeUsuario = listaDeUsuarios.find(usuario => usuario.id == IDusuario)

    if(existeUsuario) {
        const usuarioAtualizado = {
            ...existeUsuario,
            ...novosUsuario
        }
     
        listaDeUsuarios.map((usuario, index)=>{
            if(usuario.id == IDusuario){
                return listaDeUsuarios[index] = usuarioAtualizado
            }
        })

        return res.status(200).json(tarefaAtualizada)
    }
    return res.status(404).json({message:"usuario não foi encontrado"})
})


//Cri uma rota que ao receber um ID de usuário , consegue deletar ele da lista de usuários.

app.delete("/usuarios/:id",(req, res)=>{
    const IDusuario = req.params.id

    const existeUsuario = listaDeUsuarios.find((usuario) => usuario.id == IDusuario)
   
    if(existeUsuario){
        listaDeUsuarios.map((usuario, index)=>{
            if(usuario.id == IDusuario){
                return listaDeUsuarios.splice(index,1)
            }
        })

        return res.status(200).json(listaDeTarefas)
    }

    return res.status(404).json({
        message:"usuario não foi encontrado"
    })
})


app.listen(port,()=>{
    console.log(`Api está rodando na porta ${port}`)
})