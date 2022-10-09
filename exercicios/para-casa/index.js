const express = require('express')
const app = express()
const ListaDeUsuarios = require("./model/usuarios.json")
app.use(express.json())
const port = 3000

app.put("/usuarios/:id", (req, res) => {
    const Idcadastros = req.params.id
    const UsuariosAtualizado = req.body

    const TemUsuario = ListaDeUsuarios.find(usuarios => usuarios.id == Idcadastros)

    if (TemUsuario) {
        return res.status(200).json(UsuariosAtualizado)
    }

    ListaDeUsuarios.push(UsuariosAtualizado)

    return res.status(201).json(UsuariosAtualizado)

})


app.patch("/usuarios/:id", (req, res) => {
    const Idcadastros = req.params.id
    const trazcampos = req.body

    const existeEnderenco = ListaDeUsuarios.find(usuarios => usuarios.id == Idcadastros)

    if (existeEnderenco) {
        const EnderecoAtualizado = {
            ...existeEnderenco,
            ...trazcampos
        }
        return res.status(200).json(EnderecoAtualizado)
    }

    return res.status(404).json({
        messagem: "Usuario não Encontrado, AJUSTA AI!!!!"
    })
})

/*  MEU PRIMEIRO CODIGO DELETE VERSÃO 1.0

app.delete("/usuarios/:id", (req, res) => {
    const Idcadastros = req.params.id
    const deletecampos = req.body

    const newlist = ListaDeUsuarios.map((usuarios) => {
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
    const existeUsuario = ListaDeUsuarios.find((usuarios) => usuarios.id == Idcadastros)
    if (existeUsuario) {
        ListaDeUsuarios.map((usuarios, index) => {
            if (usuarios.id == Idcadastros) {
                return ListaDeUsuarios.splice(index, 1)
            }
        })
        return res.status(200).json(ListaDeUsuarios)
    }
    return res.status(404).json({
        message: "Usuario não encontrado"
    })

})



app.listen(port, () => { //escutou a porta
    console.log("API está rodando normalmente")
})