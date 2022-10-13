const express = require("express");
const app = express();
const listUser = require("./model/usuarios.json");
const port = 3000;
app.use(express.json());

//Uma rota que atualiza todos os dados de cadastro de um usuário e se não for encontrado cria um novo na lista
app.put("/usuarios/:id", (req, res) => {
  const idUser = req.params.id;
  const userAtualizado = req.body;
  const userExistente = listUser.find((user) => user.id == idUser);

  if (userExistente) {
    listUser.map((user, index) => {
      if (user.id == idUser) {
        return (listUser[index] = userAtualizado);
      }
    });
    return res.status(200).json(userAtualizado);
  }
  listUser.push(userAtualizado);
  return res.status(201).json(listUser);
});


//Uma rota que atualiza apenas o endereço do usuário
app.patch("/usuarios/:id", (req, res) => {
  const idUser = req.params.id;
  const userAtualizado = req.body;
  const userExistente = listUser.find((user) => user.id == idUser);

  if (userExistente) {
    const newEndereco = {
      ...userExistente,
      ...userAtualizado,
    };
    listUser.map((user, index) => {
      if (user.id == idUser) {
        return (listUser[index] = newEndereco);
      }
    });
    return res.status(200).json(newEndereco);
  }
  return res.status(404).json({
    message: "O usuário não foi encontrado. Digite o ID correto",
  });
});


//Uma rota que ao receber um ID de usuário , consegue deletar ele da lista de usuários.
app.delete("/usuarios/:id", (req, res) => {
  const idUser = req.params.id;
  const userExistente = listUser.find((user) => user.id == idUser);
  if (userExistente) {
    listUser.map((user, index) => {
      if (user.id == idUser) {
        return listUser.splice(index, 1);
      }
    });
    return res.status(200).json(listUser);
  }
  return res.status(404).json({
    message: "O usuário não foi encontrado. Digite o ID correto",
  });
});

app.listen(port, () => {
  console.log(`Api está rodando na porta ${port}`);
});
