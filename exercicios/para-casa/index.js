const express = require('express')
const app = express()
const listaDeUsuarios = require("./model/usuarios.json")
const port = 3333

app.use(express.json())


// [x] Rota que atualiza todos os dados de cadastro 
// de um usuário e se não for encontrado cria um novo na lista
app.put("/usuarios/:id", (req, res) => {
  const idUsuario = req.params.id;
  const idAtualizado = req.body;

  const usuario = listaDeUsuarios.find((usuario) => usuario.id == idUsuario);

  if (usuario) {
    const usuarioAtualizado = {
      ...usuario,
      ...idAtualizado,
    };
    for (let usuario of listaDeUsuarios) { // percorre objetos iterativos incluindo Array
      if (usuario.id == idUsuario) {
        listaDeUsuarios[usuario] = usuarioAtualizado;
      }
    }
    return res.status(200).json(usuarioAtualizado);
  }

  listaDeUsuarios.push(idAtualizado);
  return res.status(201).json(idAtualizado);
});


// [x] Rota que atualiza apenas o endereço do usuário.

app.patch("/usuarios/:id", (req, res) => {
  const idUsuario = req.params.id;
  const novoEndereco = req.body.address; // acessa apenas a propriedade endereço do usuário, garantindo que somente ela será atualizada.

  const usuario = listaDeUsuarios.find((usuario) => usuario.id == idUsuario);

  if (usuario) {
    usuario.address = novoEndereco;

    return res.status(200).json(usuario);
  }
  return res.status(404).json({ message: " Usuário não localizado. " });
});

// [x] Uma rota que ao receber um ID de usuário, 
// consegue deletar ele da lista de usuários.

app.delete("/usuarios/:id", (req, res) => {
  const idUsuario = req.params.id;

  const usuario = listaDeUsuarios.findIndex(
    (usuario) => usuario.id == idUsuario
  ); // localiza o índice do usuário que possui aquele id

  if (usuario === -1) {
    // -1 quando não encontra o usuário com determinado id, retornando o erro
    return res.status(404).json({ message: "Usuário não encontrado" });
  }

  listaDeUsuarios.splice(usuario, 1); // corta um elemento do array, aquele na posição do usuário encontrado
  return res.status(200).json(listaDeUsuarios);
});

app.listen(port,()=> {
    console.log(`Api esta rodando na porta ${port}`);
})