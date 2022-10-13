const express = require("express")
const app = express()
const port = 3000
const listaJson = require("./model/usuarios.json")

app.use(express.json())
// Utilizando os conhecimentos compartilhados na aula crie uma API restful com ExpressJS que entregue as seguintes rotas: 

// [X] Uma rota que atualiza todos os dados de cadastro de um usuário e se não for encontrado cria um novo na lista - DONE
app.put("/usuarios/:id", (req, res) => {
    const idUsuario = req.params.id
    const dadosUsuario = req.body

    const usuarioASerAtualizado = listaJson.find((usuario) => usuario.id == idUsuario)

    if (usuarioASerAtualizado) {
        return res.status(200).json(dadosUsuario)
    }

    listaJson.push(dadosUsuario)
    return res.status(201).json(dadosUsuario)

})
// [X] Uma rota que atualiza apenas o endereço do usuário - DONE
app.patch("/usuarios/:id", (req, res) => {
    const idDoUsuario = req.params.id
    const enderecoAtualizado = req.body

    const indiceUsuario = listaJson.findIndex((usuario, indice) => {
        if (usuario.id == idDoUsuario) {
            const dadosUsuarioEncontrado = listaJson[indice]

            const novoEndereco = {
                ...dadosUsuarioEncontrado,
                ...enderecoAtualizado
            }

            return res.status(200).json(novoEndereco)
        }
    })

    return res.status(404).json({
        message: "Id não encontrado"
    })
})
// [X] Uma rota que ao receber um ID de usuário , consegue deletar ele da lista de usuários - DONE
app.delete("/usuarios/:id", (req, res) => {
    const idASerExcluido = req.params.id
    const usuarioEncontrado = userList.find((usuario) => usuario.id == idASerExcluido)

    if (usuarioEncontrado) {
        listaJson.map((usuario, indice) => {
            if (usuario.id == idASerExcluido) {
                return listaJson.splice(indice, 1)
            }
        })

        return res.status(200).json(listaJson)
    }

    return res.status(404).json({
        message: "Id não encontrado"
    })
})

app.listen(port, () => {
    console.log(`API na porta ${port}`);
})