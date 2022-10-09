const express = require('express')
const app = express()
const listaUsuarios = require("./model/usuarios.json")
const port = 3000

app.use(express.json())



/**
 * - Utilizando os conhecimentos compartilhados na aula crie uma API restful com ExpressJS que entregue as seguintes rotas:

- [ ] Uma rota que atualiza apenas o endereço do usuário
- [ ] Uma rota que ao receber um ID de usuário , consegue deletar ele da lista de usuários.
- [ ] Usar corretamente os retornos com os respectivos status codes!

 */

//- [ ] Uma rota que atualiza todos os dados de cadastro de um usuário e se não for encontrado cria um novo na lista

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




app.listen(port,()=>{
    console.log(`Api está rodando na porta ${port}`)
})