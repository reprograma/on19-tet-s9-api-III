const express = require('express')
const app = express()
const usuarios = require("./model/usuarios.json")
const port = 3000

app.use(express.json())

app.get("/usuarios", (req, res) => { //Criei e deixei um método Get pois não era possível conferir os resultados de atualizações sem receber a lista completa
    return res.json(usuarios)
})

app.put("/usuarios/:id", (req,res) => {
    const usuarioID = req.params.id
    const usuarioAtualizado = req.body

    const encontraUsuario = usuarios.find(usuario => usuario.id == usuarioID)

    if (encontraUsuario) {
        usuarios.map((usuario, index) => {
            if(usuario.id == usuarioID) {
                return usuarios[index] = usuarioAtualizado
            }
        })
        return res.status(200).json(usuarioAtualizado)
    }
    
    usuarios.push(usuarioAtualizado)

    return res.status(201).json(usuarioAtualizado)
})

app.patch("/usuarios/:id", (req, res) => {
    const usuarioID = req.params.id 
    const alteraEndereco = req.body

    const encontraUsuario = usuarios.find(usuario => usuario.id == usuarioID)

    if(encontraUsuario) {
        const usuarioAtualizado = {
            ... encontraUsuario,
            ... alteraEndereco
        }
        usuarios.map((usuario,index) => {
            if (usuario.id == usuarioID) {
                usuario.address = alteraEndereco
                return usuario[index] = usuarioAtualizado
            }
        })
        return res.status(200).json(usuarioAtualizado)
    }

    res.status(404).json({
        mensagem: "Usuário não encontrado."
    })
})


app.delete("/usuarios/:id", (req, res) => {
    const usuarioID = req.params.id 

    const encontraUsuario = usuarios.find(usuario => usuario.id == usuarioID)

    if(encontraUsuario) {
        usuarios.map((usuario, index) => {
            if (usuario.id == usuarioID) {
                return usuarios.splice(index, 1)
            }
        })
        return res.status(200).json(usuarios)
}
    return res.status(404).json({
        mensagem: "Usuário não encontrado."
    })
})

app.listen(port, () => {
    console.log(`API está ouvindo a porta ${port}.`);
})