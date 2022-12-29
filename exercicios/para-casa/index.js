const express = require('express')
const app = express()
const userlist = require("./model/usuarios.json")
const port = 3333;

app.use(express.json())

// Route that updates all user data, if no user is found, a new one is created
app.get("usuarios", (req, res) => {
    return res.json(usuarios)
})

app.put("/usuarios/:id", (req,res) => {
    const userID = req.params.id
    const UpdatedUser = req.body

const findUser = userlist.find(user => user.id == userID)
        if (findUser) {
            users.map((user, index) => {
                if(user.id == userID) {
                    return users[index] = UpdatedUser
                }
            })
        return res.status(200).json(UpdatedUser)({message: "User updated!"})
        }
    
    users.push(UpdatedUser)

    return res.status(201).json(UpdatedUser)({message: "New user created!"})
})

//- Route that updates only users ID 

app.patch("/usuarios/:id",(req, res)=>{
    const UserId = req.params.id
    const UpdatedUser = req.body

    const user = userlist.find(user => user.id == userID)

    if(user) {
        const UpdatedUser = {
            ...user,
            ...UpdatedUser
        }
       
        return res.status(200).json(UpdatedUser)
    }
    return res.status(404).json({message:"User not found :("})
})

//- Route that deletes users based on their ID
app.delete("/usuarios/:id",(req, res)=>{
    const userID = req.params.id

    const DeleteUser = userlist.find((user) => user.id == userID)
   
    if(DeleteUser){
        userlist.map((user, index)=>{
            if(user.id == IDusuario){
                return userlist.splice(index,1)
            }
        })
        return res.status(200).json(userlist)
    }
    return res.status(404).json({
        message:"Task not found."
    })
})

app.listen(port,()=>{
    console.log(`API running at ${port}`)
})
