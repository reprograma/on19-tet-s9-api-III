const express = require("express")
const app = express()
const port = 3000
const listaDeUsuarios = require("./model/usuarios.json")

app.use(express.json())

//- [X] Uma rota que atualiza todos os dados de cadastro de um usuário 
//e se não for encontrado cria um novo na lista

app.put("/usuarios/:id", (req,res) => {
    const IDusuario = req.params.id
    const cadastroAtual = req.body

    const usuarioCadastrado = listaDeUsuarios.find(usuario => usuario.id == IDusuario)

    if (usuarioCadastrado) {
        listaDeUsuarios.map((usuario, index)=>{
            return listaDeUsuarios[index] = cadastroAtual
        })
        return res.status(200).json(cadastroAtual) //Atualiza o cadastro
    }
    listaDeUsuarios.push(cadastroAtual)
        return res.status(201).json(cadastroAtual) //Cria novo cadastro

})
//- [X] Uma rota que atualiza apenas o endereço do usuário

app.patch("/usuarios/:id", (req,res) => {
    const IDusuario = req.params.id
    const endAtualizado = req.body

    const existeUsuario = listaDeUsuarios.find(usuario => usuario.id ==IDusuario)

    const novaListaUsuarios = listaDeUsuarios.map((usuario)=>{
        if (existeUsuario) {
            const cadastroAtual =
             {...usuario,
              ...endAtualizado 
             }
        return res.status(200).json(cadastroAtual)
        } 
        return res.status(404).json({
            message: "Usuário não foi encontrado"
        })
    })
})

//- [X] Uma rota que ao receber um ID de usuário , consegue deletar ele da lista de usuários.
app.delete("/usuarios/:id", (req,res) => {
    const IDusuario = req.params.id 

    const existeUsuario = listaDeUsuarios.find((usuario) => usuario.id == IDusuario)
    if (existeUsuario){
        listaDeUsuarios.map((usuario,index) => {
            if(usuario.id == IDusuario) {
            listaDeUsuarios.splice(index,1)
            }
}) 
return res.status(200).json(listaDeUsuarios)
}
return res.status(404).json({
    message: "Usuário não encontrado"
})
}) 


//- [X] Usar corretamente os retornos com os respectivos status codes!


app.listen(port, () => {
    console.log(`API está rodando na porta ${port}`)
})