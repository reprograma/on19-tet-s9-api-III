const express = require('express')
const app = express()
const listaDeUsuários = require("./model/usuarios.json")
const port = 3333

app.use(express.json())

//[ ] Uma rota que atualiza todos os dados de cadastro de um usuário e se não for encontrado cria um novo na lista

app.put("/usuarios/:id", (req, res) => {
    const IDusuario = req.params.id
    const usuarioAtualizado = req.body

    const temUsuario = listaDeUsuarios.find(usuario => usuario.id == IDusuario)
    console.log(listaDeUsuários);

    if(temUsuario) {
        return res.status(200).json(usuarioAtualizado)
    }

    listaDeUsuarios.push(usuarioAtualizada)
   return res.status(201).json(usuarioAtualizado)

})

//- [ ] Uma rota que atualiza apenas o endereço do usuário

app.patch("/usuarios/:id", (req, res) => {
    const IDusuario = req.params.id
    const novoUsuario = req.body

    const existeUsuario = listaDeUsuarios.find(usuario => usuario.id == IDusuario)

    if(existeUsuario) {
        const usuarioAtualizado = {
            ... existeUsuario, 
            ... novoUsuario
        }

        listaDeUsuários.map((tarefa, index)=>{
            if(usuario.id == IDusuario){
                return listaDeUsuários[index] = usuarioAtualizado
            }
        })

        return res.status(200).json(usuarioAtualizado)
    }
    return res.status(404).json({
        message: "Usuario não encontrado"
    })
})


//- [ ] Uma rota que ao receber um ID de usuário , consegue deletar ele da lista de usuários.

app.delete("/usuarios/:id", (req, res) => {
    const IDUsuario = req.params.id

    const existeUsuario = listaDeUsuarios.find((usuario) => usuario.id == IDUsuario)

    if(existeUsuario){
        
        listaDeUsuarios.map((tarefa, index) => {
            if(usuario.id == IDUsuario){
                return listaDeUsuarios.splice(index,1)
            } 
            
        })

        return res.status(200).json(listaDeUsuarios) 
    }

    return res.status(404).json({
        message: "Usuario inexistente"
    })
})

app.listen(port,()=> {
    console.log(`Api esta rodando na porta ${port}`);
})