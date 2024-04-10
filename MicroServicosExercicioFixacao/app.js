const express = require('express')
const app = express()
const port = 3000
app.use(express.json())
const alunos = [];

function buscarAluno(ra) {
    const index = alunos.findIndex(aluno => aluno.ra == ra);
    return index
}



//### Post – Adicionar um aluno na lista
function adicionarAluno(ra, nome, turma, habilidade) {

    if (buscarAluno(ra) in alunos) {
        return "Ra já cadastrado"
    }
    else {
        let aluno = {
            "ra": ra,
            "nome": nome,
            "turma": turma,
            "habilidade": habilidade
        }
        alunos.push(aluno);
    }
}

app.post('/', (req, res) => {
    adicionarAluno(req.body.aluno.ra, req.body.aluno.nome, req.body.aluno.turma, req.body.aluno.habilidade)
    res.send(`Aluno ${req.body.aluno.nome} cadastrado com sucesso!`) //colocar uma msg a ser exibida caso o ra seja o mesmo.
})





//### Post – Adicionar um curso para o aluno

function manipularHabilidade(ra, habilidade) {
    alunos[buscarAluno(ra)].habilidade = habilidade
}

app.post('/addHabilidade', (req, res) => {
    manipularHabilidade(req.query.ra, req.body.aluno.habilidade);
    res.send(JSON.stringify(alunos))
})






//Put – Alterar os dados de um aluno através do RA

function alterarDados(ra, nome, turma, habilidade) {
    alunos[buscarAluno(ra)].nome = nome
    alunos[(buscarAluno(ra))].turma = turma
    manipularHabilidade(ra, habilidade)
}

app.put('/alterarDados', (req, res) => {
    alterarDados(req.query.ra, req.body.aluno.nome, req.body.aluno.turma, req.body.aluno.habilidade)
    res.send(JSON.stringify(alunos))
})



//Put – Alterar o curso do aluno
app.put('/alterarCurso', (req, res) => {
    manipularHabilidade(req.query.ra, req.body.aluno.habilidade);
    res.send(JSON.stringify(alunos))
})




//Delete – Remover um aluno da lista
function deletarAluno(ra) {
    alunos.splice(buscarAluno(ra)) //splice exclui o índice nos parâmetros, o índice nos parâmetros retorna o índice do aluno correspondente ao parâmetro
}

app.delete('/', (req, res) => {
    deletarAluno(req.query.ra) //recebe no parâmetro o ra do aluno que deseja ser excluído. 
    res.send(JSON.stringify(alunos))
})






//• Delete – Remover o curso do aluno
app.delete('/deletarHabilidade', (req, res) => {
    manipularHabilidade(req.query.ra, req.body.aluno.habilidade);
    res.send(JSON.stringify(alunos))
})



//Get – Listar todos os alunos (RA, Nome, Turma)
function exibirAlunos() {
    return JSON.stringify(alunos, null, 2);
}

app.get('/', (req, res) => {
    res.send(exibirAlunos())
})

//Get – Listar um aluno através do RA informado (Nome, Turma, Cursos)
function exibirAluno(ra){
    return JSON.stringify(alunos[buscarAluno(ra)])
}

app.get('/buscarAluno', (req, res) => {
    res.send(exibirAluno(req.query.ra))
})





app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})