const  express = require("express")
const app = express()
const port = 3000
const ListaDeUsuarios = require("./model/usuarios.json")
app.use(express.json())
//- [ ] Uma rota que atualiza todos os dados de cadastro de um usuário e se não for encontrado cria um novo na lista
app.put("/usuarios/:id",(req, res)=>{
    const idusario = req.params.id
    const cadastroAtualizado = req.body

    const existeUsuario = ListaDeUsuarios.find(usuario => usuario.id == idusario)

    if(existeUsuario){
        ListaDeUsuarios.map((usuario, index)=>{
            if(usuario.id == idusario){
                return ListaDeUsuarios[index] = cadastroAtualizado
            }
        })
        return res.status(200).json(cadastroAtualizado)
    }
    ListaDeUsuarios.push(cadastroAtualizado)

    return res.status(201).json(ListaDeUsuarios) 

})
//- [ ] Uma rota que atualiza apenas o endereço do usuário
app.patch("/usuarios/:id",(req, res)=>{
    const Idusuario = req.params.id
    const atualizaEnderenço = req.body

    const UsuarioExistente = ListaDeUsuarios.find(usuario => usuario.id == Idusuario)
    if(existeUsuario) {
        const newEndereco = {
            ...UsuarioExistente,
            ...atualizaEnderenço
        }

        ListaDeUsuarios.map((usuario, index)=>{
            if(usuario.id == Idusuario){
                return ListaDeUsuarios[index] = newEndereco
            }
        })
        return res.status(200).json({message:" usuario atualizado com sucesso "})
    }
    return res.status(404).json({message:"Esse usuário não foi encontrado"})
})

//- [ ] Uma rota que ao receber um ID de usuário , consegue deletar ele da lista de usuários.
app.delete("/usuarios/:id",(req, res)=>{
    const Idusuario = req.params.id

    const existeUsuario = ListaDeUsuarios.find(usuario => usuario.id == Idusuario)
     if(existeUsuario){
        ListaDeUsuarios.map((usuario, index)=>{
            if(usuario.id == Idusuario){
                return ListaDeUsuarios.splice(index,1)
            }
        })

        return res.status(200).json({
            message:"Usuário apagado com sucesso",
            usuario: existeUsuario
        })
    }

    return res.status(404).json({
        message:`Não foi possível apagar o usuário com ID ${idusario} não existe´
    })
})













app.listen(port, ()=>{
    console.log(`a api está rodando na porta ${port}`)
    })