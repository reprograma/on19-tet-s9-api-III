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

    const temCadastro = listaDeUsuarios.find(tarefa => tarefa.id == IDUsuario)
    
    if(temCadastro){
        listaDeUsuarios.map((tarefa, index)=>{
            if(tarefa.id == IDUsuario){
                return listaDeUsuarios[index] = cadastroAtualizado
            }
        })
        return res.status(200).json(cadastroAtualizado)
    }

    listaDeUsuarios.push(cadastroAtualizado)

    return res.status(201).json(cadastroAtualizado) 
    
})

/*[ ] 2 Uma rota que atualiza apenas o endereço do usuário.*/
/*
/app.patch("/usuario/:id",(req, res)=>{
    const IDUsuario = req.params.id
    const novosCampos = req.body

    const existeTarefa = listaDeUsuarios.find(tarefa => tarefa.id == IDUsuario)

    if(existeTarefa) {
        const tarefaAtualizada = {
            ...existeTarefa,
            ...novosCampos
        }
        // Garante que a lista de tarefas vai ser atualizada com o novo registro
        listaDeUsuarios.map((tarefa, index)=>{
            if(tarefa.id == IDUsuario){
                return listaDeUsuarios[index] = tarefaAtualizada
            }
        })

        return res.status(200).json(tarefaAtualizada)
    }
    return res.status(404).json({message:"tarefa não foi encontrada"})
})
*/


app.patch("/usuario/:id",(req, res)=>{
    const idRequest = req.params
    const bodyRequest = req.body

    const foundUser = listaDeUsuarios.find(user => user.id == idRequest)

    if(foundUser == undefined){
        res.status(404).send({message: 'Usuário não encontrado'})
    }

    bodyRequest.id == idRequest

    Object.keys(foundUser).forEach((chave)=>{
        if(bodyRequest[chave] == undefined){
            foundUser[chave] = foundUser[chave]
        }else{
            foundUser[chave] = bodyRequest[chave]
        }
    })

    res.status(200).send([{menssage: "Atualizado com sucesso", foundUser}])
})



/*[ ] 3 Uma rota que ao receber um ID de usuário , consegue deletar ele da lista de usuários.*/
app.delete("/usuario/:id",(req, res)=>{
    const IDUsuario = req.params.id

    const existeTarefa = listaDeUsuarios.find((tarefa) => tarefa.id == IDUsuario)
    //False = 0, null , [] , {} , undefined , false
    //True = {...}, 1 , True
    if(existeTarefa){
        listaDeUsuarios.map((tarefa, index)=>{
            if(tarefa.id == IDUsuario){
                return listaDeUsuarios.splice(index,1)
            }
        })

        return res.status(200).json(listaDeUsuarios)
    }

    return res.status(404).json({
        message:"Tarefa não foi encontrada"
    })
})


/*Usar corretamente os retornos com os respectivos status codes!*/

app. listen(port,()=>{
    console.log(`Api está rodando na porta ${port}`)
})