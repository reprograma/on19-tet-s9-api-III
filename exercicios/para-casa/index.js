  const express = require ("express")
  const app = express()
  const listaDeUsuarios = require("./model/usuarios.json")
  const port = 3003
  app.use(express.json())
  

  //- [X] Uma rota que atualiza todos os dados de cadastro de um usuário e se não for encontrado cria um novo na lista

  app.put("/usuarios/:id",(req,res) => {

   const idUsuario = req.params.id
   const usuarioAlterado= req.body

   const novaListaUsuario = listaDeUsuarios.map((usuario) => {
    if(usuario.id == idUsuario){
        return usuario = usuarioAlterado
    }
   
return usuario
  })
  res.status(202).json(novaListaUsuario) 

})
  
    //- [X] Uma rota que atualiza apenas o endereço do usuário
  
    app.patch("/usuarios/:id",(req,res) => {

        const idUsuario = req.params.id
        const dadoAlterado = req.body
     
        const novaListaUsuario1 = listaDeUsuarios.map((usuario) => {
         if(usuario.id == idUsuario)
             return  {...usuario, ...dadoAlterado
         }

         return usuario

    })
  
   
    res.status(202).json(novaListaUsuario1)
 })
  
  
    
   
    //- [X] Uma rota que ao receber um ID de usuário , consegue deletar ele da lista de usuários.
  /*app.delete("/usuarios/:id",(req,res) =>{
        const idUsuario = req.params.id
    
        const usuarioDeletado = listaDeUsuarios.filter((usuario )=> {
            if(usuario.id != idUsuario)
            return usuario
        })
    
        console.log(usuarioDeletado)
        return res.status(202).json(usuarioDeletado)
        
    })*/

    app.delete("/usuarios/:id",(req,res) =>{
        const idUsuario = req.params.id
    
        const deletarUsuario = listaDeUsuarios.find((usuario) => usuario.id == idUsuario)
      
        if(deletarUsuario){
            listaDeUsuarios.map((usuario, index)=>{
                if(usuario.id == idUsuario){
                    return listaDeUsuarios.splice(index,1)
                }
            })
    
            return res.status(200).json(listaDeUsuarios)
        }
    
        return res.status(404).json({
            message:"Tarefa não foi encontrada"
        })   
    })


    app.listen(port,() => {
        console.log(`API está rodando na porta ${port}`)
    })
      




    
