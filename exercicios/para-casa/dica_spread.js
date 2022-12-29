//execute esse código com: node dica_spread.js


const apenasUmRegistroEncontrado = {
    id: 1,
    name: "Bryan Curry",
    address: {
      zipcode: "52481",
      street: "Giwip Highway",
      city: "Uvikuce"
    },
    profession: "Environmental Attorney",
    birth_date: "1998-02-10T19:31:16.859Z"
  }

const enderecoNovo = {
    address: {
      zipcode: "1111",
      street: "2222",
      city: "3333"
    }
}

const resultadoApenasUmRegistro = {
    ...apenasUmRegistroEncontrado,
    ...enderecoNovo
}

console.log(resultadoApenasUmRegistro)



