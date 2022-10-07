<h1 align="center">
  <img src="assets/reprograma-fundos-claros.png" alt="logo reprograma" width="500">
</h1>

# Tema da Aula

Turma Online 19 - Todas em Tech | Back-end | Semana 9 | 2022 | Professora Manuelly Suzik

### Instruções

Antes de começar, vamos organizar nosso setup.

- Fork esse repositório
- Clone o fork na sua máquina (Para isso basta abrir o seu terminal e digitar `git clone url-do-seu-repositorio-forkado`)
- Entre na pasta do seu repositório (Para isso basta abrir o seu terminal e digitar `cd nome-do-seu-repositorio-forkado`)
- [Add outras intrucoes caso necessario]

### Resumo

O que veremos na aula de hoje?

- [Método PUT](#PUT)
- [Método PATCH](#PATCH)
- [Método DELETE](#DELETE)

## Conteúdo

### PUT

O método PUT deve ser utilizado quando estamos falando sobre mandar em uma requisição de update, se sua entidade estará sendo atualizada integralmente. Ás vezes é usado até para criar um novo recurso.
Por exemplo:
Se eu quero atualizar os dados de um usuário no sistema, logo minha chamada PUT deve ir com TODOS os dados necessários, mesmo que eu não vá alterar todos eles:

```javascript
  {
    "nome":"João Braga Santos",
    "idade": 27,
    "data_nascimento": "21/08/1990",
    "escolaridade":"superior incompleto"
  }
```

Usando esse exemplo de cima, quando eu estou usando o método PUT, mesmo que eu mude o valor de apenas um dos itens do usuário ao enviar, preciso enviar a entidade Usuário inteira.

### PATCH

Já o método PATCH, assim como o PUT , também é usado para atualizar dados. Mas diferentemente do método PUT ao enviar os dados para a API eu não preciso enviar toda a entidade, apenas o item que quero que seja alterado

Usando o mesmo exemplo do usuário:

```javascript
  {
    "escolaridade":"superior completo"
  }
```

Normalmente para garantir que estarei alterando a escolaridade do usuário `João Braga Santos` preciso informar um identificador único desse usuário no meu endpoint.

### DELETE

Esse método é reservado para apagar dados. Normalmente não se envia nada no `body` da requisição quando se usa esse método. Então para identificar exatamente o dado que você quer que seja apagado é indicado usar um indentificador único no endpoint.

### Exercícios

- [Exercicio para sala](/exercicios/para-sala/)
- [Exercicio para casa](/exercicios/para-casa/)

### Material da aula

### Links Úteis

- [PUT VS PATCH](https://cursos.alura.com.br/forum/topico-diferenca-entre-put-e-patch-44669)
- [Método DELETE](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Methods/DELETE)
- [Método PATCH](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Methods/PATCH)
- [Método PUT](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Methods/PUT)

<p align="center">
Desenvolvido com :purple_heart:  
</p>
