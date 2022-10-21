const express = require('express');
const app = express();
const port = 3000;
const listaDeClientes = require('./model/contas-clientes.json')
const gerarID = require('uuid');
const moment = require('moment')


app.use(express.json());

// Criando os clientes do banco 

app.post('/clientes/add', (req, res) => {
    const { nomeCliente, nome_cliente, cpf_cliente, data_nascimento, conta: { numero, tipo, saldo, data_criacao } } = req.body
    const numeroConta = Math.random()
    const dataContaCriada = moment().format('DD/MM/YYYY')
 

    const existeCPF = listaDeClientes.find(
        (conta) => conta.cpf_cliente == cpf_cliente
    )

    if(!existeCPF) {

        const novoCliente = {
            id: gerarID.v4(),
            nome_cliente: nome_cliente,
            cpf_cliente: cpf_cliente,
            data_nascimento: data_nascimento,
            conta: {
                numero: numeroConta,
                tipo: tipo,
                saldo: saldo,
                data_criacao: dataContaCriada
            }
        }

    }

    listaDeClientes.push(nomeCliente)
    return res.json(novoCliente)
})

// Atualizar informações desses clientes ( como endereço, telefone de contato...) *CLIENTE IS NOT DEFINED*

app.patch('/clientes/:id/atualizar', (req, res) => {
    const nameCliente = req.params.id
    const { nome_cliente, cpf_cliente, data_nascimento, conta: { numero, tipo} } = req.body

    const clienteExistente = listaDeClientes.find(
        (cliente) => cliente.nome_cliente == nameCliente
    )

    if (clienteExistente) {
        const usuarioAtualizado = {
            ...clienteExistente,
            conta: {
                numero,
                tipo
            }
        }

        listaDeClientes.map((cliente, index) => {
            if (cliente.id == idCliente) {
                listaDeClientes[index] = usuarioAtualizado
            }
        })
        return res.status(200).json({
            message: `O usuário ${clienteExistente.nome_cliente} foi atualizado com sucesso`
        })
    }
    return res.status(404).json({ messagem: 'O usuário não existe' })
})


// Fazer depósitos ou pagamentos em conta: 


app.patch('/clientes/:id/deposito', (req,res) => {
    const idCliente = req.params.id
    const { deposito } = req.body

    const existeCliente = listaDeClientes.find(
        (cliente) => cliente.id == idCliente
    )

    if (existeCliente) {
        const depositar = {
            ...existeCliente.conta,
            saldo: existeCliente.conta.saldo + deposito
        }
        listaDeClientes.map((cliente,index) => {
            if(cliente.id == idCliente)
            return listaDeClientes[index] = depositar
        })
        return res.status(200).json(depositar)
    }
    return res.status(404).json("O cliente não foi localizado")
})


//Encerrar contas de clientes

app.delete('/clientes/:id', (req, res) => {
    const idUsuarios = req.params.id

    existeCliente = listaDeClientes.find((cliente) => cliente.id == idUsuarios)

    if (existeCliente) {
        listaDeClientes.map((cliente, index) => {
            if (cliente.id == idUsuarios) {
                return listaDeClientes.splice(index, 1)
            }
        })
        return res.status(200).json({
            message: "cliente excluido com sucesso!",
            user: existeCliente
        })
    }

    return res.status(404).json({ message: `não foi possível encontrar o usuário ${idUsuarios}` })
})


app.listen(port, () => {
    console.log(`API está rodando na porta ${port}`);
})