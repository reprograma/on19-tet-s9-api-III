const express = require("express")
const app = express()
const port = 3000
const userList = require("./model/usuarios.json")

app.use(express.json())
 
app.put("/users/:id", (req, res) => {
    const userId = Number(req.params.id)
    const userData = req.body
    
    const userUpdate = userList.findIndex(user => user.id === userId)
   
    if(userList.find((user) => user.id === userId)) {
        userList.splice(userUpdate, 1, userData)
        return res.status(200).json(userData)
    }

    userList.push(userData)
    return res.status(201).json(userData)
    
    
})

app.patch("/users/:id", (req, res) => {
    const id = Number(req.params.id)
    const newAdress = req.body

    const userIndex = userList.findIndex(user => user.id === id)
    
    if(userList.find((user) => user.id === id)) {
    const userFinded = userList[userIndex]
    
    const adressUpdate = {
        ...userFinded,
        ...newAdress
    }

    userList.splice(userIndex, 1, adressUpdate)
    return res.status(200).json(adressUpdate)
    }
    return res.status(404).json({
        message: "Bad request"
    })
})

app.delete("/users/:id", (req, res) => {
    const idForDelete = Number(req.params.id)
    const findUser = userList.find((user) => user.id === idForDelete)
   
    if(findUser){
        userList.map((user, index)=>{
            if(user.id === idForDelete){
                return userList.splice(index, 1)
            }
        })

        return res.status(200).json(userList)
    }

    return res.status(404).json({
        message:"Bad request"
    })
})

 app.listen(port, () => {
    console.log(`Listening on port ${port}`);
 })