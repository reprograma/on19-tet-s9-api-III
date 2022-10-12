const express = require("express")
const app = express()
const listUsers = require("./model/usuarios.json")
const numPort= 3004

app.use(express.json())

/*
 
200 - OK
201 - CREATED
202 - ACCEPTED
204 - NO CONTENT ( nao aceita corpo da requisição)
404 - NOT FOUND
 */

//- [1] Uma rota que atualiza todos os dados de cadastro de um usuário e se não for encontrado cria um novo na lista

//ese código tá funcionando ! Ele atualiza o aniversario do usaurio
//precisa  de uma requisição  
app.put("/usuario/:id", (req, res)=>{
    const birthUser = req.params.birth_date
    const upgradeUser = req.body

    const showUser = listUsers.find(user => user.birth_date == birthUser)
        if(showUser){
           
            return res.status(200).json(showUser)
        }
        listUsers.push(upgradeUser)

     return res.status(201).json(upgradeUser)
})
// poderia usar mais  campos pra atualizar , mas to com preguiça 

//- [2] Uma rota que atualiza apenas o endereço do usuário
app.patch("/usuario/:id", (req, res)=>{
    const idUser = req.params.id
    const newAddress = req.body

    const showAdress = listUsers.find(user => idUser.id == idUser)
        if(showAdress){
           
            //return res.status(200).json(showAdress)
        }
        listUsers.push(newAddress)

     return res.status(202).json(newAddress)
})


//- [3] Uma rota que ao receber um ID de usuário , consegue deletar ele da lista de usuários.
app.delete("/usuario/:id",(req, res)=>{
    const deleteId = req.params.id

    const showId = listUsers.find((IdUser)=> IdUser.id == deleteId)

    if (showId){
        listUsers.map((IdUser, index)=>{
            if(IdUser.id == deleteId){
                return listUsers.splice(index, 1)
            }
        })
        return res.status(200).json(deleteId)
    }
return res.status(404).json({
    message: "Usuario não encontrado"
})

 })
    


app.listen(numPort, ()=>{
    console.log(`A aplicação está funcionando na porta ${numPort}`)
})