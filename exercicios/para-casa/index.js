const express = require('express')
const app = express()
const listaUsuarios = require("./model/usuarios.json")
app.use(express.json())
const port = 3000

app.put("/usuarios/:id", (req, res) => {
    const Idcadastros = req.params.id
    const usuarioAtualizado = req.body

    const temUsuario = listaUsuarios.find(usuarios => usuarios.id == Idcadastros)

    if (temUsuario) {
        return res.status(200).json(usuarioAtualizado)
    }

    listaUsuarios.push(usuarioAtualizado)

    return res.status(201).json(usuarioAtualizado)

})


app.patch("/usuarios/:id", (req, res) => {
    const Idcadastros = req.params.id
    const camposAtualizados = req.body

    const existeEnderenco = listaUsuarios.find(usuarios => usuarios.id == Idcadastros)

    if (existeEnderenco) {
        const enderecoAtualizado = {
            ...existeEnderenco,
            ...camposAtualizados
        }
        listaUsuarios.map((usuarios, index)=>{
            if(usuarios.id == Idcadastros){
                return listaUsuarios[index] = enderecoAtualizado
            }
        })

        return res.status(200).json(enderecoAtualizado)
    }

    return res.status(404).json({
        messagem: "Usuario não Encontrado, por favor verifique."
    })
})

/*  MEU PRIMEIRO CODIGO DELETE VERSÃO 1.0

app.delete("/usuarios/:id", (req, res) => {
    const Idcadastros = req.params.id
    const deletecampos = req.body

    const newlist = listaUsuarios.map((usuarios) => {
        if (usuarios.id == Idcadastros) {
            return delete { // aqui vai retornar um true, que apagou o id e seus parametros.
                ...usuarios,
                ...deletecampos
            }
        }
        return usuarios
    })
    res.status(200).json(newlist)

})
*/

// VERSÃO 2.0 UTILIZANDO find, splice 

app.delete("/usuarios/:id", (req, res) => {
    const Idcadastros = req.params.id
    const existeUsuario = listaUsuarios.find((usuarios) => usuarios.id == Idcadastros)
    if (existeUsuario) {
        listaUsuarios.map((usuarios, index) => {
            if (usuarios.id == Idcadastros) {
                return listaUsuarios.splice(index, 1)
            }
        })
        return res.status(200).json(listaUsuarios)
    }
    return res.status(404).json({
        message: "Usuario não Encontrado, por favor verifique."
    })

})



app.listen(port, () => { //escutou a porta
    console.log("API está rodando normalmente")
})