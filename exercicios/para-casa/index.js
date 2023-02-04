
// o express é um framework do node
// já o require é usado pra importar módulos(para nodejs)
const express = require("express")
const app = express()
//local onde está o banco de dados
const listUsers = require("./model/usuarios.json")
const numPort= 3004
/*app.use () usado para Montar a função middleware
 ou montar em um caminho especificado,
 a função middleware é executada quando o caminho base corresponde./*
*/
 app.use(express.json())
 
//- [1] Uma rota que atualiza todos os dados de cadastro de um usuário e se não for encontrado cria um novo na lista
  
app.put("/updateAll/:id", (req, res)=>{
    //const IdUser = req.params.id
    const upgradeUser = req.body

    const showUser = listUsers.find(IdUser => IdUser.id == IdUser)
        if(showUser){
           
            return res.status(200).json(showUser)
        }
        listUsers.push(upgradeUser)

     return res.status(202).json(upgradeUser)
})

//- [2] Uma rota que atualiza apenas o endereço do usuário
app.patch("/updateAddress/:id", (req, res)=>{
    const CityUser = req.params.id
    const newAddress = req.body

    const showAdress = listUsers.find(user => CityUser.id == CityUser)
        if(showAdress){ 
            return res.status(400).json({message:" não é possivel fazer tal alteração"})
        }
        listUsers.push(newAddress)

     return res.status(202).json(newAddress)
        
})

//- [3] Uma rota que ao receber um ID de usuário , consegue deletar ele da lista de usuários.
app.delete("/deleteUser/:id",(req, res)=>{
    const deleteId = req.params.id

    const showId = listUsers.find((IdUser)=> IdUser.id == deleteId)

    if (showId){
        listUsers.map((IdUser, index)=>{
            if(IdUser.id == deleteId){
                return listUsers.splice(index, 1)
            }
        })
        return res.status(200).json({message : `O usuario com o id ${deleteId}, foi deletato como sucesso`})
    }
return res.status(404).json({
    message: "Usuario não encontrado"
})

 })
    
app.listen(numPort, ()=>{
    console.log(`A aplicação está funcionando na porta ${numPort}`)
})