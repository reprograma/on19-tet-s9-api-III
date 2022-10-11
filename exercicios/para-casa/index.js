const express = require("express")
const app = express()
const dataList = require("./model/usuarios.json")
const port = 3000 

app.use(express.json())

// [x] Uma rota que atualiza todos os dados de cadastro de um usuário e se não for encontrado cria um novo na lista
//PUT
app.put("/data/:id", (req, res) =>{
    const idUser = req.params.id
    const updatedUser = req.body

    const thereIsTheUser = dataList.find(user => user.id == idUser)

    if(thereIsTheUser){
        dataList.map((user, index) =>{
            if(user.id == idUser){
                return dataList[index] = updatedUser
            }
        })
        return res.status(200).json(updatedUser) // STATUS CODE 200 = OK
    }

    dataList.push(updatedUser)

    return res.status(201).json(updatedUser) // STATUS CODE 201 = CREATED
})

// [x] Uma rota que atualiza apenas o endereço do usuário
//PATCH
app.patch("/data/:id", (req,res) =>{
    const idUser = req.params.id
    const onlyAddress = req.body

    const thereIsTheUser = dataList.find(user => user.id == idUser)
    
    onlyAddress[0] = dataList.address

    if(thereIsTheUser){
        const updatedUser ={
            ...thereIsTheUser,
            ...onlyAddress
        } //it ensures that all data will be subscribed

        dataList.map((user,index) =>{ // it ensures that the list will be updated with the new data
            if(user.id == idUser){
                return dataList[index] = updatedUser
            }
        })

        return res.status(200).json(updatedUser) // STATUS CODE 200 = OK
    }
    return res.status(404).json({
        message:"Can't find the user"
    })
})

// [x] Uma rota que ao receber um ID de usuário , consegue deletar ele da lista de usuários.
//DELETE
app.delete("/data/:id", (req, res) =>{
    const idUser = req.params.id

    const thereIsTheId = dataList.find((user) => user.id == idUser)

     if (thereIsTheId){

        dataList.map((user, index) =>{
            if(user.id == idUser) {
                return dataList.splice(index,1)
            }
            })
        return res.status(200).json(dataList) //STATUS CODE 200 = OK
    }
    return res.status(404).json({ //STATUS CODE 404 = NOT FOUND
        message:"Can't find the user"
    })
})

// [x] Usar corretamente os retornos com os respectivos status codes!

app.listen(port, () => {
    console.log(`Api is working on the door ${port}`)
})