const express = require ("express")
const app = express()
const port = 3000

const usersList = require ("./model/usuarios.json")

app.use (express.json())

app.get ("/user", (req, res) => {
    return res.json (usersList)
})

//[x] Uma rota que atualiza todos os dados de cadastro de um usuário e se não for encontrado cria um novo na lista

app.put ("/user/:id", (req, res) => {
    const userID = req.params.id
    const updatedUser = req.body
    let updated = false
    const newUserList = usersList.map(userInfo => {
//                                 ^ map pega cada um dos itens de um array (nesse caso, objetos)
        if (userInfo.id == userID){
            updated = true
            return updatedUser
        }
        return userInfo
    })
    if (! updated){
        usersList.push (updatedUser)
        res.status(201).json(usersList)
        //               ^ retorna a lista de usuarios realmente atualizada na DB
        //    ^ status 201 = CREATED
    }
    else {
        for (let counter = usersList.length; counter > 0 ; counter--){
            usersList.pop()
            usersList.unshift(newUserList.pop())
            res.status(202).json(usersList)
            //               ^ retorna a lista de usuarios realmente atualizada na DB
            //    ^ status 202 = ACCEPTED
    }
    }
})

//[x] Uma rota que atualiza apenas o endereço do usuário

app.patch ("/user/address/:id", (req, res) => {
    const userID = req.params.id
    const newAddress = req.body

    const userExists = usersList.find (user => user.id == userID)

    if (userExists) {
        const addressUpdated = {
            ...userExists, ...newAddress
        }
        usersList.map ((user, index) => {
            if (user.id == userID) {
                return usersList[index] = addressUpdated
            }
        })
        return res.status(200).json(addressUpdated)
    }
    return res.status(404).json({message: "user not found"})
})

//[ ] Uma rota que ao receber um ID de usuário , consegue deletar ele da lista de usuários.

app.delete("/user/delete/:id", (req, res) => {
    const userID = req.params.id
    const userExists = usersList.find ((user) => user.id == userID)

    if (userExists){
        usersList.map ((user, index) => {
            if (user.id == userID){
                return usersList.splice(index, 1)
            }
        })
        return res.status (200).json (usersList)
    }
    return res.status (404).json ({message: "Usuário não encontrado"})
})

//[ ] Usar corretamente os retornos com os respectivos status codes!



app.listen (port, () => {
    console.log (`API is listening on port ${port}`)
})

