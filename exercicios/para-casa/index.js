const express = require('express')
const app = express()
const listaDeUsuarios = require("./model/usuarios.json")
const port = 3000

app.use(express.json())
/*
[x] 1 Uma rota que atualiza todos os dados de cadastro de um usuário e se não for encontrado cria um novo na lista.*/

app.put("/tarefas/:id",(req, res)=>{
    const IDUsuario = req.params.id
    const tarefaAtualizada = req.body

    const temTarefa = listaDeUsuarios.find(tarefa => tarefa.id == IDUsuario)
    
    if(temTarefa){
        listaDeUsuarios.map((tarefa, index)=>{
            if(tarefa.id == IDUsuario){
                return listaDeUsuarios[index] = tarefaAtualizada
            }
        })
        return res.status(200).json(tarefaAtualizada)
    }

    listaDeUsuarios.push(tarefaAtualizada)

    return res.status(201).json(tarefaAtualizada) 
    
})

/*[ ] 2 Uma rota que atualiza apenas o endereço do usuário.*/


/*[ ] 3 Uma rota que ao receber um ID de usuário , consegue deletar ele da lista de usuários.*/

/*Usar corretamente os retornos com os respectivos status codes!*/

app. listen(port,()=>{
    console.log(`Api está rodando na porta ${port}`)
})