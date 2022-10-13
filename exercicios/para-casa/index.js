// [ ] Uma rota que atualiza todos os dados de cadastro de um usuário e se não for encontrado cria um novo na lista
// [ ] Uma rota que atualiza apenas o endereço do usuário
// [ ] Uma rota que ao receber um ID de usuário , consegue deletar ele da lista de usuários.

 const express = require('express')
 const app = express()
 const listaDeUsuários = require("./model/usuarios.json")
 const port = 3333

 app.use(express.json())
  

 app.put("/usuarios/:id", (req, res) => {
    const IDusuario = req.params.id
    const usuarioAtualizado = req.body

    const usuario = listaDeUsuários.find(usuario => usuario.id == IDusuario)

    if(usuario){
        listaDeUsuários.map((usuario, index)=>{
            if(usuario.id == IDusuario){
                return listaDeUsuários[index] = usuarioAtualizado
            }
        })
        return res.status(200).json(usuarioAtualizado)
    }
    listaDeUsuários.push(usuarioAtualizado)
    return res.status(201).json(usuarioAtualizado) 
})


app.listen(port,()=> { 
    console.log(`Api esta rodando na porta ${port}`);
})