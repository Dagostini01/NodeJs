import express from "express";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const app = express();
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, "../public")));

const livros = [
    { id: 1, titulo: "O Senhor dos Anéis" },
    { id: 2, titulo: "O Hobbit" },
];

function buscaLivro(id) {
    return livros.find(livro => livro.id === Number(id));
}

app.get("/livros", (req, res) => {
    res.status(200).json(livros);
});

app.post("/livros", (req, res) => {
    const { id, titulo } = req.body;

    const livroExistente = livros.find(livro => livro.id === id);
    if (livroExistente) {
        res.status(400).send("ID duplicado. Escolha um ID único.");
    } else {
        livros.push({ id, titulo });
        res.status(201).send("Livro cadastrado com sucesso");
    }
});

app.get("/livros/:id", (req, res) => {
    const index = buscaLivro(req.params.id);
    res.status(200).json(livros[index]);
});

app.put("/livros/:id", (req, res) => {
    const livroId = parseInt(req.params.id);
    const livro = buscaLivro(livroId);

    if (livro) {
        const novoTitulo = req.body.titulo;

        if (novoTitulo !== undefined) {
            livro.titulo = novoTitulo;
            res.status(200).json({ message: "Livro atualizado com sucesso", livro });
        } else {
            res.status(400).json({ error: "O campo 'titulo' não pode ser vazio" });
        }
    } else {
        res.status(404).json({ error: "Livro não encontrado" });
    }
});


app.delete("/livros/:id", (req, res) => {
    const index = buscaLivro(req.params.id);
    livros.splice(index, 1);
    res.status(200).json("Livro deletado com sucesso!");
});

export default app;
