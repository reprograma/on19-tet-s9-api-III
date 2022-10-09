const express = require ('express')
const app = express()
const userList = require("./model/usuarios.json")
const port = 3030

app.use(express.json())

//[ ] Uma rota que atualiza todos os dados de cadastro de um usuário e se não for encontrado cria um novo na lista

app.put("/user/:id",(req,res)=>{
    const IDUser = req.params.id
    const updatedUser = req.body

    const validUser = userList.find(user => user.id == IDUser)

    if(validUser){
        return res.status(200).json(updatedUser)
    }
    userList.push(updatedUser)

    return res.status(201).json(updatedUser)
})

//[ ] Uma rota que atualiza apenas o endereço do usuário

app.patch("/user/:id",(req,res)=>{
    const IDUser = req.params.id
    const newAddress = req.body

    const validUser = userList.find(user => user.id == IDUser)

    if(validUser){
        validUser.address = newAddress
        
        return res.status(200).json(validUser)
    }
    res.status(404).json({
        message:"Usuário não foi encontrado"
    })
})

//[ ] Uma rota que ao receber um ID de usuário , consegue deletar ele da lista de usuários.

app.delete("/user/:id",(req,res)=>{
    const IDUser = req.params.id

    const validUser = userList.find((user)=> user.id == IDUser)

    if(validUser){
        userList.map((user,i)=>{
            if(user.id == IDUser){
                return userList.splice(i,1)
            }
        })
        return res.status(200).json(userList)
    }
    return res.status(404).json({
        message:"Usuário não foi encontarado"
    })
})

app.listen(port,()=>{
    console.log(`Api esta rodando na porta ${port}`);
})