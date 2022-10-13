const express = require('express')
const app = express()
const listaDeUsuários = require("./model/todo-list.json")
const port = 3000

app.use(express.json())

//[ ] Uma rota que atualiza todos os dados de cadastro de um usuário e se não for encontrado cria um novo na lista






//- [ ] Uma rota que atualiza apenas o endereço do usuário
//- [ ] Uma rota que ao receber um ID de usuário , consegue deletar ele da lista de usuários.


app.listen(port,()=> {
    console.log(`Api esta rodando na porta ${port}`);
})