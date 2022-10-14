const express = require('express')
const app = express()
const listaDeUsuarios = require("./model/usuarios.json")
const port = 3000

app.use(express.json())
/*
[x] 1 Uma rota que atualiza todos os dados de cadastro de um usuário e se não for encontrado cria um novo na lista.*/

app.put("/usuario/:id",(req, res)=>{
    const IDUsuario = req.params.id
    const cadastroAtualizado = req.body

    const temCadastro = listaDeUsuarios.find(usuario => usuario.id == IDUsuario)
    
    if(temCadastro){
        listaDeUsuarios.map((usuario, index)=>{
            if(usuario.id == IDUsuario){
                return listaDeUsuarios[index] = cadastroAtualizado
            }
        })
        return res.status(200).json(cadastroAtualizado)
    }

    listaDeUsuarios.push(cadastroAtualizado)

    return res.status(201).json(cadastroAtualizado) 
    
})

/*[x] 2 Uma rota que atualiza apenas o endereço do usuário.*/

app.patch("/usuario/:id",(req, res)=>{
    const IdUsuario = req.params.id
    const novosCampos = req.body

    const existeUsuario = listaDeUsuarios.find(usuario_atual => usuario_atual.id == IdUsuario)

    if(existeUsuario) {
        const usuarioAtualizado = {
            ...existeUsuario,
            ...novosCampos
        }
        // Garante que a lista de tarefas vai ser atualizada com o novo registro
        listaDeUsuarios.map((usuario_atual, index)=>{
            if(usuario_atual.id == IdUsuario){
                return listaDeUsuarios[index] = usuarioAtualizado
            }
        })

        return res.status(200).json(usuarioAtualizado)
    }
    return res.status(404).json({message:"tarefa não foi encontrada"})
})

/*[x] 3 Uma rota que ao receber um ID de usuário , consegue deletar ele da lista de usuários.*/
app.delete("/usuario/:id",(req, res)=>{
    const idRequest = req.params.id

    const existeUsuario = listaDeUsuarios.find((usuario) => usuario.id == idRequest)
    if(existeUsuario){
        listaDeUsuarios.map((usuario, index)=>{
            if(tarefa.id == idRequest){
                return listaDeUsuarios.splice(index,1)
            }
        })
        return res.status(200).json(listaDeUsuarios)
    }

    return res.status(404).json({
        message:"Tarefa não foi encontrada"
    })
})


app.listen(port,()=>{
    console.log(`Api está rodando na porta ${port}`)
})