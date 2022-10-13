const express = require('express')
const app = express()
const listaUsuarios = require("./model/usuarios.json")
const port = 3000

app.use(express.json())

 // Usei o GET apenas para retornar a lista original de usuários
app.get("/usuarios", (req, res) => {
    res.json(listaUsuarios)
})



/**
 * - Utilizando os conhecimentos compartilhados na aula crie uma API restful com ExpressJS que entregue as seguintes rotas:



- [ ] Usar corretamente os retornos com os respectivos status codes!

 */

//- [ ] Uma rota que atualiza todos os dados de cadastro de um usuário e se não for encontrado cria um novo na lista DONE 

app.put("/usuarios/:id", (req, res) => {
    const IDusuario = req.params.id
    const novoUser = req.body

    const user = listaUsuarios.find(usuario => usuario.id == IDusuario)

    if(user){
        return res.status(200).json(novoUser)
    }

    listaUsuarios.push(novoUser)

    return res.status(201).json(novoUser) 
    
})


//- [ ] Uma rota que atualiza apenas o endereço do usuário DONE 

app.patch("/usuarios/:id",(req, res)=>{
    const IDusuario = req.params.id
    const updateUsuario = req.body

    const usuario = listaUsuarios.find(usuario => usuario.id == IDusuario)

    if(usuario) {
        const usuarioAtualizado = {
            ...usuario,
            ...updateUsuario
        }
       
        return res.status(200).json(usuarioAtualizado)
    }
    return res.status(404).json({message:"tarefa não foi encontrada"})
})

//- [ ] Uma rota que ao receber um ID de usuário , consegue deletar ele da lista de usuários.
app.delete("/usuarios/:id",(req, res)=>{
    const IDusuario = req.params.id

    const deletarUsuario = listaUsuarios.find((usuario) => usuario.id == IDusuario)
   
    if(deletarUsuario){
        listaUsuarios.map((usuario, index)=>{
            if(usuario.id == IDusuario){
                return listaUsuarios.splice(index,1)
            }
        })

        return res.status(200).json(listaUsuarios)
    }

    return res.status(404).json({
        message:"Tarefa não foi encontrada"
    })
})

app.listen(port,()=>{
    console.log(`Api está rodando na porta ${port}`)
})