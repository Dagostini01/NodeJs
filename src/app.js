import express from "express";
const app = express();
app.use(express.json())

const livros = [
    {id: 1, titulo: "O Senhor dos Anéis"}, 
    {id: 2, titulo: "O Hobbit"}
]

function buscaLivro(id){
    return livros.findIndex(livro => {
        return livro.id === Number(id)
    })
}

app.get("/", (req, res) => {
    res.status(200).send("Curso de Node.js");
})
//pega livro
app.get("/livros", (req, res) => {
    res.status(200).json(livros)
})

//adiciona livro
app.post("/livros", (req, res) => {
    livros.push(req.body)
    res.status(201).send("Livro cadastrado com sucesso")
})

//pega livro pelo id
app.get("/livros/:id", (req, res) => {
    const index = buscaLivro(req.params.id)
    res.status(200).json(livros[index])
})

//edita o livro pelo id
app.put("/livros/:id", (req, res) => {
    const index = buscaLivro(req.params.id)
    livros[index].titulo = req.body.titulo
    res.status(200).json(livros)
})

//apaga livro
app.delete("/livros/:id", (req, res) => {
    const index = buscaLivro(req.params.id)
    livros.splice(index, 1)
    res.status(200).json("Livro deletado com sucesso!")
})

export default app;