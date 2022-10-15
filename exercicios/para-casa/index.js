const express = require("express")
const app = express()
const userList = require("./model/usuarios.json")
const port = 3000 

app.use(express.json())

// [x] Uma rota que atualiza todos os dados de cadastro de um usuário e se não for encontrado cria um novo na lista
//PUT
app.put("/users/:id", (req, res) =>{
    const idUser = req.params.id
    const updatedUser = req.body

    const thereIsTheUser = userList.find(user => user.id == idUser)

    if(thereIsTheUser){
        userList.map((user, index) =>{
            if(user.id == idUser){
                return userList[index] = updatedUser
            }
        })
        return res.status(200).json({message: "Successfully updated user!"}) // STATUS CODE 200 = OK
    }

    userList.push(updatedUser)

    return res.status(201).json({message: "As it couldn't find the user, created a new one"}) // STATUS CODE 201 = CREATED
})

// [x] Uma rota que atualiza apenas o endereço do usuário
//PATCH
app.patch("/users/:id", (req,res) =>{
    const idUser = req.params.id
    const newAddress = req.body

    const thereIsTheUser = userList.find(user => user.id == idUser)
    
    if(thereIsTheUser){
        const updatedUser ={
            ...thereIsTheUser,
            ...newAddress
        } //it ensures that all users will be subscribed

        userList.map((user,index) =>{ // it ensures that the list will be updated with the new users
            if(user.id == idUser){
                return userList[index] = updatedUser
            }
        })

        return res.status(200).json({message: "Successfully updated user!", user: updatedUser}) // STATUS CODE 200 = OK
    }
    return res.status(404).json({message:`Can't find the user: ${idUser}`})
})

// [x] Uma rota que ao receber um ID de usuário , consegue deletar ele da lista de usuários.
//DELETE
app.delete("/users/:id", (req, res) =>{
    const idUser = req.params.id

    const thereIsTheUser = userList.find((user) => user.id == idUser)

     if (thereIsTheUser){
        userList.map((user, index) =>{
            if(user.id == idUser) {
                return userList.splice(index,1)
            }
            })
        return res.status(200).json({
            message: "Successfully deleted user!", 
            user: thereIsTheUser
        }) //STATUS CODE 200 = OK
    }
    return res.status(404).json({message:`Can't find the user: ${idUser}`})//STATUS CODE 404 = NOT FOUND
})

// [x] Usar corretamente os retornos com os respectivos status codes!

app.listen(port, () => {
    console.log(`Api is working on the door ${port}`)
})