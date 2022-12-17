const express = require('express')
const app = express()
const port = 3333
const usuarios =require('./model/usuarios.json')
app.use(express.json())

app.put("/usuarios/:id",(req, res)=>{
    const IDusuario = req.params.id
    const userUpdated = req.body
    const findUser = usuarios.find(usuario => usuario.id == IDusuario)

    const newUser = usuarios.map((users, index)=>{
        if(usuarios.id == IDusuario){
            return usuarios[index] = userUpdated
            return res.status(200).json({message: "Usuário atualizado com sucesso"})
        }
        listaDeUsuarios.push(usuarioAtualizado)
        return res.status(201).json({ message:"O usuário não existe e foi criado com sucesso!"})
    })

})

app.delete ("/usuarios/delete", (req, res) => {
    const {id} = req.params
    const findUser = usuarios.find(id)
    if (findUser == null){
        res.status(404).json({message: "Não consegui encontrar o usuário, por favor cheque o id inserido."})
    };
    findCompany.splice(findUser);
    res.status(200).json({message: `A empresa ${findUser.name} foi deletada com sucesso.`})    
});

app.patch ('/update', (req, res) => {
    try {
    const {id} = req.params;
    const {
        address: {
            zipcode,
            street,
            city
          }
    } = req.body;
    const findUser = usuarios.find(id);
    const newAdress = {address: {
        zipcode,
        street,
        city
    }}
    if (findUser == null) {
        res.status(404).json({message: "Não consegui encontrar o usuário que você estava procurando, por favor cheque o id inserido novamente."})
    };
    const updatedAdress = newAdress.save();
    res.status(200).json({message: "Seu usuário foi atualizada com sucesso. <3"}) 
} catch (error) {
    res.status(500).json({message: error.message})
} 
});


app.listen(() => {
    console.log(`API está todando na porta ${port}`)
})
