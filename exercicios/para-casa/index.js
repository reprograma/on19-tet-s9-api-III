const express = require("express")
const app = express()
const port = 3000

const listaDeUsuarios = require("./model/usuarios.json")

app.use(express.json())

// - [X] Uma rota que atualiza todos os dados de cadastro de um usuário e se não for encontrado cria um novo na lista - DONE
app.put("/usuarios/:id",(req, res)=>{
    const IDUsuario = req.params.id
    const usuarioAtualizado = req.body
    
    const existeUsuario = listaDeUsuarios.find(usuario => usuario.id == IDUsuario)
    if(existeUsuario){
        listaDeUsuarios.map((usuario, index)=>{
            if(usuario.id == IDUsuario){
                return listaDeUsuarios[index] = usuarioAtualizado
            }
        })

        // return res.status(200).json({
        //     message: "Usuário foi atualizado com sucesso!",
        //     user: usuarioAtualizado
        // })

        return res.status(200).json({message: "Usuário atualizado com sucesso"})
    }
    listaDeUsuarios.push(usuarioAtualizado)
    return res.status(201).json({ message:"O usuário não existe e foi criado com sucesso!"})
})
// - [X] Uma rota que atualiza apenas o endereço do usuário - DONE
app.patch("/usuarios/:id",(req, res)=>{
    const IDUsuario = req.params.id
    const novoEndereco = req.body

    const existeUsuario = listaDeUsuarios.find(usuario => usuario.id == IDUsuario)

    if(existeUsuario){
        const usuarioAtualizado = {
            ...existeUsuario,
            ...novoEndereco
        }

        listaDeUsuarios.map((usuario, index)=>{
            if(usuario.id == IDUsuario){
                listaDeUsuarios[index] = usuarioAtualizado
            }
        })
        return res.status(200).json({
            message:"Usuário atualizado com sucesso!",
            usuario:usuarioAtualizado
        }
        )
    }
    return res.status(404).json({message:`Usuário com o ID : ${IDUsuario} não existe`})
})
// - [X] Uma rota que ao receber um ID de usuário , consegue deletar ele da lista de usuários. - DONE
app.delete("/usuarios/:id",(req, res)=>{
    const IDUsuario = req.params.id
    
    const existeUsuario = listaDeUsuarios.find(usuario => usuario.id == IDUsuario)

    if(existeUsuario){
        listaDeUsuarios.map((usuario, index)=>{
            if(usuario.id == IDUsuario){
                listaDeUsuarios.splice(index,1)
            }
        })

        return res.status(200).json({
            message:"Usuário apagado com sucesso",
            usuario: existeUsuario
        }
        )
    }

    return res.status(404).json({ message:`Não foi possível apagar o usuário com ID ${IDUsuario} pois não foi encontrado`})
})

// - [X] Usar corretamente os retornos com os respectivos status codes! - DONE

app.listen(port, ()=>{ console.log(`A Api está rodando na porta ${3000}`)})